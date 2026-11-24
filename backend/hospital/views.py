from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Department, Doctor, Service, Appointment, ContactMessage
from .serializers import (
    DepartmentSerializer, DoctorSerializer, DoctorListSerializer,
    ServiceSerializer, AppointmentSerializer, AppointmentCreateSerializer,
    ContactMessageSerializer
)

class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    @action(detail=True, methods=['get'])
    def doctors(self, request, pk=None):
        department = self.get_object()
        doctors = department.doctors.filter(available=True)
        serializer = DoctorListSerializer(doctors, many=True)
        return Response(serializer.data)

class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return DoctorListSerializer
        return DoctorSerializer

    @action(detail=False, methods=['get'])
    def available(self, request):
        doctors = self.queryset.filter(available=True)
        serializer = DoctorListSerializer(doctors, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_department(self, request):
        department_id = request.query_params.get('department_id')
        if department_id:
            doctors = self.queryset.filter(department_id=department_id, available=True)
            serializer = DoctorListSerializer(doctors, many=True)
            return Response(serializer.data)
        return Response({'error': 'department_id parameter required'}, status=status.HTTP_400_BAD_REQUEST)

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return AppointmentCreateSerializer
        return AppointmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check if appointment time is valid (not in the past)
        appointment_datetime = datetime.combine(
            serializer.validated_data['appointment_date'],
            serializer.validated_data['appointment_time']
        )

        if appointment_datetime < timezone.now():
            return Response(
                {'error': 'Cannot book appointments in the past'},
                status=status.HTTP_400_BAD_REQUEST
            )

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            AppointmentSerializer(serializer.instance).data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    @action(detail=False, methods=['get'])
    def available_slots(self, request):
        doctor_id = request.query_params.get('doctor_id')
        date_str = request.query_params.get('date')

        if not doctor_id or not date_str:
            return Response(
                {'error': 'doctor_id and date parameters required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {'error': 'Invalid date format. Use YYYY-MM-DD'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get existing appointments for the doctor on that date
        existing_appointments = Appointment.objects.filter(
            doctor_id=doctor_id,
            appointment_date=date,
            status__in=['pending', 'confirmed']
        ).values_list('appointment_time', flat=True)

        # Generate available time slots (9 AM to 5 PM, every 30 minutes)
        available_slots = []
        start_time = datetime.strptime('09:00', '%H:%M').time()
        end_time = datetime.strptime('17:00', '%H:%M').time()

        current = datetime.combine(date, start_time)
        end = datetime.combine(date, end_time)

        while current < end:
            time_slot = current.time()
            if time_slot not in existing_appointments:
                available_slots.append(time_slot.strftime('%H:%M'))
            current += timedelta(minutes=30)

        return Response({'available_slots': available_slots})

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['post', 'options', 'head']
