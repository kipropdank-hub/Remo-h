from rest_framework import serializers
from .models import Department, Doctor, Service, Appointment, ContactMessage

class DepartmentSerializer(serializers.ModelSerializer):
    doctors_count = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = ['id', 'name', 'description', 'icon', 'doctors_count', 'created_at']

    def get_doctors_count(self, obj):
        return obj.doctors.count()

class DoctorSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Doctor
        fields = [
            'id', 'name', 'specialization', 'department', 'department_name',
            'gender', 'phone', 'email', 'experience_years', 'qualification',
            'bio', 'image', 'available', 'consultation_fee', 'created_at'
        ]

class DoctorListSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Doctor
        fields = [
            'id', 'name', 'specialization', 'department', 'department_name',
            'experience_years', 'qualification', 'bio', 'available', 'consultation_fee'
        ]

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'icon', 'price', 'created_at']

class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'patient_name', 'patient_email', 'patient_phone',
            'doctor', 'doctor_name', 'department', 'department_name',
            'appointment_date', 'appointment_time', 'reason', 'status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['status', 'created_at', 'updated_at']

class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'patient_name', 'patient_email', 'patient_phone',
            'doctor', 'department', 'appointment_date',
            'appointment_time', 'reason'
        ]

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'created_at']
        read_only_fields = ['created_at']
