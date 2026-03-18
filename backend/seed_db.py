import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hospital_system.settings')
django.setup()

from apps.users.models import User, PatientProfile
from apps.doctors.models import Department, DoctorProfile

def seed_db():
    print("Clearing old data...")
    User.objects.all().delete()
    Department.objects.all().delete()

    print("Creating admin...")
    admin = User.objects.create_superuser('admin', 'admin@healthhub.com', 'admin_password', role='admin')

    print("Creating departments...")
    cardio = Department.objects.create(name='Cardiology', description='Heart & Blood Vessels')
    neuro = Department.objects.create(name='Neurology', description='Brain & Nerves')
    pedia = Department.objects.create(name='Pediatrics', description='Child Care')

    print("Creating doctors...")
    doc1_user = User.objects.create_user('sarah', 'sarah@healthhub.com', 'password123', first_name='Sarah', last_name='Jenkins', role='doctor')
    DoctorProfile.objects.create(
        user=doc1_user, department=cardio, specialization='Chief Cardiologist', 
        experience_years=15, consultation_fee=150.00, available_days='Mon, Wed, Fri'
    )

    doc2_user = User.objects.create_user('michael', 'michael@healthhub.com', 'password123', first_name='Michael', last_name='Chen', role='doctor')
    DoctorProfile.objects.create(
        user=doc2_user, department=neuro, specialization='Neurologist', 
        experience_years=10, consultation_fee=200.00, available_days='Tue, Thu'
    )

    doc3_user = User.objects.create_user('emily', 'emily@healthhub.com', 'password123', first_name='Emily', last_name='Davis', role='doctor')
    DoctorProfile.objects.create(
        user=doc3_user, department=pedia, specialization='Pediatrician', 
        experience_years=8, consultation_fee=100.00, available_days='Mon, Tue, Wed, Thu, Fri'
    )
    
    print("Creating dummy patient...")
    patient_user = User.objects.create_user('johndoe', 'john@gmail.com', 'password123', first_name='John', last_name='Doe', role='patient')
    PatientProfile.objects.create(user=patient_user)

    print("Database seeded successfully!")

if __name__ == '__main__':
    seed_db()
