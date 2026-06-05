"""
users/views.py
--------------
API views for user operations.

VIEWS HANDLE:
  - RegisterView: POST /api/users/register/
  - LoginView: POST /api/users/login/
  - ProfileView: GET /api/users/profile/

REQUEST FLOW:
  1. User fills form on React frontend
  2. Frontend sends POST request to Django
  3. Django validates data using serializer
  4. Django saves to SQLite database
  5. Django returns JSON response
  6. Frontend displays success/error message
"""

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import User
from .serializers import RegisterSerializer, UserSerializer


@api_view(['POST'])
def register_view(request):
    """
    Register a new user.

    Expected JSON body:
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "secret123",
        "phone": "+1234567890",   (optional)
        "address": "123 Main St"  (optional)
    }
    """
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {
                'message': 'Registration successful!',
                'user': UserSerializer(user).data
            },
            status=status.HTTP_201_CREATED
        )

    # Return validation errors
    return Response(
        {'errors': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
def login_view(request):
    """
    Login an existing user.

    Expected JSON body:
    {
        "email": "john@example.com",
        "password": "secret123"
    }
    """
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {'message': 'Email and password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Django's authenticate function checks email + password
    user = authenticate(request, email=email, password=password)

    if user is not None:
        return Response(
            {
                'message': 'Login successful!',
                'user': UserSerializer(user).data
            },
            status=status.HTTP_200_OK
        )

    return Response(
        {'message': 'Invalid email or password.'},
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['GET'])
def profile_view(request):
    """
    Get the current user's profile.

    NOTE: In a real app, you would use authentication tokens
    to identify the user. For simplicity, we accept user_id
    as a query parameter.

    Usage: GET /api/users/profile/?user_id=1
    """
    user_id = request.query_params.get('user_id')

    if not user_id:
        return Response(
            {'message': 'user_id parameter is required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(id=user_id)
        return Response(UserSerializer(user).data)
    except User.DoesNotExist:
        return Response(
            {'message': 'User not found.'},
            status=status.HTTP_404_NOT_FOUND
        )
