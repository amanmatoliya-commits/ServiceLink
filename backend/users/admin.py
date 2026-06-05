"""
users/admin.py
--------------
Register the User model with Django admin panel.
This lets admins manage users at /admin/.
"""

from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'is_active', 'created_at']
    search_fields = ['name', 'email']
    list_filter = ['is_active', 'is_staff']
