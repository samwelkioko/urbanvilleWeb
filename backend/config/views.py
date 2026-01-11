from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request, format=None):
    return Response({
        'auth': {
            'login': reverse('token_obtain_pair', request=request, format=format),
            'refresh': reverse('token_refresh', request=request, format=format),
        },
        'users': {
            'me': reverse('users-me', request=request, format=format),
        },
        'services': reverse('service-list', request=request, format=format),
        'portfolio': reverse('project-list', request=request, format=format),
        'testimonials': reverse('testimonial-list', request=request, format=format),
        'blog': reverse('blogpost-list', request=request, format=format),
        'contact': reverse('contact-list', request=request, format=format),
        'leads': reverse('leads', request=request, format=format),
    })
