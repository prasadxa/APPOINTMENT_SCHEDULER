from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, DepartmentViewSet

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'departments', DepartmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
