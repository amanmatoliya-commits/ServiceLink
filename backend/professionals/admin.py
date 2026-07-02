from django.contrib import admin
from .models import Professional


@admin.register(Professional)
class ProfessionalAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "profession",
        "experience",
        "rating",
        "verified",
    )

    list_filter = (
        "verified",
        "profession",
    )

    search_fields = (
        "user__name",
        "user__email",
    )