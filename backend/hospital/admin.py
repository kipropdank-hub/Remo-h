from django.contrib import admin
from .models import Department, Doctor, Service, Appointment, ContactMessage

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {}

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['name', 'specialization', 'department', 'available', 'consultation_fee']
    list_filter = ['department', 'gender', 'available']
    search_fields = ['name', 'specialization', 'email']
    readonly_fields = ['created_at']

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['created_at']

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['patient_name', 'doctor', 'appointment_date', 'appointment_time', 'status']
    list_filter = ['status', 'department', 'appointment_date']
    search_fields = ['patient_name', 'patient_email', 'doctor__name']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']
