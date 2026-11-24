from django.core.management.base import BaseCommand
from hospital.models import Department, Doctor, Service

class Command(BaseCommand):
    help = 'Seed the database with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with sample data...')

        # Create Departments
        departments_data = [
            {
                'name': 'Cardiology',
                'description': 'Comprehensive heart care including diagnostics, treatment, and rehabilitation for all cardiac conditions.',
                'icon': 'fa-heart-pulse'
            },
            {
                'name': 'Neurology',
                'description': 'Expert diagnosis and treatment of neurological disorders including stroke, epilepsy, and Parkinson\'s disease.',
                'icon': 'fa-brain'
            },
            {
                'name': 'Orthopedics',
                'description': 'Specialized care for bones, joints, and muscles including sports medicine and joint replacement surgery.',
                'icon': 'fa-bone'
            },
            {
                'name': 'Pediatrics',
                'description': 'Comprehensive healthcare for infants, children, and adolescents with child-friendly facilities.',
                'icon': 'fa-baby'
            },
            {
                'name': 'Dermatology',
                'description': 'Expert care for skin conditions including acne, eczema, and skin cancer prevention and treatment.',
                'icon': 'fa-shield-virus'
            },
            {
                'name': 'Oncology',
                'description': 'Comprehensive cancer care including chemotherapy, radiation therapy, and immunotherapy.',
                'icon': 'fa-activity'
            },
        ]

        departments = {}
        for dept_data in departments_data:
            dept, created = Department.objects.get_or_create(
                name=dept_data['name'],
                defaults={
                    'description': dept_data['description'],
                    'icon': dept_data['icon']
                }
            )
            departments[dept.name] = dept
            if created:
                self.stdout.write(f'Created department: {dept.name}')
            else:
                self.stdout.write(f'Department already exists: {dept.name}')

        # Create Doctors
        doctors_data = [
            {
                'name': 'Dr. Sarah Johnson',
                'specialization': 'Cardiologist',
                'department': departments['Cardiology'],
                'gender': 'F',
                'phone': '+15551234567',
                'email': 'sarah.johnson@remohospital.com',
                'experience_years': 15,
                'qualification': 'MD, FACC',
                'bio': 'Expert in interventional cardiology with over 15 years of experience in treating heart conditions.',
                'consultation_fee': 150.00,
                'available': True
            },
            {
                'name': 'Dr. Michael Chen',
                'specialization': 'Neurologist',
                'department': departments['Neurology'],
                'gender': 'M',
                'phone': '+15551234568',
                'email': 'michael.chen@remohospital.com',
                'experience_years': 12,
                'qualification': 'MD, PhD',
                'bio': 'Specialized in neurodegenerative disorders and brain injury rehabilitation.',
                'consultation_fee': 180.00,
                'available': True
            },
            {
                'name': 'Dr. Emily Rodriguez',
                'specialization': 'Orthopedic Surgeon',
                'department': departments['Orthopedics'],
                'gender': 'F',
                'phone': '+15551234569',
                'email': 'emily.rodriguez@remohospital.com',
                'experience_years': 18,
                'qualification': 'MD, FAAOS',
                'bio': 'Expert in joint replacement and sports medicine with numerous successful surgeries.',
                'consultation_fee': 200.00,
                'available': True
            },
            {
                'name': 'Dr. James Wilson',
                'specialization': 'Pediatrician',
                'department': departments['Pediatrics'],
                'gender': 'M',
                'phone': '+15551234570',
                'email': 'james.wilson@remohospital.com',
                'experience_years': 10,
                'qualification': 'MD, FAAP',
                'bio': 'Dedicated to providing comprehensive care for children from infancy through adolescence.',
                'consultation_fee': 120.00,
                'available': True
            },
            {
                'name': 'Dr. Lisa Anderson',
                'specialization': 'Dermatologist',
                'department': departments['Dermatology'],
                'gender': 'F',
                'phone': '+15551234571',
                'email': 'lisa.anderson@remohospital.com',
                'experience_years': 8,
                'qualification': 'MD, FAAD',
                'bio': 'Specialist in medical and cosmetic dermatology with focus on skin cancer prevention.',
                'consultation_fee': 140.00,
                'available': False
            },
            {
                'name': 'Dr. Robert Taylor',
                'specialization': 'Oncologist',
                'department': departments['Oncology'],
                'gender': 'M',
                'phone': '+15551234572',
                'email': 'robert.taylor@remohospital.com',
                'experience_years': 20,
                'qualification': 'MD, FASCO',
                'bio': 'Leading expert in cancer treatment with expertise in immunotherapy and targeted therapy.',
                'consultation_fee': 250.00,
                'available': True
            },
        ]

        for doc_data in doctors_data:
            doctor, created = Doctor.objects.get_or_create(
                email=doc_data['email'],
                defaults=doc_data
            )
            if created:
                self.stdout.write(f'Created doctor: {doctor.name}')
            else:
                self.stdout.write(f'Doctor already exists: {doctor.name}')

        # Create Services
        services_data = [
            {
                'title': 'Health Checkups',
                'description': 'Comprehensive health screening packages for early detection and prevention of diseases.',
                'icon': 'fa-stethoscope',
                'price': 199.00
            },
            {
                'title': 'Diagnostic Services',
                'description': 'Advanced diagnostic imaging and laboratory tests for accurate diagnosis.',
                'icon': 'fa-microscope',
                'price': None
            },
            {
                'title': 'Emergency Care',
                'description': '24/7 emergency medical services with rapid response and critical care.',
                'icon': 'fa-activity',
                'price': None
            },
            {
                'title': 'Surgery Services',
                'description': 'State-of-the-art surgical suites for both elective and emergency procedures.',
                'icon': 'fa-syringe',
                'price': None
            },
            {
                'title': 'Vaccination Programs',
                'description': 'Comprehensive immunization services for children and adults.',
                'icon': 'fa-syringe',
                'price': 50.00
            },
            {
                'title': 'Rehabilitation Services',
                'description': 'Physical therapy and rehabilitation programs for recovery and wellness.',
                'icon': 'fa-person-walking',
                'price': 120.00
            },
            {
                'title': 'Maternity Services',
                'description': 'Complete maternity care from prenatal to postnatal support.',
                'icon': 'fa-baby',
                'price': None
            },
            {
                'title': 'Mental Health Services',
                'description': 'Comprehensive mental health care including counseling and psychiatric services.',
                'icon': 'fa-brain',
                'price': 150.00
            },
            {
                'title': 'Dental Services',
                'description': 'Complete dental care including preventive, cosmetic, and restorative dentistry.',
                'icon': 'fa-tooth',
                'price': 80.00
            },
        ]

        for service_data in services_data:
            service, created = Service.objects.get_or_create(
                title=service_data['title'],
                defaults=service_data
            )
            if created:
                self.stdout.write(f'Created service: {service.title}')
            else:
                self.stdout.write(f'Service already exists: {service.title}')

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
