"""Server-rendered pages for the Django-only Remo H website.

The REST API lives in ``views.py`` and remains available under ``/api/``.
"""

from django.contrib import messages
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404, redirect, render

from .forms import AppointmentForm, ContactForm
from .models import Appointment, Department, Doctor, Service


def home(request):
    departments = Department.objects.annotate(doctor_count=Count('doctors')).order_by('name')
    return render(request, 'hospital/home.html', {
        'departments': departments,
        'doctors': Doctor.objects.select_related('department').filter(available=True).order_by('name'),
        'stats': [
            {'value': '5+', 'label': 'Specialist Doctors', 'sub': 'Across 50+ medical domains'},
            {'value': '50+', 'label': 'Clinical Departments', 'sub': 'Fully equipped specialty units'},
            {'value': '100K+', 'label': 'Patients Treated', 'sub': '99.2% patient satisfaction'},
            {'value': '24/7', 'label': 'Emergency Ready', 'sub': 'Zero-wait triage response'},
        ],
        'features': [
            {'title': 'Expert Medical Faculty', 'icon': 'stethoscope', 'description': 'Board-certified specialists with decades of clinical experience across all major subspecialties.'},
            {'title': 'Modern Diagnostic Suites', 'icon': 'scan', 'description': 'Equipped with 3T MRI, low-dose CT scanners, and automated pathology laboratories for rapid results.'},
            {'title': '24/7 Rapid Emergency', 'icon': 'activity', 'description': 'Round-the-clock level-1 trauma care, dedicated resuscitation units, and immediate ambulance triage.'},
            {'title': 'Accredited Quality Care', 'icon': 'award', 'description': 'JCI-accredited facility following rigorous patient safety benchmarks, hygiene, and ethical standards.'},
        ],
        'testimonials': [
            {'name': 'Eleanor Vance', 'department': 'Cardiology Patient', 'comment': 'The care and attention I received from Dr. Sarah Johnson and the cardiology team was phenomenal. The online booking made scheduling appointments effortless!'},
            {'name': 'David Miller', 'department': 'Orthopedics Patient', 'comment': 'From physical therapy to orthopedic consultation, Remo Hospital provided seamless, supportive care throughout my entire knee rehabilitation.'},
            {'name': 'Amina Al-Mansoor', 'department': 'Pediatrics Parent', 'comment': 'The pediatric wing is warm, child-friendly, and professional. The doctors took their time explaining everything and put our family at ease.'},
        ],
        'faqs': [
            {'question': 'How do I schedule an appointment online?', 'answer': 'Select your preferred department and doctor directly on our website or use the Quick Appointment widget above. Choose your date and time slot, enter your details, and receive instant confirmation.'},
            {'question': 'Do you offer emergency walk-in care?', 'answer': 'Yes. Our 24/7 Emergency Department accepts walk-in patients and emergency ambulance transfers around the clock without any prior appointment required.'},
            {'question': 'What insurance plans are accepted at Remo Hospital?', 'answer': 'We accept all major regional and international insurance policies including Medicare, Medicaid, BlueCross BlueShield, Aetna, Cigna, and UnitedHealthcare.'},
            {'question': 'Can I view or change my appointment time?', 'answer': 'Yes. You will receive an appointment confirmation with a reference number. You can reach out to our desk via email or phone (+1 555-123-4567) anytime to adjust your slot.'},
        ],
    })


def about(request):
    return render(request, 'hospital/about.html')


