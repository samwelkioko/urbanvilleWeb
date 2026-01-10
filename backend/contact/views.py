from rest_framework import viewsets, permissions, mixins
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageViewSet(mixins.CreateModelMixin,
                            mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            viewsets.GenericViewSet):
    """
    POST /api/contact/ -> Create message (Public)
    GET /api/leads/ -> List messages (Admin only, handled by permissions normally but simplified here)
    """
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()] # Assume auth required for list (leads)
