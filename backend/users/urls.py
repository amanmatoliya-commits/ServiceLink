"""
users/urls.py
-------------
URL routes for user-related API endpoints.

These URLs are included in core/urls.py under /api/users/ prefix.
So the full paths become:
  /api/users/register/
  /api/users/login/
  /api/users/profile/
"""

from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('profile/', views.profile_view, name='profile'),
]