PROCEDURES = {
    'Cardiology': ['ECG & Echocardiography', 'Cardiac Catheterization', 'Coronary Care', 'Cardiovascular Rehab'],
    'Neurology': ['EEG & EMG Testing', 'Stroke Response Unit', 'Movement Disorders', 'Cognitive Memory Clinic'],
    'Orthopedics': ['Total Joint Arthroplasty', 'Sports Medicine & Arthroscopy', 'Spine Surgery', 'Physical Therapy'],
    'Pediatrics': ['Neonatal Intensive Care', 'Child Immunization Programs', 'Pediatric Surgery', 'Growth & Development'],
    'Dermatology': ['Melanoma Screening', 'Clinical Phototherapy', 'Cosmetic Laser', 'Contact Allergy Diagnostics'],
    'Oncology': ['Precision Chemotherapy', 'Linear Accelerator Radiation', 'Immuno-oncology', 'Palliative Support'],
}


def departments(request):
    queryset = Department.objects.annotate(doctor_count=Count('doctors')).order_by('name')
    query = request.GET.get('q', '').strip()
    if query:
        queryset = queryset.filter(Q(name__icontains=query) | Q(description__icontains=query))
    departments = list(queryset)
    for department in departments:
        department.procedures = PROCEDURES.get(department.name, [
            'Specialized Consultations', 'Diagnostic Testing', 'Inpatient Recovery',
        ])
    return render(request, 'hospital/departments.html', {
        'departments': departments,
        'query': query,
    })


def department_detail(request, pk):
    department = get_object_or_404(Department, pk=pk)
    doctors = department.doctors.select_related('department').all()
    return render(request, 'hospital/department_detail.html', {
        'department': department,
        'doctors': doctors,
    })


def doctors(request):
    all_departments = Department.objects.annotate(doctor_count=Count('doctors')).order_by('name')
    queryset = Doctor.objects.select_related('department').all()

    query = request.GET.get('q', '').strip()
    department_id = request.GET.get('department', '').strip()
    available_only = request.GET.get('available') == 'on'
    sort = request.GET.get('sort', 'experience')

    if query:
        queryset = queryset.filter(
            Q(name__icontains=query)
            | Q(specialization__icontains=query)
            | Q(department__name__icontains=query)
            | Q(qualification__icontains=query)
        )

    if department_id:
        if department_id.isdigit():
            queryset = queryset.filter(department_id=int(department_id))
        else:
            queryset = queryset.filter(department__name__iexact=department_id)

    if available_only:
        queryset = queryset.filter(available=True)

    sort_options = {
        'name': 'name',
        'experience': '-experience_years',
        'fee_low': 'consultation_fee',
        'fee_high': '-consultation_fee',
    }
    queryset = queryset.order_by(sort_options.get(sort, 'name'), 'name')

    return render(request, 'hospital/doctors.html', {
        'doctors': queryset,
        'all_doctors_count': Doctor.objects.count(),
        'departments': all_departments,
        'query': query,
        'department_id': department_id,
        'available_only': available_only,
        'sort': sort,
    })


def doctor_detail(request, pk):
    doctor = get_object_or_404(Doctor.objects.select_related('department'), pk=pk)
    return render(request, 'hospital/doctor_detail.html', {'doctor': doctor})


