# Remo Hospital Website

A Django-only hospital website: server-rendered pages, forms, admin and a JSON
API from a single Python application. No separate frontend build is required.

## Features

- **Hospital Information** — landing page, history, values and patient stories.
- **Doctor Directory** — search, department filter, availability filter, sorting
  and full specialist profiles.
- **Department Showcase** — department details, key procedures and doctor lists.
- **Service Catalog** — searchable packages with categories and detail pages.
- **Appointment Booking** — Django form with server-side validation, slot
  conflict checks and a confirmation receipt.
- **Contact Form** — stores inquiries in the database with confirmation messages.
- **Responsive Design** — hand-written CSS that works on all devices.
- **Django Admin** — manage departments, doctors, services, appointments and
  contact messages.
- **JSON API** — the existing DRF endpoints remain available under `/api/`.

## Tech Stack

- Django 6.1.3 (templates, forms, ORM, admin, messages, staticfiles)
- Django REST Framework + django-cors-headers (optional API)
- SQLite for local development; PostgreSQL via `DATABASE_URL` in production
- Gunicorn + WhiteNoise for production serving
- Pillow for doctor image uploads

## Project Structure

```
Remo-h/
├── backend/
│   ├── backend/                # Django project settings, URLs, WSGI/ASGI
│   │   ├── settings.py
│   │   └── urls.py
│   ├── hospital/               # Main Django app
│   │   ├── models.py           # Database models
│   │   ├── forms.py            # Appointment + contact forms
│   │   ├── pages.py            # Server-rendered page views
│   │   ├── views.py            # DRF API viewsets
│   │   ├── serializers.py
│   │   ├── urls.py             # Page + /api/ routes
│   │   ├── admin.py
│   │   ├── management/commands/seed_data.py
│   │   ├── templates/hospital/ # All site templates
│   │   └── static/hospital/    # CSS and favicon
│   ├── manage.py
│   └── db.sqlite3              # Local development database
├── render.yaml                 # Single Django service + Postgres blueprint
├── requirements.txt
└── DEPLOYMENT.md               # Full Render deployment guide
```

## Setup Instructions

### Prerequisites

- Python 3.12+ (3.14 recommended)

### Local development

```powershell
cd D:\Softwares\Remo-h
venv\Scripts\activate          # or create one: python -m venv venv
pip install -r requirements.txt
cd backend
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

Open <http://localhost:8000>. The homepage, all pages and `/api/` are served by
the same Django process.

Run checks and tests with:

```powershell
python manage.py check
python manage.py test hospital
```

## Pages and Routes

| URL | Purpose |
| --- | --- |
| `/` | Home, quick booking, stats, departments, testimonials, FAQ |
| `/about/` | Story, values, timeline, leadership, accreditation |
| `/departments/` / `/departments/<id>/` | Department catalog and detail |
| `/doctors/` / `/doctors/<id>/` | Searchable directory and profiles |
| `/services/` / `/services/<id>/` | Service catalog and details |
| `/contact/` | Contact information, inquiry form, visitor FAQ |
| `/book-appointment/` | Appointment booking form |
| `/appointment/<id>/success/` | Booking confirmation receipt |
| `/admin/` | Django admin |
| `/api/...` | JSON API (see below) |

## API Endpoints

- `GET /api/departments/` and `/api/departments/{id}/`
- `GET /api/departments/{id}/doctors/`
- `GET /api/doctors/`, `/api/doctors/available/`, `/api/doctors/{id}/`
- `GET /api/doctors/by_department/?department_id={id}`
- `GET /api/services/`
- `GET/POST /api/appointments/`
- `GET /api/appointments/available_slots/?doctor_id={id}&date={YYYY-MM-DD}`
- `POST /api/contact/`

## Database Models

- **Department** — name, description, icon, created_at
- **Doctor** — name, specialization, department, contact details, experience,
  qualification, bio, image, availability, consultation_fee
- **Service** — title, description, icon, price
- **Appointment** — patient details, doctor, department, date, time, reason, status
- **ContactMessage** — name, email, phone, subject, message

## Admin Panel

Access the Django admin at <http://localhost:8000/admin>.

A demo superuser is created by the migration with username `admin` / password
`admin`. Change this password before exposing the app publicly, or set
`DJANGO_SUPERUSER_USERNAME`, `DJANGO_SUPERUSER_PASSWORD` and
`DJANGO_SUPERUSER_EMAIL` **before** the first migration. Create additional admins
with `python manage.py createsuperuser`.

## Customization

- Colors and layout live in `backend/hospital/static/hospital/app.css`.
- Page copy lives in `backend/hospital/templates/hospital/` and in the small
  content lists at the top of `backend/hospital/pages.py`.
- Add or edit data through Django admin or `python manage.py seed_data`.

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full Render guide: Blueprint setup,
manual setup, environment variables, verification and troubleshooting.

In short: set `DEBUG=false`, `DJANGO_SECRET_KEY`, `ALLOWED_HOSTS`,
`CSRF_TRUSTED_ORIGINS` and `DATABASE_URL`, then run migrations, collectstatic,
seed data and serve with Gunicorn + WhiteNoise. `render.yaml` automates all of
this for a single web service plus a managed PostgreSQL database.

## License

This project is created for demonstration purposes.
