"""
users/serializers.py
--------------------
Serializers convert Python objects to JSON and vice versa.

WHAT IS A SERIALIZER?
Think of it as a translator:
  - When RECEIVING data: JSON -> Python (validation + creation)
  - When SENDING data: Python -> JSON (formatting)

We have two serializers:
  1. RegisterSerializer - for creating new users
  2. UserSerializer - for displaying user data
"""

from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    """
    Handles user registration.
    Accepts: name, email, password, phone, address
    """

    # Password should be write-only (never returned in responses)
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'phone', 'address']

    def create(self, validated_data):
        """Create a new user with hashed password."""
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            phone=validated_data.get('phone', ''),
            address=validated_data.get('address', ''),
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    """
    Displays user profile data.
    Used when returning user info in API responses.
    """

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone', 'address', 'created_at']
