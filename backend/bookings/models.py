"""
bookings/models.py
------------------
Booking model — connects Users with Services.

DATABASE TABLE: bookings_booking
RELATIONSHIPS:
  - user: ForeignKey -> User (one user can have many bookings)
  - service: ForeignKey -> Service (one service can be booked many times)

STATUS FLOW:
  Pending -> Confirmed -> Completed
                      \-> Cancelled
"""

from django.db import models
from django.conf import settings


class Booking(models.Model):
    """
    Represents a service booking made by a user.
    """

    # Status choices for the booking
    STATUS_CHOICES = [
        ('Pending', 'Pending'),       # Just created
        ('Confirmed', 'Confirmed'),   # Worker assigned
        ('Completed', 'Completed'),   # Service done
        ('Cancelled', 'Cancelled'),   # User cancelled
    ]

    # ForeignKey creates a relationship between tables
    # on_delete=CASCADE means: if user is deleted, delete their bookings too
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='bookings'  # Access user's bookings: user.bookings.all()
    )

    service = models.ForeignKey(
        'services.Service',
        on_delete=models.CASCADE,
        related_name='bookings'
    )

    booking_date = models.DateField()
    booking_time = models.TimeField(default='10:00')
    address = models.TextField()
    notes = models.TextField(blank=True, default='')
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.service.name} ({self.status})"

    class Meta:
        ordering = ['-created_at']  # Newest bookings first
