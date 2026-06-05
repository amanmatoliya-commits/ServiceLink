# Urban Home Services — Django Backend

This directory contains the **complete Django backend** reference code.
When you set up the backend locally, it will serve as the API for the React frontend.

## Quick Setup

```bash
# 1. Navigate to backend folder
cd backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 4. Install dependencies
pip install django djangorestframework django-cors-headers

# 5. Run migrations (creates SQLite database)
python manage.py makemigrations
python manage.py migrate

# 6. Create admin user
python manage.py createsuperuser

# 7. Load sample data (optional)
python manage.py loaddata services_data.json

# 8. Start server
python manage.py runserver
```

## API Endpoints

| Method | Endpoint                  | Description           |
| ------ | ------------------------- | --------------------- |
| POST   | /api/users/register/      | Register new user     |
| POST   | /api/users/login/         | Login user            |
| GET    | /api/users/profile/       | Get user profile      |
| GET    | /api/services/            | List all services     |
| GET    | /api/services/:id/        | Get single service    |
| POST   | /api/bookings/create/     | Create a booking      |
| GET    | /api/bookings/my-bookings/| Get user's bookings   |
| PATCH  | /api/bookings/:id/cancel/ | Cancel a booking      |

## Folder Structure

```
backend/
├── core/              # Django project settings
│   ├── settings.py    # Main configuration
│   ├── urls.py        # Root URL routing
│   └── wsgi.py        # WSGI entry point
│
├── users/             # User management app
│   ├── models.py      # Custom User model
│   ├── serializers.py # User data serialization
│   ├── views.py       # Register, Login, Profile views
│   └── urls.py        # User URL routes
│
├── services/          # Service listing app
│   ├── models.py      # Service model
│   ├── serializers.py # Service data serialization
│   ├── views.py       # List, Detail views
│   └── urls.py        # Service URL routes
│
├── bookings/          # Booking management app
│   ├── models.py      # Booking model
│   ├── serializers.py # Booking data serialization
│   ├── views.py       # Create, List, Cancel views
│   └── urls.py        # Booking URL routes
│
├── manage.py          # Django CLI
└── db.sqlite3         # SQLite database (auto-created)
```

## How Frontend Connects to Backend

In the React frontend, you would replace the localStorage calls with
API calls to these endpoints. For example:

```javascript
// Instead of: const services = localData;
// we would use:
const response = await fetch('http://localhost:8000/api/services/');
const services = await response.json();
```
