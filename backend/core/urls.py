"""
core/urls.py
------------
Root URL configuration for Urban Home Services.

This is where all URL patterns start.
Each app has its own urls.py, and we include them here.

URL STRUCTURE:
  /admin/               -> Django admin panel
  /api/users/           -> User registration, login, profile
  /api/services/        -> Service listings
  /api/bookings/        -> Booking management
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Django admin panel — access at http://localhost:8000/admin/
    path('admin/', admin.site.urls),

    # API routes — each app handles its own URLs
    path('api/users/', include('users.urls')),
    path('api/services/', include('services.urls')),
    path('api/bookings/', include('bookings.urls')),
    path("api/professionals/", include("professionals.urls")),
]
