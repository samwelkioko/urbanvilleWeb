---
description: Deploy Urbanville Designs to a VPS alongside another app
---

# VPS Deployment Workflow (IP: 89.147.110.51)

This workflow guides you through deploying Urbanville to your VPS using subdomains.

## 1. Prerequisites on VPS
Ensure these are installed:
```bash
sudo apt update
sudo apt install -y nodejs npm python3 python3-venv nginx certbot python3-certbot-nginx
sudo npm install -g pm2
```

## 2. Prepare Environment Files
Create these on the VPS inside `/var/www/urbanville`.

**Backend (`backend/.env`):**
```env
DEBUG=False
SECRET_KEY=your-secure-secret-key-here
ALLOWED_HOSTS=api.sargasso-reclamation.com,89.147.110.51
CORS_ALLOWED_ORIGINS=https://urbanville.sargasso-reclamation.com,http://urbanville.sargasso-reclamation.com
# Using inbuilt SQLite as requested
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=https://api.sargasso-reclamation.com
```

## 3. Initial Setup & Build
Run these commands on the VPS:

```bash
cd /var/www/urbanville

# Backend Setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
pm2 start "gunicorn --workers 3 --bind 127.0.0.1:8001 config.wsgi:application" --name "urbanville-backend"

# Frontend Setup
cd ../frontend
npm install
npm run build
pm2 start npm --name "urbanville-frontend" -- start -- -p 3001
```
*Note: We use ports 8001 and 3001 to avoid conflicts with your existing Django app or default ports.*

## 4. Nginx Configuration
Create `/etc/nginx/sites-available/urbanville`:

```nginx
# Frontend: urbanville.sargasso-reclamation.com
server {
    listen 80;
    server_name urbanville.sargasso-reclamation.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend: api.sargasso-reclamation.com
server {
    listen 80;
    server_name api.sargasso-reclamation.com;

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /var/www/urbanville/backend/staticfiles/;
    }

    location /media/ {
        alias /var/www/urbanville/backend/media/;
    }
}
```

## 5. Activation & SSL
```bash
# Enable config
sudo ln -s /etc/nginx/sites-available/urbanville /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL
sudo certbot --nginx -d urbanville.sargasso-reclamation.com -d api.sargasso-reclamation.com
```

## 6. Maintenance (Deployment Script)
Create `deploy.sh` in the root folder:
```bash
#!/bin/bash
git pull origin main
cd backend && source venv/bin/activate && pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput && pm2 restart urbanville-backend
cd ../frontend && npm install && npm run build && pm2 restart urbanville-frontend
```


