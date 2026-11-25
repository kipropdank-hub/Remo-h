from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import pages
from .views import (
    DepartmentViewSet, DoctorViewSet, ServiceViewSet,
    AppointmentViewSet, ContactMessageViewSet
)

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'contact', ContactMessageViewSet, basename='contact')

urlpatterns = [
    # Server-rendered Django pages
    path('', pages.home, name='home'),
    path('about/', pages.about, name='about'),
    path('departments/', pages.departments, name='departments'),
    path('departments/<int:pk>/', pages.department_detail, name='department_detail'),
    path('doctors/', pages.doctors, name='doctors'),
    path('doctors/<int:pk>/', pages.doctor_detail, name='doctor_detail'),
    path('services/', pages.services, name='services'),
    path('services/<int:pk>/', pages.service_detail, name='service_detail'),
    path('contact/', pages.contact, name='contact'),
    path('book-appointment/', pages.book_appointment, name='book_appointment'),
    path('appointment/<int:pk>/success/', pages.appointment_success, name='appointment_success'),

    # JSON API (kept for integrations)
    path('api/', include(router.urls)),
]
