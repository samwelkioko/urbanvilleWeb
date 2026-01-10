from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    
    PROJECT_TYPES = [
        ('RESIDENTIAL', 'Residential'),
        ('COMMERCIAL', 'Commercial'),
        ('HOSPITALITY', 'Hospitality'),
        ('OTHER', 'Other'),
    ]
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPES, default='RESIDENTIAL')
    budget = models.CharField(max_length=100, blank=True)
    timeline = models.CharField(max_length=100, blank=True)
    
    consulted_others = models.BooleanField(default=False)
    other_designers = models.TextField(blank=True, null=True)
    
    file = models.FileField(upload_to='sketches/', blank=True, null=True)
    
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.name}"
