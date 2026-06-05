#!/usr/bin/env python
"""
manage.py
---------
Django's command-line utility.

Common commands:
  python manage.py runserver        # Start development server
  python manage.py makemigrations   # Create database migration files
  python manage.py migrate          # Apply migrations to database
  python manage.py createsuperuser  # Create admin user
  python manage.py shell            # Open Python shell with Django
"""

import os
import sys


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
