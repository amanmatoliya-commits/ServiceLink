"""
services/urls.py
----------------
URL routes for service API endpoints.

Full paths (with /api/services/ prefix from core/urls.py):
  /api/services/        -> List all services
  /api/services/<id>/   -> Single service detail
"""

from django.urls import path
from . import views

urlpatterns = [
    path('', views.service_list, name='service-list'),
    path('<int:service_id>/', views.service_detail, name='service-detail'),
]
