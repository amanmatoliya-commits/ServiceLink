from django.urls import path
from .views import ProfessionalListView

urlpatterns = [
    path("", ProfessionalListView.as_view(), name="professional-list"),
]