from rest_framework import serializers
from .models import User, PatientProfile
from rest_framework_simplejwt.tokens import RefreshToken

class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = ('date_of_birth', 'blood_group', 'address', 'phone_number')

class UserSerializer(serializers.ModelSerializer):
    patient_profile = PatientProfileSerializer()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role', 'patient_profile')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('patient_profile', None)
        
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        if profile_data is not None:
            profile, created = PatientProfile.objects.get_or_create(user=instance)
            profile.date_of_birth = profile_data.get('date_of_birth', profile.date_of_birth)
            profile.blood_group = profile_data.get('blood_group', profile.blood_group)
            profile.address = profile_data.get('address', profile.address)
            profile.phone_number = profile_data.get('phone_number', profile.phone_number)
            profile.save()
            
        return instance

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'role')
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            password=validated_data['password'],
            role=validated_data.get('role', 'patient')
        )
        if user.role == 'patient':
            PatientProfile.objects.create(user=user)
        return user
