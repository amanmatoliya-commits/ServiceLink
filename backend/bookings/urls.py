"""
bookings/urls.py
----------------
URL routes for booking API endpoints.

Full paths (with /api/bookings/ prefix):
  /api/bookings/create/           -> Create booking
  /api/bookings/my-bookings/      -> User's bookings
  /api/bookings/<id>/cancel/      -> Cancel booking
"""

from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_booking, name='create-booking'),
    path('my-bookings/', views.my_bookings, name='my-bookings'),
    path('<int:booking_id>/cancel/', views.cancel_booking, name='cancel-booking'),
]
