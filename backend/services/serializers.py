"""
services/serializers.py
-----------------------
Converts Service model instances to/from JSON.
"""

from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    """
    Serializer for the Service model.
    Converts Service objects to JSON for the API.
    """

    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'category',
                  'image', 'rating', 'is_active', 'created_at']
