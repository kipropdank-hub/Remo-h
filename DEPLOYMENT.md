# Deploying Remo H to Render

This guide deploys the **Django REST API** and the **React/Vite frontend** to
[Render](https://render.com). Render hosts them as two services plus a managed
PostgreSQL database:

| Resource | Render type | Purpose | Example URL |
| --- | --- | --- | --- |
| `remo-h-frontend` | Static Site | React SPA (Vite build) | `https://remo-h-frontend.onrender.com` |
| `remo-h-backend` | Web Service (Python) | Django REST API + admin | `https://remo-h-backend.onrender.com` |
| `remo-h-db` | PostgreSQL | Persistent application data | internal connection |

The browser talks to the backend directly at `VITE_API_URL`, so CORS must allow
the frontend origin. Render terminates HTTPS; Gunicorn serves plain HTTP behind
it. WhiteNoise serves Django admin static files.

Source repository: `https://github.com/kipropdank-hub/Remo-h`

---

## 1. What is already configured in this repo

- `requirements.txt` — Django, DRF, cors-headers, Pillow, Gunicorn, WhiteNoise, psycopg2.
- `render.yaml` — Render Blueprint that creates all three resources at once.
- `backend/backend/settings.py` — reads configuration from environment variables:
  `DJANGO_SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`,
  `CSRF_TRUSTED_ORIGINS`, `DATABASE_URL`, `POSTGRES_SSLMODE`. With no env vars it
  still runs locally with SQLite, the original secret and `DEBUG=True`.
- `frontend/src/main.jsx` — sets `axios.defaults.baseURL` from `VITE_API_URL`, so
  the existing `/api/...` calls work both with the local Vite proxy and in
  production. Vite embeds this value at **build time**.
- `.gitignore` — excludes `venv/`, `node_modules/`, `dist/`, `db.sqlite3`, caches and secrets.

---

## 2. Option A — Deploy with the Blueprint (recommended)

1. Push this repository to GitHub (see the push steps in section 7).
2. Log in to Render → **Dashboard → New → Blueprint**.
3. Connect your GitHub account and select `kipropdank-hub/Remo-h`, branch `main`.
4. Render reads `render.yaml` and shows the three resources. Name the Blueprint
   (e.g. `remo-h`) and confirm.
5. The Blueprint supplies a generated `DJANGO_SECRET_KEY` and wires
   `DATABASE_URL` from the Postgres instance automatically. No manual secrets
   are required.
6. Click **Apply**. First deploy takes a few minutes (dependency install, Vite
   build, migrations, seed data).
7. Open `https://remo-h-frontend.onrender.com`. If Render assigned different
   subdomains (because the names were already taken), see section 6.
8. Verify the API directly: `https://remo-h-backend.onrender.com/api/departments/`
   should return a JSON list of six departments.

Every push to `main` redeploys both services automatically.

---

## 3. Option B — Manual setup in the Render Dashboard

Use this if you do not want to use a Blueprint.

### 3.1 Create the database

1. **New → PostgreSQL**. Name it `remo-h-db`, free plan, region `oregon`.
2. Leave the default database name/user. Copy the **Internal Database URL**.

### 3.2 Create the backend web service

1. **New → Web Service** → select `kipropdank-hub/Remo-h`.
2. Settings:
   - **Name:** `remo-h-backend`
   - **Region:** `oregon` (same region as the database)
   - **Branch:** `main`
   - **Runtime:** `Python`
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:**
     ```sh
     python backend/manage.py migrate --noinput && python backend/manage.py collectstatic --noinput && python backend/manage.py seed_data && gunicorn --chdir backend backend.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120
     ```
   - **Plan:** Free (or paid if you want a pre-deploy command instead of running
     migrations on boot).
   - **Health check path:** `/api/departments/`
3. Add environment variables:

   | Key | Value |
   | --- | --- |
   | `PYTHON_VERSION` | `3.14` |
   | `DATABASE_URL` | Internal Database URL from step 3.1 |
   | `DJANGO_SECRET_KEY` | A long random string (generate with `python -c "import secrets; print(secrets.token_urlsafe(50))"`) |
   | `DEBUG` | `false` |
   | `ALLOWED_HOSTS` | `remo-h-backend.onrender.com` (or `.onrender.com`) |
   | `CORS_ALLOWED_ORIGINS` | `https://remo-h-frontend.onrender.com` |
   | `CSRF_TRUSTED_ORIGINS` | `https://remo-h-backend.onrender.com,https://remo-h-frontend.onrender.com` |

   `RENDER_EXTERNAL_HOSTNAME` is set by Render automatically and is also added
   to `ALLOWED_HOSTS` by the settings file.

### 3.3 Create the frontend static site

1. **New → Static Site** → select the same repo and branch.
2. Settings:
   - **Name:** `remo-h-frontend`
   - **Build command:** `cd frontend && npm ci && npm run build`
   - **Publish directory:** `frontend/dist`
3. Add environment variables:

   | Key | Value |
   | --- | --- |
   | `NODE_VERSION` | `22` |
   | `VITE_API_URL` | `https://remo-h-backend.onrender.com` (no trailing slash) |

4. **Settings → Redirects/Rewrites** → add one rule:

   | Type | Source | Destination |
   | --- | --- | --- |
   | Rewrite | `/*` | `/index.html` |

   This lets React Router serve deep links such as `/doctors`. Render serves
   real files (JS/CSS) before applying the rule, so assets still load.

---

## 4. Environment variable reference

| Variable | Used by | Default (local) | Notes |
| --- | --- | --- | --- |
| `DJANGO_SECRET_KEY` | backend | insecure dev key | Must be secret and stable in production. Blueprint generates one. |
| `DEBUG` | backend | `true` | Set to `false` on Render. Accepts `1/true/yes/on`. |
| `ALLOWED_HOSTS` | backend | `192.168.1.105,localhost,127.0.0.1` | Comma-separated. `.onrender.com` allows all Render subdomains. Render host is auto-added. |
| `CORS_ALLOWED_ORIGINS` | backend | localhost origins | Comma-separated full origins of the frontend (**no trailing slash**). |
| `CSRF_TRUSTED_ORIGINS` | backend | same as CORS origins | Needed for Django admin POSTs over HTTPS. |
| `DATABASE_URL` | backend | absent → SQLite | `postgresql://...`; used when set. |
| `POSTGRES_SSLMODE` | backend | `prefer` | Set `require` if using an external Postgres instance. |
| `DJANGO_SUPERUSER_USERNAME` | backend migration | `admin` | Username of the auto-created admin. |
| `DJANGO_SUPERUSER_PASSWORD` | backend migration | `admin` | Password of the auto-created admin. Change in production. |
| `DJANGO_SUPERUSER_EMAIL` | backend migration | `admin@remohospital.com` | Email of the auto-created admin. |
| `VITE_API_URL` | frontend | empty → Vite proxy | Baked into JS at build time; rebuild after changing. |
| `NODE_VERSION` | frontend build | Render default | `22` works with Vite 6. |
| `PYTHON_VERSION` | backend build | Render default (3.14) | Django 6.1 supports 3.12–3.15. |

---

## 5. Verify the deployment

1. `GET https://remo-h-backend.onrender.com/api/departments/` → JSON array.
2. `GET .../api/doctors/`, `/api/services/` → seeded records.
3. Open the frontend, navigate to **Departments**, **Doctors**, **Services** and
   submit a test appointment/contact form.
4. Django admin: `https://remo-h-backend.onrender.com/admin/`. Migrations create
   a demo superuser automatically: **username `admin`, password `admin`**. To
   use different credentials, set `DJANGO_SUPERUSER_USERNAME`,
   `DJANGO_SUPERUSER_PASSWORD` and `DJANGO_SUPERUSER_EMAIL` **before** the first
   migration. Change the default password immediately for any non-demo
   deployment; additional admins can be created with
   `python backend/manage.py createsuperuser`.
5. Browser console should show no CORS errors and no mixed-content warnings.

The `migrate` and `seed_data` commands are idempotent: running them on every
restart is safe. Demo data is created once; existing records are left untouched.
The admin migration also repairs the configured user's password/staff flags if
they were changed.

---

## 6. Custom domain (optional) and subdomain changes

- In Render, open each service → **Settings → Custom Domains**, add e.g.
  `remo.example.com` for the frontend and `api.example.com` for the backend,
  then add the DNS records Render shows. TLS certificates are provisioned
  automatically.
- If the domain changes, update `CORS_ALLOWED_ORIGINS` and
  `CSRF_TRUSTED_ORIGINS` on the backend and set `VITE_API_URL` to the new
  backend URL, then **rebuild** the frontend.
- If Render gives your services different `onrender.com` names, update the same
  three values in `render.yaml` (or in the Dashboard for a manual setup) before
  the first deploy, or after the first deploy in the Dashboard and trigger a
  redeploy.

---

## 7. Push the source to GitHub

From a machine with Git installed:

```powershell
cd D:\Softwares\Remo-h
git init
git add .
git commit -m "Add Render deployment configuration and deployment guide"
git branch -M main
git remote add origin https://github.com/kipropdank-hub/Remo-h.git
git push -u origin main
```

If the repository does not exist yet, create it first (public, no README /
`.gitignore` / license so the initial push is clean), then run the commands
above. Use a Personal Access Token as the password when pushing over HTTPS, or
configure an SSH key and use `git@github.com:kipropdank-hub/Remo-h.git`.

---

## 8. Troubleshooting

| Symptom | Fix |
| --- | --- |
| `DisallowedHost` / 400 on the API | Add the exact hostname to `ALLOWED_HOSTS` and redeploy. |
| CORS error in browser | `CORS_ALLOWED_ORIGINS` must contain the frontend's exact origin, including `https://` and no trailing slash. |
| Frontend calls the static site instead of the API | `VITE_API_URL` was not set at build time, or has a trailing slash. Set it and rebuild. |
| Deep link (e.g. `/doctors`) returns 404 | Add the `/* → /index.html` rewrite rule to the static site. |
| `ModuleNotFoundError: No module named 'whitenoise'` / `psycopg2` | Build command must use `pip install -r requirements.txt` from the repo root. |
| `OperationalError` connecting to DB | Use the **Internal** Database URL in the same region, or set `POSTGRES_SSLMODE=require` for external Postgres. |
| Slow first request | Free web services sleep when idle; the first request after inactivity waits for a cold start. Upgrade the plan to avoid this. |
| Database expired / tables missing | Render's free PostgreSQL plan is intended for short-lived use; check current free-tier limits and upgrade or re-seed if it was removed. |
| Admin static files missing | Confirm `collectstatic --noinput` runs in the start command and WhiteNoise is in `MIDDLEWARE`. |

---

## 9. Production notes

- The API currently uses `AllowAny` permissions and the demo seed data. Add
  authentication and rate limiting before storing real patient information.
- The admin account defaults to `admin` / `admin`. Set a strong
  `DJANGO_SUPERUSER_PASSWORD` before the first deploy, or change it immediately
  in the Django admin after deployment.
- Do not commit `.env` files, database dumps, or real patient data to GitHub.
- Back up the Postgres database regularly; Render free instances are not a
  long-term backup strategy.
- Keep dependency versions in `requirements.txt` and `package-lock.json` in
  version control so builds are reproducible.
