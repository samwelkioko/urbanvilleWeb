from django.contrib import admin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'featured', 'created_at')
    list_editable = ('featured',)
    prepopulated_fields = {'slug': ('title',)}
