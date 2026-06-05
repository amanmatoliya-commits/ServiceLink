"""
services/views.py
-----------------
API views for service operations.

VIEWS:
  - service_list: GET /api/services/ — List all active services
  - service_detail: GET /api/services/<id>/ — Get single service

These are simple "function-based views" (not class-based).
Easier to understand for beginners.
"""

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Service
from .serializers import ServiceSerializer


@api_view(['GET'])
def service_list(request):
    """
    List all active services.
    Optionally filter by category using ?category=Plumber

    Examples:
      GET /api/services/              -> All services
      GET /api/services/?category=Plumber  -> Only plumbing services
    """
    services = Service.objects.filter(is_active=True)

    # Optional category filter
    category = request.query_params.get('category')
    if category:
        services = services.filter(category=category)

    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def service_detail(request, service_id):
    """
    Get details of a single service by ID.

    Example: GET /api/services/1/
    """
    try:
        service = Service.objects.get(id=service_id, is_active=True)
        serializer = ServiceSerializer(service)
        return Response(serializer.data)
    except Service.DoesNotExist:
        return Response(
            {'message': 'Service not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
