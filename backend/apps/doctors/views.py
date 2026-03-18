from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import DoctorProfile, Department
from .serializers import DoctorProfileSerializer, DepartmentSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.all().select_related('user', 'department')
    serializer_class = DoctorProfileSerializer
    permission_classes = [permissions.AllowAny]

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.AllowAny]