SERVICE_DETAILS = {
    'Health Checkups': ('Preventive', ['Comprehensive Blood Count', 'Lipid & Cardiac Profile', 'Diabetes Screen (HbA1c)', 'ECG & Chest Radiography', 'Physician Consultation'], True),
    'Diagnostic Services': ('Diagnostics', ['3T High-Field MRI & Low-Dose CT', '4D Ultrasound Imaging', 'Digital X-Ray Systems', 'Automated Clinical Pathology', 'Same-Day Digital Reports'], True),
    'Emergency Care': ('Emergency', ['Level-1 Trauma Resuscitation', 'Rapid Cardiac Intervention', 'Acute Stroke Response Unit', 'Dedicated ICU Ambulance Fleet', '24/7 Board-Certified Triage'], True),
    'Surgery Services': ('Surgical', ['Robotic & Laparoscopic Surgery', 'Minimally Invasive Joint Repair', 'Neurosurgical Interventions', 'General Gastrointestinal Surgery', 'Post-Op Recovery Monitoring'], False),
    'Vaccination Programs': ('Preventive', ['CDC Childhood Immunization Schedule', 'Annual Influenza Vaccines', 'International Travel Vaccines', 'COVID-19 & Boosters', 'Immunization Passport Record'], False),
    'Rehabilitation Services': ('Wellness', ['Post-Surgical Physical Therapy', 'Neurological Rehab & Speech Therapy', 'Cardiac Rehabilitation', 'Occupational Therapy', 'Pain Management Protocols'], False),
    'Maternity Services': ('Specialized', ['Comprehensive Prenatal Monitoring', 'Advanced Labor & Delivery Suites', 'Neonatal Level-III Nursery', 'Lactation Consultation', 'Postpartum Wellness Classes'], True),
    'Mental Health Services': ('Wellness', ['Clinical Psychiatric Diagnostics', 'Cognitive Behavioral Therapy', 'Stress & Anxiety Management', 'Adolescent Counseling', 'Confidential Patient Sessions'], False),
    'Dental Services': ('Specialized', ['Preventative Scaling & Polish', 'Restorative Dental Fillings', 'Endodontic Root Canal Therapy', 'Orthodontic Aligners', 'Cosmetic Whitening Procedures'], False),
}


def services(request):
    query = request.GET.get('q', '').strip()
    category = request.GET.get('category', '').strip()
    queryset = Service.objects.all()
    if query:
        queryset = queryset.filter(Q(title__icontains=query) | Q(description__icontains=query))
    items = list(queryset)
    for service in items:
        detail = SERVICE_DETAILS.get(service.title, (
            'Specialized',
            ['Comprehensive Clinical Evaluation', 'Specialist Review', 'Follow-up Care'],
            False,
        ))
        service.category, service.features, service.popular = detail

    all_categories = ['Preventive', 'Diagnostics', 'Emergency', 'Surgical', 'Wellness', 'Specialized']
    if category:
        items = [service for service in items if service.category == category]

    return render(request, 'hospital/services.html', {
        'services': items,
        'query': query,
        'category': category,
        'categories': all_categories,
    })


def service_detail(request, pk):
    service = get_object_or_404(Service, pk=pk)
    detail = SERVICE_DETAILS.get(service.title, (
        'Specialized',
        ['Comprehensive Clinical Evaluation', 'Specialist Review', 'Follow-up Care'],
        False,
    ))
    service.category, service.features, service.popular = detail
    return render(request, 'hospital/service_detail.html', {'service': service})


def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(
                request,
                'Thank you for reaching out. Our team will get back to you shortly.',
            )
            return redirect('contact')
    else:
        form = ContactForm()

    return render(request, 'hospital/contact.html', {'form': form})


def book_appointment(request):
    initial = {
        'department': request.GET.get('department', ''),
        'doctor': request.GET.get('doctor', ''),
        'appointment_date': request.GET.get('date', ''),
        'reason': request.GET.get('reason', ''),
    }
    # A doctor selected on another page determines the department.
    if initial['doctor'].isdigit():
        selected_doctor = Doctor.objects.filter(pk=int(initial['doctor'])).first()
        if selected_doctor:
            initial['department'] = selected_doctor.department_id

    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.is_valid():
            appointment = form.save()
            messages.success(request, 'Your appointment request has been received.')
            return redirect('appointment_success', pk=appointment.pk)
    else:
        form = AppointmentForm(initial=initial)

    doctors_by_department = {}
    for doctor in Doctor.objects.select_related('department').all():
        doctors_by_department.setdefault(str(doctor.department_id), []).append(doctor)

    return render(request, 'hospital/book_appointment.html', {
        'form': form,
        'departments': Department.objects.all(),
        'doctors_by_department': doctors_by_department,
    })


def appointment_success(request, pk):
    appointment = get_object_or_404(
        Appointment.objects.select_related('doctor', 'department'), pk=pk
    )
    return render(request, 'hospital/appointment_success.html', {'appointment': appointment})
