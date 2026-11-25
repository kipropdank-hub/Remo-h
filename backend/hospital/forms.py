from datetime import datetime

from django import forms
from django.utils import timezone

from .models import Appointment, ContactMessage, Department, Doctor


FIELD_CLASSES = 'form-control'


class AppointmentForm(forms.ModelForm):
    """Server-side form used by the Book Appointment page."""

    class Meta:
        model = Appointment
        fields = [
            'patient_name', 'patient_email', 'patient_phone',
            'department', 'doctor', 'appointment_date',
            'appointment_time', 'reason',
        ]
        widgets = {
            'patient_name': forms.TextInput(attrs={'class': FIELD_CLASSES, 'placeholder': 'Your full name'}),
            'patient_email': forms.EmailInput(attrs={'class': FIELD_CLASSES, 'placeholder': 'you@example.com'}),
            'patient_phone': forms.TextInput(attrs={'class': FIELD_CLASSES, 'placeholder': '+1 555 000 0000'}),
            'department': forms.Select(attrs={'class': FIELD_CLASSES}),
            'doctor': forms.Select(attrs={'class': FIELD_CLASSES}),
            'appointment_date': forms.DateInput(attrs={'class': FIELD_CLASSES, 'type': 'date'}),
            'appointment_time': forms.TimeInput(attrs={'class': FIELD_CLASSES, 'type': 'time'}),
            'reason': forms.Textarea(attrs={'class': FIELD_CLASSES, 'rows': 4, 'placeholder': 'Briefly describe your reason for visiting'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['department'].queryset = Department.objects.all()
        self.fields['doctor'].queryset = Doctor.objects.select_related('department').all()
        labels = {
            'patient_name': 'Full name',
            'patient_email': 'Email address',
            'patient_phone': 'Phone number',
            'department': 'Department',
            'doctor': 'Doctor',
            'appointment_date': 'Preferred date',
            'appointment_time': 'Preferred time',
            'reason': 'Reason for appointment',
        }
        for name, field in self.fields.items():
            field.label = labels.get(name, field.label)

    def clean(self):
        cleaned_data = super().clean()
        doctor = cleaned_data.get('doctor')
        department = cleaned_data.get('department')
        appointment_date = cleaned_data.get('appointment_date')
        appointment_time = cleaned_data.get('appointment_time')

        if doctor and department and doctor.department_id != department.pk:
            self.add_error(
                'department',
                'Please choose a doctor from the selected department.',
            )

        if doctor and not doctor.available:
            self.add_error('doctor', 'This doctor is currently unavailable. Please choose another specialist.')

        if appointment_date and appointment_time:
            appointment_datetime = timezone.make_aware(
                datetime.combine(appointment_date, appointment_time)
            )
            if appointment_datetime < timezone.now():
                self.add_error('appointment_date', 'Appointments cannot be booked in the past.')
            elif doctor:
                slot_taken = Appointment.objects.filter(
                    doctor=doctor,
                    appointment_date=appointment_date,
                    appointment_time=appointment_time,
                    status__in=['pending', 'confirmed'],
                ).exists()
                if slot_taken:
                    self.add_error('appointment_time', 'This time slot is already booked. Please choose another time.')

        return cleaned_data


class ContactForm(forms.ModelForm):
    """Server-side form used by the Contact page."""

    subject = forms.ChoiceField(
        choices=[
            ('', '-- Select Subject --'),
            ('General Inquiry', 'General Information'),
            ('Appointment Help', 'Appointment Scheduling / Reschedule'),
            ('Insurance & Billing', 'Insurance Coverage & Billing'),
            ('Medical Records', 'Medical Records Request'),
            ('Patient Feedback', 'Patient Feedback / Compliment'),
        ],
        widget=forms.Select(attrs={'class': FIELD_CLASSES}),
    )

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': FIELD_CLASSES, 'placeholder': 'Your full name'}),
            'email': forms.EmailInput(attrs={'class': FIELD_CLASSES, 'placeholder': 'you@example.com'}),
            'phone': forms.TextInput(attrs={'class': FIELD_CLASSES, 'placeholder': '+1 555 000 0000'}),
            'message': forms.Textarea(attrs={'class': FIELD_CLASSES, 'rows': 6, 'placeholder': 'Write your message here'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['phone'].required = False
        labels = {
            'name': 'Full name',
            'email': 'Email address',
            'phone': 'Phone number',
            'subject': 'Inquiry topic',
            'message': 'Detailed message',
        }
        for name, field in self.fields.items():
            field.label = labels.get(name, field.label)
