# Use a full Python image to avoid missing build dependencies
FROM python:3.10

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 8000

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements from the root or backend folder
COPY backend/requirements.txt /app/

# Upgrade pip and install dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
# This copies everything inside backend/ to /app/
COPY backend/ /app/

# Ensure media and static directories exist
RUN mkdir -p /app/staticfiles /app/media

# The application runs on port 8000 by default
EXPOSE 8000

# Run gunicorn through the shell to ensure $PORT expansion
CMD gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
