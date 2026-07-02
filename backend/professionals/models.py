from django.db import models
from users.models import User


class Professional(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="professional_profile"
    )

    profession = models.CharField(max_length=100)

    experience = models.PositiveIntegerField(
        help_text="Experience in years"
    )

    rating = models.FloatField(default=0)

    verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.name} - {self.profession}"