from django.db import models

class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    review = models.TextField()
    rating = models.PositiveIntegerField(default=5)
    avatar = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client_name} ({self.rating} stars)"
