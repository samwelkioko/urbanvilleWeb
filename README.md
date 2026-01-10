# Urbanville Designs

## Project Overview
Urbanville Designs is a comprehensive interior design service provider. This application manages their portfolio, services, and client interactions.

## Tech Stack
### Frontend
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript

### Backend
- **Framework**: Django + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Permissions**: RBAC (Admin/Editor/Viewer)

## Getting Started

### Prerequisites
- Node.js
- Python 3.10+
- PostgreSQL

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework psycopg2-binary djangorestframework-simplejwt django-cors-headers
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Run the server:
   ```bash
   python manage.py runserver
   ```
