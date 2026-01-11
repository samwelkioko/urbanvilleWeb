# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 8000

# Set work directory
WORKDIR /app

# Install dependencies
# We copy only the requirements first to leverage Docker cache
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY backend/ /app/

# The application runs on port 8000 by default
EXPOSE 8000

# Run gunicorn
CMD gunicorn config.wsgi --bind 0.0.0.0:$PORT
