from rest_framework import serializers
from .models import Appointment
from apps.doctors.serializers import DoctorProfileSerializer
from apps.users.serializers import UserSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    doctor_details = DoctorProfileSerializer(source='doctor', read_only=True)
    patient_details = UserSerializer(source='patient', read_only=True)
    
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('patient', 'status', 'consultation_notes')
