# Deploying Remo H to Render

Remo H is now a **single Django application**. Django renders every page
(Home, About, Departments, Doctors, Services, Contact and appointment booking)
from server-side templates, serves its own CSS and SVG assets, hosts the admin,
and also exposes the JSON API under `/api/`. There is no separate React/Vite
build and no static-site service.

| Resource | Render type | Purpose | Example URL |
| --- | --- | --- | --- |
| `remo-h-backend` | Web Service (Python) | Django site + admin + API | `https://remo-h-backend.onrender.com` |
| `remo-h-db` | PostgreSQL | Persistent application data | internal connection |

Render terminates HTTPS; Gunicorn serves plain HTTP behind it. WhiteNoise
serves Django static files (CSS, SVG, admin assets).

Source repository: `https://github.com/kipropdank-hub/Remo-h`

---

## 1. What is configured in this repo

- `requirements.txt` — Django, DRF, cors-headers, Pillow, Gunicorn, WhiteNoise,
  psycopg2.
- `render.yaml` — Render Blueprint that creates the web service and database.
- `backend/backend/settings.py` — reads configuration from environment
  variables: `DJANGO_SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`,
  `CSRF_TRUSTED_ORIGINS`, `DATABASE_URL`, `POSTGRES_SSLMODE`, plus optional
  `CORS_ALLOWED_ORIGINS` for the API. With no env vars it runs locally with
  SQLite, the development secret and `DEBUG=True`.
- `backend/hospital/templates/hospital/` — all site templates.
- `backend/hospital/static/hospital/` — the stylesheet and favicon collected
  by `collectstatic` and served by WhiteNoise.
- `backend/hospital/pages.py` and `forms.py` — server-rendered views and forms
  for search, filtering, contact messages and appointment booking.
- `backend/hospital/views.py` — DRF API, still available at `/api/`.
- `.gitignore` — excludes `venv/`, `__pycache__/`, `db.sqlite3`,
  `backend/staticfiles/`, `backend/media/` and secrets.

---

## 2. Option A — Deploy with the Blueprint (recommended)

1. Push the repository to GitHub (see section 7).
2. Log in to Render → **Dashboard → New → Blueprint**.
3. Connect your GitHub account and select `kipropdank-hub/Remo-h`, branch `main`.
4. Render reads `render.yaml` and shows one web service plus a database. Name
   the Blueprint (e.g. `remo-h`) and confirm.
5. The Blueprint generates `DJANGO_SECRET_KEY`, wires `DATABASE_URL` from the
   Postgres instance, and sets the host/CSRF values automatically.
6. Click **Apply**. The first deploy takes a few minutes (dependency install,
   migrations, static collection, seed data).
7. Open `https://remo-h-backend.onrender.com` — the homepage should load with
   styled content and working navigation.
8. Verify the API at `https://remo-h-backend.onrender.com/api/departments/`.

Every push to `main` redeploys the service automatically.

---

## 3. Option B — Manual setup in the Render Dashboard

### 3.1 Create the database

1. **New → PostgreSQL**. Name it `remo-h-db`, free plan, region `oregon`.
2. Leave the default database name/user. Copy the **Internal Database URL**.

### 3.2 Create the web service

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
   - **Health check path:** `/`
3. Add environment variables:

   | Key | Value |
   | --- | --- |
   | `PYTHON_VERSION` | `3.14` |
   | `DATABASE_URL` | Internal Database URL from step 3.1 |
   | `DJANGO_SECRET_KEY` | A long random string (generate with `python -c "import secrets; print(secrets.token_urlsafe(50))"`) |
   | `DEBUG` | `false` |
   | `ALLOWED_HOSTS` | `remo-h-backend.onrender.com` (or `.onrender.com`) |
   | `CSRF_TRUSTED_ORIGINS` | `https://remo-h-backend.onrender.com` |

   `RENDER_EXTERNAL_HOSTNAME` is set by Render automatically and is also added
   to `ALLOWED_HOSTS` by the settings file.

There is no frontend service, rewrite rule, or `VITE_API_URL` to configure.

---

## 4. Environment variable reference

