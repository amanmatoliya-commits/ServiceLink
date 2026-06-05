"""
bookings/views.py
-----------------
API views for booking operations.

VIEWS:
  - create_booking: POST /api/bookings/create/
  - my_bookings: GET /api/bookings/my-bookings/?user_id=1
  - cancel_booking: PATCH /api/bookings/<id>/cancel/
"""

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Booking
from .serializers import BookingSerializer, CreateBookingSerializer


@api_view(['POST'])
def create_booking(request):
    """
    Create a new booking.

    Expected JSON body:
    {
        "user": 1,
        "service": 3,
        "booking_date": "2025-02-15",
        "booking_time": "10:00",
        "address": "123 Main St",
        "notes": "Please bring tools"
    }
    """
    serializer = CreateBookingSerializer(data=request.data)

    if serializer.is_valid():
        booking = serializer.save()

        # Return the full booking data (with service name, etc.)
        return Response(
            {
                'message': 'Booking created successfully!',
                'booking': BookingSerializer(booking).data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        {'errors': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
def my_bookings(request):
    """
    Get all bookings for a specific user.

    Usage: GET /api/bookings/my-bookings/?user_id=1
    """
    user_id = request.query_params.get('user_id')

    if not user_id:
        return Response(
            {'message': 'user_id parameter is required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    bookings = Booking.objects.filter(user_id=user_id)
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)


@api_view(['PATCH'])
def cancel_booking(request, booking_id):
    """
    Cancel a booking by changing its status to 'Cancelled'.

    Usage: PATCH /api/bookings/5/cancel/
    """
    try:
        booking = Booking.objects.get(id=booking_id)

        # Only pending bookings can be cancelled
        if booking.status != 'Pending':
            return Response(
                {'message': f'Cannot cancel a booking with status "{booking.status}".'},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.status = 'Cancelled'
        booking.save()

        return Response(
            {
                'message': 'Booking cancelled successfully.',
                'booking': BookingSerializer(booking).data
            }
        )

    except Booking.DoesNotExist:
        return Response(
            {'message': 'Booking not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
