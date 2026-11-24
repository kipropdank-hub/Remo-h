# Remo Hospital Website - Developer Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Installation Guide](#installation-guide)
5. [Running the Application](#running-the-application)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Frontend Architecture](#frontend-architecture)
9. [Backend Architecture](#backend-architecture)
10. [Customization Guide](#customization-guide)
11. [Deployment Guide](#deployment-guide)
12. [Troubleshooting](#troubleshooting)

---

## 🏗️ Project Overview

**Project Name**: Remo Hospital Website
**Type**: Full-stack Web Application
**Purpose**: Hospital management system with appointment booking
**Location**: `D:\Softwares\Remo-h`

**Key Features**:
- Patient appointment booking system
- Doctor and department directory
- Service catalog
- Contact form
- Responsive modern UI
- RESTful API backend

---

## 📁 Project Structure

```
Remo-h/
├── backend/                          # Django Backend
│   ├── backend/                      # Django project settings
│   │   ├── __init__.py
│   │   ├── asgi.py                   # ASGI config
│   │   ├── settings.py               # Django settings
│   │   ├── urls.py                   # Main URL configuration
│   │   └── wsgi.py                   # WSGI config
│   ├── hospital/                     # Main Django app
│   │   ├── __init__.py
│   │   ├── admin.py                  # Admin configuration
│   │   ├── apps.py                   # App configuration
│   │   ├── management/               # Custom management commands
│   │   │   └── commands/
│   │   │       ├── __init__.py
│   │   │       └── seed_data.py      # Database seeding command
│   │   ├── migrations/               # Database migrations
│   │   │   └── 0001_initial.py
│   │   ├── models.py                 # Database models
│   │   ├── serializers.py            # DRF serializers
│   │   ├── tests.py                  # Test cases
│   │   ├── urls.py                   # App URL configuration
│   │   └── views.py                  # API views
│   ├── db.sqlite3                    # SQLite database
│   └── manage.py                     # Django management script
├── frontend/                         # React Frontend
│   ├── node_modules/                 # npm dependencies
│   ├── public/                       # Static assets
│   │   ├── heart-pulse.svg           # Favicon
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/                    # Page components
│   │   │   ├── About.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Departments.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Services.jsx
│   │   ├── App.jsx                   # Main app component
│   │   ├── index.css                 # Global styles
│   │   └── main.jsx                  # Entry point
│   ├── index.html                    # HTML template
│   ├── package.json                  # npm dependencies
│   ├── postcss.config.js             # PostCSS config
│   ├── tailwind.config.js            # Tailwind CSS config
│   └── vite.config.js                # Vite config
├── venv/                             # Python virtual environment
├── README.md                         # Project README
├── USER_GUIDE.md                     # User documentation
└── DEVELOPER_GUIDE.md               # This file
```

---

## 🛠️ Technology Stack

### Backend
- **Framework**: Django 6.1.3
- **API**: Django REST Framework 3.18.3
- **CORS**: django-cors-headers 4.9.0
- **Database**: SQLite (development)
- **Image Handling**: Pillow 13.0.0
- **Python Version**: 3.8+

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.7
- **Routing**: React Router DOM 6.28.0
- **HTTP Client**: Axios 1.7.9
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.468.0
- **Date Handling**: date-fns 4.1.0
- **Node.js Version**: 16+

---

## 📦 Installation Guide

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm (comes with Node.js)
- Git (optional)

### Step 1: Navigate to Project
```bash
cd D:\Softwares\Remo-h
```

### Step 2: Backend Setup (Already Done)
The virtual environment and dependencies are already installed.

**If you need to reinstall:**
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install django djangorestframework django-cors-headers Pillow
```

### Step 3: Frontend Setup (Already Done)
Dependencies are already installed.

**If you need to reinstall:**
```bash
cd frontend
npm install
```

### Step 4: Database Setup (Already Done)
```bash
cd backend
python manage.py migrate
python manage.py seed_data
```

---

## 🚀 Running the Application

### Method 1: Using Command Prompt (Recommended)

**Terminal 1 - Backend:**
```cmd
cd D:\Softwares\Remo-h
venv\Scripts\activate
cd backend
python manage.py runserver
```

**Terminal 2 - Frontend:**
```cmd
cd D:\Softwares\Remo-h\frontend
node node_modules\vite\bin\vite.js
```

### Method 2: Using PowerShell

**Terminal 1 - Backend:**
```powershell
cd D:\Softwares\Remo-h
.\venv\Scripts\Activate.ps1
cd backend
python manage.py runserver
```

**Terminal 2 - Frontend:**
```powershell
cd D:\Softwares\Remo-h\frontend
node node_modules\vite\bin\vite.js
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

### Default Admin User
Migrations automatically create a demo superuser: **username `admin`,
password `admin`** (override with `DJANGO_SUPERUSER_USERNAME`,
`DJANGO_SUPERUSER_PASSWORD` and `DJANGO_SUPERUSER_EMAIL` before migrating).
The migration is idempotent: it only creates the user once and restores the
configured password/flags if they change. Change the password before a public
deployment. To add another admin user:
```bash
cd backend
python manage.py createsuperuser
```

---

## 🔌 API Documentation

### Base URL
`http://localhost:8000/api/`

### Endpoints

#### Departments
- `GET /departments/` - List all departments
- `GET /departments/{id}/` - Get department details
- `GET /departments/{id}/doctors/` - Get doctors in a department

**Response Example:**
```json
{
  "id": 1,
  "name": "Cardiology",
  "description": "Comprehensive heart care...",
  "icon": "fa-heart-pulse",
  "doctors_count": 1,
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Doctors
- `GET /doctors/` - List all doctors
- `GET /doctors/{id}/` - Get doctor details
- `GET /doctors/available/` - Get available doctors
- `GET /doctors/by_department/?department_id={id}` - Filter by department

**Response Example:**
```json
{
  "id": 1,
  "name": "Dr. Sarah Johnson",
  "specialization": "Cardiologist",
  "department": 1,
  "department_name": "Cardiology",
  "experience_years": 15,
  "qualification": "MD, FACC",
  "available": true,
  "consultation_fee": 150.00
}
```

#### Services
- `GET /services/` - List all services
- `GET /services/{id}/` - Get service details

**Response Example:**
```json
{
  "id": 1,
  "title": "Health Checkups",
  "description": "Comprehensive health screening...",
  "icon": "fa-stethoscope",
  "price": 199.00
}
```

#### Appointments
- `GET /appointments/` - List all appointments
- `POST /appointments/` - Create new appointment
- `GET /appointments/available_slots/?doctor_id={id}&date={YYYY-MM-DD}` - Get available slots

**Create Appointment Request:**
```json
{
  "patient_name": "John Doe",
  "patient_email": "john@example.com",
  "patient_phone": "+15551234567",
  "doctor": 1,
  "department": 1,
  "appointment_date": "2024-12-01",
  "appointment_time": "09:00",
  "reason": "Annual checkup"
}
```

#### Contact
- `POST /contact/` - Submit contact message

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+15551234567",
  "subject": "General Inquiry",
  "message": "I have a question about..."
}
```

---

## 🗄️ Database Schema

### Department Model
```python
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    icon = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
```

### Doctor Model
```python
class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    gender = models.CharField(max_length=1, choices=[('M', 'Male'), ('F', 'Female')])
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    experience_years = models.PositiveIntegerField()
    qualification = models.CharField(max_length=200)
    bio = models.TextField()
    image = models.ImageField(upload_to='doctors/', blank=True, null=True)
    available = models.BooleanField(default=True)
    consultation_fee = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
```

### Service Model
```python
class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

### Appointment Model
```python
class Appointment(models.Model):
    patient_name = models.CharField(max_length=100)
    patient_email = models.EmailField()
    patient_phone = models.CharField(max_length=15)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### ContactMessage Model
```python
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```

---

## 🎨 Frontend Architecture

### Component Structure

**Layout Components:**
- `Navbar.jsx` - Navigation with responsive menu
- `Footer.jsx` - Footer with contact info and links

**Page Components:**
- `Home.jsx` - Landing page with hero, stats, features
- `About.jsx` - Hospital information and history
- `Doctors.jsx` - Doctor directory with search/filter
- `Departments.jsx` - Department showcase
- `Services.jsx` - Service catalog
- `BookAppointment.jsx` - Appointment booking form
- `Contact.jsx` - Contact form and info

### State Management
- React hooks (useState, useEffect)
- No external state management library
- API calls using Axios

### Styling
- Tailwind CSS for utility classes
- Custom CSS in `index.css`
- Responsive design with mobile-first approach

### Routing
- React Router DOM for client-side routing
- Routes defined in `App.jsx`

### API Integration
- Axios for HTTP requests
- Vite proxy for CORS handling
- Fallback to mock data if API fails

---

## 🔧 Backend Architecture

### Django Apps
- `hospital` - Main application containing all business logic

### ViewSets
- `DepartmentViewSet` - Department CRUD operations
- `DoctorViewSet` - Doctor CRUD operations
- `ServiceViewSet` - Service CRUD operations
- `AppointmentViewSet` - Appointment CRUD operations
- `ContactMessageViewSet` - Contact message creation

### Serializers
- Model serializers for all models
- Custom serializers for create operations
- Nested serializers for related data

### Middleware
- `CorsMiddleware` - Enable CORS for frontend
- Standard Django middleware stack

### Admin
- Custom admin configurations
- List filters and search fields
- Read-only fields for timestamps

### Management Commands
- `seed_data` - Populate database with sample data

---

## 🎨 Customization Guide

### Changing Colors

**Frontend Colors** (`frontend/tailwind.config.js`):
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        // ... more shades
        600: '#0ea5e9',  // Main primary color
      },
      secondary: {
        600: '#22c55e',  // Main secondary color
      }
    }
  }
}
```

**Add custom colors by modifying the values above.**

### Adding New Pages

1. Create page component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`:
```jsx
<Route path="/new-page" element={<NewPage />} />
```
3. Add navigation link in `frontend/src/components/Navbar.jsx`

### Adding New API Endpoints

1. Add view/viewset in `backend/hospital/views.py`
2. Add URL in `backend/hospital/urls.py`
3. Add serializer if needed in `backend/hospital/serializers.py`

### Modifying Database

1. Modify model in `backend/hospital/models.py`
2. Create migration:
```bash
python manage.py makemigrations
```
3. Apply migration:
```bash
python manage.py migrate
```

### Adding Sample Data

Edit `backend/hospital/management/commands/seed_data.py` and run:
```bash
python manage.py seed_data
```

---

## 🚢 Deployment Guide

### Backend Deployment (Production)

1. **Settings Changes** (`backend/backend/settings.py`):
```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'remo_hospital',
        'USER': 'your_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

2. **Install Production Dependencies**:
```bash
pip install gunicorn psycopg2-binary
```

3. **Collect Static Files**:
```bash
python manage.py collectstatic
```

4. **Run with Gunicorn**:
```bash
gunicorn backend.wsgi:application
```

### Frontend Deployment (Production)

1. **Build for Production**:
```bash
cd frontend
npm run build
```

2. **Serve with Nginx**:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8000;
    }
}
```

### Environment Variables

Create `.env` file:
```
DJANGO_SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost/dbname
ALLOWED_HOSTS=yourdomain.com
```

---

## 🔍 Troubleshooting

### Common Issues

**Issue: Port already in use**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Change port
python manage.py runserver 8001
```

**Issue: CORS errors**
- Check `CORS_ALLOWED_ORIGINS` in settings.py
- Ensure frontend URL is listed

**Issue: Database locked**
```bash
cd backend
rm db.sqlite3
python manage.py migrate
python manage.py seed_data
```

**Issue: npm install fails**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Issue: Python module not found**
```bash
# Activate virtual environment
venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Debug Mode

**Backend Logs:**
- Check terminal output for errors
- Enable Django debug in settings.py

**Frontend Logs:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls

---

## 📚 Additional Resources

### Documentation Links
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

### Useful Commands

**Backend:**
```bash
python manage.py runserver           # Start dev server
python manage.py shell              # Django shell
python manage.py createsuperuser     # Create admin
python manage.py makemigrations      # Create migrations
python manage.py migrate             # Apply migrations
python manage.py seed_data           # Seed database
```

**Frontend:**
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
```

---

## 🤝 Contributing

When making changes:
1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Document changes
5. Commit with clear messages

---

## 📝 License

This project is created for demonstration purposes.

---

**End of Developer Guide** 🎉
