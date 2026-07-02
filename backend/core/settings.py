"""
Django settings for Urban Home Services.

IMPORTANT NOTES FOR BEGINNERS:
- This file controls how Django behaves.
- SECRET_KEY should be kept private in production.
- DEBUG should be False in production.
- INSTALLED_APPS lists all active Django apps.
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-change-this-in-production-xyz123'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# ============================================
# INSTALLED APPS
# ============================================
# These are the "modules" Django loads.
# We add our custom apps (users, services, bookings)
# plus third-party packages (rest_framework, corsheaders).

INSTALLED_APPS = [
    # Django built-in apps
    'django.contrib.admin',          # Admin panel
    'django.contrib.auth',           # Authentication
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',                # Django REST Framework for API
    'corsheaders',                   # Allow frontend to call backend

    # Our custom apps
    'users',                         # User registration, login, profiles
    'services',                      # Service listings
    'bookings',                      # Booking management
    'professionals',                 # Professional profiles
]

# ============================================
# MIDDLEWARE
# ============================================
# Middleware processes every request/response.
# CorsMiddleware MUST be near the top.

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # <-- Must be high in the list
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# ============================================
# DATABASE
# ============================================
# Using SQLite — simplest database, perfect for learning.
# The database file (db.sqlite3) is auto-created in the project root.

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ============================================
# PASSWORD VALIDATION
# ============================================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ============================================
# INTERNATIONALIZATION
# ============================================

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ============================================
# STATIC FILES
# ============================================

STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'static']

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ============================================
# CORS SETTINGS
# ============================================
# Allow the React frontend (running on port 5173) to call our API.

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # Vite dev server
    'http://localhost:3000',  # Alternative port
]

# CORS_ALLOW_ALL_ORIGINS = True

# ============================================
# REST FRAMEWORK SETTINGS
# ============================================

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Keep it simple for learning
    ],
}

# ============================================
# CUSTOM USER MODEL
# ============================================
# We use our own User model instead of Django's default.

AUTH_USER_MODEL = 'users.User'
