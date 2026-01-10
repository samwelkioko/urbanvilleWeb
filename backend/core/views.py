from django.http import JsonResponse

def root_view(request):
    return JsonResponse({
        "status": "online",
        "message": "Urbanville Web API is running",
        "endpoints": ["/admin/", "/api/"]
    })
