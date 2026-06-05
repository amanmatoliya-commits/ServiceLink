# 🏠 Urban Home Services

## Complete Tech Stack & Progress Report

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Features](#-features)
5. [Data Flow](#-data-flow)
6. [API Endpoints](#-api-endpoints)
7. [Setup Instructions](#-setup-instructions)
8. [Progress Report](#-progress-report)

---

## 🎯 Project Overview

**Urban Home Services** is a full-stack web application that connects homeowners with professional service providers. Users can browse services, book appointments, and manage their bookings through a user-friendly dashboard.

### Key Capabilities:
- 🔍 Browse home services (Electrician, Plumber, Carpenter, etc.)
- 📅 Book appointments with date/time selection
- 👤 User registration and authentication
- 📊 Personal dashboard with booking history
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **React** | 19.x | UI library for building interactive components |
| **Vite** | 7.x | Fast build tool and development server |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **React Router DOM** | 6.x | Client-side routing |

### Backend Technologies

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **Django** | 4.2+ | Python web framework for REST API |
| **Django REST Framework** | 3.14+ | API toolkit for Django |
| **SQLite** | Built-in | Lightweight database |
| **django-cors-headers** | 4.0+ | Cross-origin resource sharing |

### How They Connect

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Pages   │  │Components│  │  Router  │  │ Context  │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                         │                                       │
│                    Tailwind CSS (Styling)                       │
└─────────────────────────────────────────────────────────────────┘
                               │
                          HTTP/JSON
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DJANGO BACKEND                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │  Users   │  │ Services │  │ Bookings │   (Django Apps)      │
│  └──────────┘  └──────────┘  └──────────┘                      │
│                         │                                       │
│                   Django REST Framework                         │
└─────────────────────────────────────────────────────────────────┘
                               │
                            SQL ORM
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SQLite DATABASE                             │
│              (db.sqlite3 - Single File)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
PBL 4th SEM/
│
├── 📂 src/                          # React Frontend Source
│   │
│   ├── 📂 components/               # Reusable UI Components
│   │   ├── Navbar.jsx               # Navigation bar
│   │   ├── Footer.jsx               # Page footer
│   │   ├── ServiceCard.jsx          # Service display card
│   │   └── LoadingSpinner.jsx       # Loading indicator
│   │
│   ├── 📂 pages/                    # Page Components
│   │   ├── HomePage.jsx             # Landing page with hero
│   │   ├── LoginPage.jsx            # User login form
│   │   ├── RegisterPage.jsx         # User registration form
│   │   ├── ServicesPage.jsx         # All services grid
│   │   ├── BookingPage.jsx          # Service booking form
│   │   ├── DashboardPage.jsx        # User dashboard
│   │   └── ContactPage.jsx          # Contact form
│   │
│   ├── 📂 context/                  # React Context (State)
│   │   └── AuthContext.jsx          # Authentication state
│   │
│   ├── 📂 data/                     # Mock Data (Simulates Backend)
│   │   ├── services.js              # Service listings
│   │   └── bookings.js              # Booking operations
│   │
│   ├── App.tsx                      # Main app with routes
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
│
├── 📂 backend/                      # Django Backend
│   │
│   ├── 📂 core/                     # Project Configuration
│   │   ├── __init__.py
│   │   ├── settings.py              # Django settings
│   │   ├── urls.py                  # Root URL routing
│   │   └── wsgi.py                  # WSGI entry point
│   │
│   ├── 📂 users/                    # User Management App
│   │   ├── models.py                # User model
│   │   ├── views.py                 # Register, Login, Profile
│   │   ├── serializers.py           # JSON serialization
│   │   ├── urls.py                  # User routes
│   │   └── admin.py                 # Admin registration
│   │
│   ├── 📂 services/                 # Services App
│   │   ├── models.py                # Service model
│   │   ├── views.py                 # List, Detail views
│   │   ├── serializers.py           # JSON serialization
│   │   ├── urls.py                  # Service routes
│   │   └── admin.py                 # Admin registration
│   │
│   ├── 📂 bookings/                 # Bookings App
│   │   ├── models.py                # Booking model
│   │   ├── views.py                 # Create, List, Cancel
│   │   ├── serializers.py           # JSON serialization
│   │   ├── urls.py                  # Booking routes
│   │   └── admin.py                 # Admin registration
│   │
│   ├── manage.py                    # Django CLI
│   ├── requirements.txt             # Python dependencies
│   └── README.md                    # Backend documentation
│
├── 📂 public/                       # Static assets
├── 📂 node_modules/                 # NPM packages (auto-generated)
│
├── index.html                       # HTML entry point
├── package.json                     # NPM configuration
├── vite.config.ts                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
└── DOCUMENTATION.md                 # This file!
```

---

## ✨ Features

### User Features

| Feature | Description | Status |
|:--------|:------------|:------:|
| **Home Page** | Hero section, featured services, how it works | ✅ |
| **Services Browse** | Grid view with search and category filter | ✅ |
| **User Registration** | Form with validation (name, email, password) | ✅ |
| **User Login** | Email/password authentication | ✅ |
| **Service Booking** | Date/time picker, address, notes | ✅ |
| **User Dashboard** | View bookings, stats, profile management | ✅ |
| **Booking Cancellation** | Cancel pending bookings | ✅ |
| **Contact Form** | Send messages to support | ✅ |
| **Responsive Design** | Works on mobile, tablet, desktop | ✅ |

### Admin Features (Django)

| Feature | Description | Status |
|:--------|:------------|:------:|
| **Admin Panel** | Full CRUD for all models | ✅ |
| **User Management** | View/edit all users | ✅ |
| **Service Management** | Add/edit/delete services | ✅ |
| **Booking Management** | View/update booking status | ✅ |

---

## 🔄 Data Flow

### Request Flow: Booking a Service

```
1. User clicks "Book Now" on a service
                │
                ▼
2. React Router navigates to /book/:serviceId
                │
                ▼
3. BookingPage.jsx loads service data
                │
                ▼
4. User fills form (date, time, address)
                │
                ▼
5. Form submits → createBooking() function
                │
                ▼
6. Data saved to localStorage (demo mode)
   OR
   POST request to Django API (full-stack mode)
                │
                ▼
7. Success message → Redirect to Dashboard
                │
                ▼
8. Dashboard shows new booking in list
```

### Authentication Flow

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Login     │         │ AuthContext │         │ localStorage│
│   Page      │ ──────▶ │  login()    │ ──────▶ │   session   │
└─────────────┘         └─────────────┘         └─────────────┘
                               │
                               ▼
                        ┌─────────────┐
                        │  user state │
                        │  updated    │
                        └─────────────┘
                               │
                               ▼
                        ┌─────────────┐
                        │  Navbar     │
                        │  updates    │
                        └─────────────┘
```

---

## 🌐 API Endpoints

### Users API

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `POST` | `/api/users/register/` | Create new user account |
| `POST` | `/api/users/login/` | Authenticate user |
| `GET` | `/api/users/profile/?user_id=1` | Get user profile |

### Services API

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/services/` | List all services |
| `GET` | `/api/services/?category=Plumber` | Filter by category |
| `GET` | `/api/services/:id/` | Get single service |

### Bookings API

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `POST` | `/api/bookings/create/` | Create new booking |
| `GET` | `/api/bookings/my-bookings/?user_id=1` | Get user's bookings |
| `PATCH` | `/api/bookings/:id/cancel/` | Cancel a booking |

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** v18+ (for frontend)
- **Python** v3.10+ (for backend)
- **VS Code** or any code editor

### Frontend Setup

```bash
# 1. Navigate to project folder
cd "PBL 4th SEM"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:5173
```

### Backend Setup

```bash
# 1. Navigate to backend folder
cd backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create database tables
python manage.py makemigrations users services bookings
python manage.py migrate

# 6. Create admin user
python manage.py createsuperuser

# 7. Start server
python manage.py runserver

# 8. Open admin panel
# http://localhost:8000/admin
```

---

## 📊 Progress Report

### Development Status: **100% Complete** ✅

| Phase | Tasks | Status |
|:------|:------|:------:|
| **Setup** | Project structure, dependencies | ✅ Done |
| **Frontend Core** | React, Vite, Tailwind config | ✅ Done |
| **Components** | Navbar, Footer, Cards, Spinner | ✅ Done |
| **Pages** | All 7 pages implemented | ✅ Done |
| **Authentication** | Login, Register, Context | ✅ Done |
| **Booking System** | Form, validation, storage | ✅ Done |
| **Dashboard** | Stats, bookings list, profile | ✅ Done |
| **Backend** | Django project, 3 apps | ✅ Done |
| **Database Models** | User, Service, Booking | ✅ Done |
| **REST API** | All endpoints | ✅ Done |
| **Documentation** | README, comments | ✅ Done |

### Code Statistics

| Metric | Count |
|:-------|------:|
| React Components | 11 |
| Pages | 7 |
| Django Apps | 3 |
| Database Models | 3 |
| API Endpoints | 8 |
| Total Files | 40+ |

---

## 🎓 Learning Outcomes

After studying this project, you will understand:

1. **React Fundamentals**
   - Component-based architecture
   - Props and state management
   - React hooks (useState, useEffect, useContext)
   - React Router for navigation

2. **Tailwind CSS**
   - Utility-first styling approach
   - Responsive design classes
   - Component styling patterns

3. **Django Backend**
   - Project vs App structure
   - Models and ORM
   - Views and URL routing
   - REST API development
   - Admin panel customization

4. **Full-Stack Concepts**
   - Frontend-backend communication
   - JSON data format
   - CORS (Cross-Origin Resource Sharing)
   - Authentication flow

---

## 👨‍💻 Author

**Project:** Urban Home Services  
**Course:** PBL 4th Semester  
**Type:** Full-Stack Web Application

---

## 📄 License

This project is for educational purposes.

---

*Last Updated: 2025*
