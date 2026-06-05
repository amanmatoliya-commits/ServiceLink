"""
bookings/serializers.py
-----------------------
Serializers for booking data.
"""

from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    """
    Serializer for displaying bookings.
    Includes service name and user name for readability.
    """

    # These are "read-only" fields pulled from related models
    service_name = serializers.CharField(source='service.name', read_only=True)
    service_category = serializers.CharField(source='service.category', read_only=True)
    service_price = serializers.DecimalField(
        source='service.price', max_digits=8, decimal_places=2, read_only=True
    )
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'service', 'service_name', 'service_category',
            'service_price', 'user_name', 'booking_date', 'booking_time',
            'address', 'notes', 'status', 'created_at'
        ]


class CreateBookingSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a new booking.
    Only needs: user, service, booking_date, booking_time, address, notes
    """

    class Meta:
        model = Booking
        fields = ['user', 'service', 'booking_date', 'booking_time',
                  'address', 'notes']
