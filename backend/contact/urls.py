from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactMessageViewSet

router = DefaultRouter()
router.register(r'contact', ContactMessageViewSet, basename='contact')
# router.register(r'leads', ContactMessageViewSet, basename='leads') 
# The user wants /api/contact/ (POST) and /api/leads/ (GET). Default router does /contact/ (list/create).
# I will make 'leads' a separate route or aliased.

urlpatterns = [
    path('', include(router.urls)),
    path('leads/', ContactMessageViewSet.as_view({'get': 'list'}), name='leads'),
]
