# Remo Hospital Website

A modern, full-stack hospital management website built with Django (backend) and React (frontend).

## Features

- **Hospital Information**: Beautiful landing page showcasing hospital services and departments
- **Doctor Directory**: Browse and search for doctors by specialty
- **Department Showcase**: Explore various medical departments with detailed information
- **Service Catalog**: View all hospital services with pricing
- **Appointment Booking**: Online appointment scheduling system with real-time slot availability
- **Contact Form**: Easy way for patients to reach out
- **Responsive Design**: Fully responsive UI that works on all devices
- **Modern UI**: Built with Tailwind CSS for a clean, professional look

## Tech Stack

### Backend
- Django 6.1.3
- Django REST Framework
- Django CORS Headers
- SQLite (development database)

### Frontend
- React 18
- React Router DOM
- Vite
- Tailwind CSS
- Lucide React (icons)
- Axios (HTTP client)

## Project Structure

```
Remo-h/
├── backend/                 # Django backend
│   ├── backend/            # Django project settings
│   ├── hospital/           # Main Django app
│   │   ├── models.py       # Database models
│   │   ├── serializers.py  # DRF serializers
│   │   ├── views.py        # API views
│   │   ├── urls.py         # URL routing
│   │   └── admin.py        # Admin configuration
│   ├── manage.py           # Django management script
│   └── db.sqlite3          # SQLite database
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Departments.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── public/             # Static assets
│   └── package.json
└── venv/                   # Python virtual environment
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the project directory:
```bash
cd Remo-h
```

2. The virtual environment is already created. Activate it:
```bash
# On Windows
venv\Scripts\activate

# On Mac/Linux
source venv/bin/activate
```

3. Navigate to the backend directory:
```bash
cd backend
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Seed the database with sample data:
```bash
python manage.py seed_data
```

6. Start the Django development server:
```bash
python manage.py runserver

python manage.py runserver 0.0.0.0:8000
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start the Vite development server:
```bash
npm run dev

npm run dev -- --host 0.0.0.0
```

The frontend will be available at `http://localhost:3000`

## Running the Application

To run both servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd Remo-h
venv\Scripts\activate
cd backend
python manage.py runserver
```

**Terminal 2 (Frontend):**
```bash
cd Remo-h\frontend
npm run dev
```

Then open your browser and navigate to `http://localhost:3000`

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/departments/` - List all departments
- `GET /api/departments/{id}/` - Get department details
- `GET /api/departments/{id}/doctors/` - Get doctors in a department
- `GET /api/doctors/` - List all doctors
- `GET /api/doctors/available/` - Get available doctors
- `GET /api/doctors/by_department/?department_id={id}` - Filter doctors by department
- `GET /api/services/` - List all services
- `GET /api/appointments/` - List all appointments
- `POST /api/appointments/` - Create a new appointment
- `GET /api/appointments/available_slots/?doctor_id={id}&date={YYYY-MM-DD}` - Get available time slots
- `POST /api/contact/` - Submit a contact message

## Database Models

### Department
- name
- description
- icon (FontAwesome class)
- created_at

### Doctor
- name
- specialization
- department (foreign key)
- gender
- phone
- email
- experience_years
- qualification
- bio
- image
- available
- consultation_fee
- created_at

### Service
- title
- description
- icon (FontAwesome class)
- price
- created_at

### Appointment
- patient_name
- patient_email
- patient_phone
- doctor (foreign key)
- department (foreign key)
- appointment_date
- appointment_time
- reason
- status (pending, confirmed, completed, cancelled)
- created_at
- updated_at

### ContactMessage
- name
- email
- phone
- subject
- message
- created_at

## Admin Panel

Access the Django admin panel at `http://localhost:8000/admin`.

A demo superuser is created automatically by the migrations, so after
`python manage.py migrate` you can log in with **username `admin` / password
`admin`**. Change this password before exposing the app publicly. Override the
defaults with `DJANGO_SUPERUSER_USERNAME`, `DJANGO_SUPERUSER_PASSWORD` and
`DJANGO_SUPERUSER_EMAIL` before running migrations. To create another admin:
```bash
cd backend
python manage.py createsuperuser
```

## Features in Detail

### Home Page
- Hero section with call-to-action
- Statistics display
- Feature highlights
- Department preview
- Appointment booking CTA

### About Page
- Hospital history and mission
- Core values
- Milestones timeline
- Vision and mission statements

### Doctors Page
- Searchable doctor directory
- Filter by department
- Doctor profiles with qualifications
- Availability status
- Consultation fees

### Departments Page
- Department cards with icons
- Doctor count per department
- Key services list
- Visual design with color coding

### Services Page
- Service catalog with pricing
- Feature lists
- Popular service badges
- Special programs section

### Book Appointment
- Multi-step booking form
- Department and doctor selection
- Date and time picker with available slots
- Form validation
- Success confirmation

### Contact Page
- Contact information
- Contact form
- FAQ section
- Map placeholder

## Customization

### Colors
The primary and secondary colors can be customized in `frontend/tailwind.config.js`

### Adding New Data
Use the Django admin panel or create custom management commands to add new doctors, departments, or services.

### API Integration
The frontend calls the live API with axios; some pages keep mock-data fallbacks
if the API is unavailable. Ensure the backend is running. The Vite dev proxy
forwards `/api` requests to `http://localhost:8000`; in production the frontend
uses `VITE_API_URL` (see [DEPLOYMENT.md](DEPLOYMENT.md)).

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the complete Render guide (Blueprint,
manual setup, environment variables, verification and troubleshooting).

Quick summary:

1. **Backend**: set `DEBUG=false`, `DJANGO_SECRET_KEY`, `ALLOWED_HOSTS`,
   `CORS_ALLOWED_ORIGINS` and `DATABASE_URL`; run migrations and serve with
   Gunicorn + WhiteNoise (`render.yaml` does this automatically).
2. **Frontend**: set `VITE_API_URL` to the backend URL, run `npm run build`,
   publish `frontend/dist`, and rewrite all deep links to `/index.html`.

## License

This project is created for demonstration purposes.

## Support

For issues or questions, please contact the development team.
#   R e m o - h  
 