| Variable | Default (local) | Notes |
| --- | --- | --- |
| `DJANGO_SECRET_KEY` | insecure dev key | Must be secret and stable in production. Blueprint generates one. |
| `DEBUG` | `true` | Set to `false` on Render. Accepts `1/true/yes/on`. |
| `ALLOWED_HOSTS` | `192.168.1.105,localhost,127.0.0.1` | Comma-separated hostnames. `.onrender.com` allows all Render subdomains; the Render hostname is auto-added. |
| `DATABASE_URL` | absent → SQLite | `postgresql://...`; used when set. |
| `POSTGRES_SSLMODE` | `prefer` | Set `require` for an external Postgres instance. |
| `CSRF_TRUSTED_ORIGINS` | derived from `CORS_ALLOWED_ORIGINS` | Full origins (with `https://`, no trailing slash) required for Django form POSTs over HTTPS. |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:8000,http://127.0.0.1:8000` | Only needed if an external client uses `/api/`. |
| `DJANGO_SUPERUSER_USERNAME` | `admin` | Username of the auto-created admin. |
| `DJANGO_SUPERUSER_PASSWORD` | `admin` | Password of the auto-created admin. Change in production. |
| `DJANGO_SUPERUSER_EMAIL` | `admin@remohospital.com` | Email of the auto-created admin. |
| `PYTHON_VERSION` | Render default | `3.14` works with Django 6.1. |

Remove any old `CORS_ALLOWED_ORIGINS` values pointing at the retired
`remo-h-frontend` service; they are no longer needed for the site itself.

---

## 5. Verify the deployment

1. Open `/` — the homepage loads with styling, quick-booking form, stats,
   departments and FAQs.
2. Visit `/about/`, `/departments/`, `/doctors/`, `/services/`, `/contact/`.
3. Search/filter on `/doctors/` (`?department=1&available=on`) and
   `/services/` (`?category=Diagnostics`).
4. Submit the contact form and book a test appointment; the success page shows
   a `RM-######` reference.
5. `GET /api/departments/` returns JSON; `GET /admin/` opens Django admin.
6. Check the browser console for missing static files or CSRF errors.

`migrate`, `collectstatic` and `seed_data` are idempotent and safe to run on
each restart. Demo data is created once; existing records are left untouched.
The admin migration also repairs the configured user's password/staff flags if
they were changed.

---

## 6. Custom domain and hostname changes

- In Render, open the service → **Settings → Custom Domains**, add e.g.
  `remo.example.com`, then add the DNS records Render shows. TLS is provisioned
  automatically.
- If the hostname changes, update `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`
  (in `render.yaml` or the Dashboard) and redeploy.
- Because everything is same-origin, no API URL or frontend rebuild is needed.

---

## 7. Push the source to GitHub

The repository already has an `origin` remote:

```powershell
cd D:\Softwares\Remo-h
git add -A
git commit -m "Convert Remo H to a Django-only application"
git push origin main
```

If setting up a machine from scratch:

```powershell
git init
git remote add origin https://github.com/kipropdank-hub/Remo-h.git
git add .
git commit -m "Initial Django application"
git branch -M main
git push -u origin main
```

Authenticate over HTTPS with a Personal Access Token (repo scope) or configure
an SSH key and use `git@github.com:kipropdank-hub/Remo-h.git`.

---

## 8. Troubleshooting

| Symptom | Fix |
| --- | --- |
| `DisallowedHost` / 400 | Add the exact hostname to `ALLOWED_HOSTS` and redeploy. |
| 403 on contact/appointment POST | Set `CSRF_TRUSTED_ORIGINS` to the full `https://` origin (no trailing slash). |
| CSS missing / unstyled page | Confirm `collectstatic --noinput` runs in the start command and WhiteNoise is in `MIDDLEWARE`. |
| `ModuleNotFoundError: No module named 'whitenoise'` / `psycopg2` | Build command must be `pip install -r requirements.txt` from the repo root. |
| `OperationalError` connecting to DB | Use the **Internal** Database URL in the same region, or set `POSTGRES_SSLMODE=require` for external Postgres. |
| Slow first request | Free web services sleep when idle; the first request after inactivity waits for a cold start. Upgrade the plan to avoid this. |
| Database expired / tables missing | Render's free PostgreSQL plan is intended for short-lived use; check current free-tier limits and upgrade or re-seed if it was removed. |
| Old `/doctors` URL from bookmarks | Pages now use trailing slashes, e.g. `/doctors/`; Django's `CommonMiddleware` redirects the old path automatically. |

---

## 9. Production notes

- The JSON API still uses `AllowAny` permissions. Add authentication and rate
  limiting before exposing real patient information.
- The admin account defaults to `admin` / `admin`. Set a strong
  `DJANGO_SUPERUSER_PASSWORD` before the first deploy, or change it immediately
  in Django admin after deployment.
- Do not commit `.env` files, database dumps, or real patient data to GitHub.
- Back up the Postgres database regularly; Render free instances are not a
  long-term backup strategy.
- Keep `requirements.txt` in version control so builds are reproducible.
