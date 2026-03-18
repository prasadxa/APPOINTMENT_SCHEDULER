from rest_framework import serializers
from .models import Department, DoctorProfile
from apps.users.models import User
from apps.users.serializers import UserSerializer

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class DoctorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = DoctorProfile
        fields = ('id', 'user', 'department', 'department_name', 'specialization', 'experience_years', 'consultation_fee', 'available_days', 'first_name', 'last_name', 'email', 'username', 'password')

    def create(self, validated_data):
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        email = validated_data.pop('email')
        username = validated_data.pop('username')
        password = validated_data.pop('password')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            role='doctor'
        )
        doctor = DoctorProfile.objects.create(user=user, **validated_data)
        return doctor
