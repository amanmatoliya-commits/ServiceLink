"""
services/models.py
------------------
Service model representing home services offered.

DATABASE TABLE: services_service
FIELDS:
  - name: Service name (e.g., "Electrical Repair")
  - description: What the service includes
  - price: Cost per visit
  - category: Type of service (e.g., Electrician, Plumber)
  - image: URL to service image
  - rating: Average customer rating (1-5)
  - is_active: Whether service is currently offered
"""

from django.db import models


class Service(models.Model):
    """
    Represents a home service that users can book.

    CATEGORY_CHOICES defines the types of services available.
    This ensures data consistency in the database.
    """

    # Predefined categories
    CATEGORY_CHOICES = [
        ('Electrician', 'Electrician'),
        ('Plumber', 'Plumber'),
        ('Carpenter', 'Carpenter'),
        ('Cleaner', 'Cleaner'),
        ('AC Repair', 'AC Repair'),
        ('Painter', 'Painter'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.URLField(blank=True, default='')
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=4.5)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.category}) - ${self.price}"

    class Meta:
        ordering = ['category', 'name']  # Default ordering
