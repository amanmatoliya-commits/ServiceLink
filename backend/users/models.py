"""
users/models.py
---------------
Custom User model for Urban Home Services.

WHY CUSTOM USER MODEL?
Django comes with a built-in User model, but we want extra fields
like phone and address. It's best practice to create a custom User
model at the start of a project.

DATABASE TABLE: users_user
FIELDS:
  - email (unique, used as username)
  - name
  - phone
  - address
  - is_active, is_staff (Django defaults)
"""

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    """Custom manager for creating users."""

    def create_user(self, email, name, password=None, **extra_fields):
        """Create and return a regular user."""
        if not email:
            raise ValueError('Email is required')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)  # Hashes the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        """Create and return an admin/superuser."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, name, password, **extra_fields)


class User(AbstractBaseUser):
    """
    Custom User model.

    Uses email as the login field instead of username.
    """

    email = models.EmailField(unique=True, max_length=255)
    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20, blank=True, default='')
    address = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # Tell Django to use email for login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    def __str__(self):
        return f"{self.name} ({self.email})"

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
