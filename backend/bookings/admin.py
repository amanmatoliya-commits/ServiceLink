"""
bookings/admin.py
-----------------
Register Booking model with Django admin.
"""

from django.contrib import admin
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['user', 'service', 'booking_date', 'status', 'created_at']
    list_filter = ['status', 'booking_date']
    search_fields = ['user__name', 'service__name']
