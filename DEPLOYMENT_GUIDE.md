# Deployment Guide: Git Push → Server Pull Workflow

## Overview
This guide ensures your Draped Dreams app works perfectly when you push to git and pull on the server.

## Pre-Deployment Checklist

### ✅ Files to Commit
```bash
# Add all new configuration files
git add config.ini
git add config_manager.py
git add setup.sh
git add setup_cors.sh
git add CORS_CONFIGURATION.md
git add ENVIRONMENT_CONFIGURATION.md
git add frontend/env.development.example
git add frontend/env.production.example

# Add modified files
git add draped_dreams/api/auth.py
git add draped_dreams/hooks.py
git add frontend/src/utils/api.js
git add setup.py

# Commit everything
git commit -m "Add environment-aware configuration and CORS fixes"
git push origin dev_branch
```

## Server-Side Setup

### 1. Pull Latest Code
```bash
# On your server
cd /path/to/your/frappe/bench/apps/draped_dreams
git pull origin dev_branch
```

### 2. Update Configuration for Production
```bash
# Edit config.ini with your actual production site name
nano config.ini

# Update the [production] section:
[production]
site_name = "your-actual-production-site.com"
api_base_url = "https://your-actual-production-site.com/api/method/draped_dreams.api.auth"
frontend_url = "https://65.1.189.119"
cors_origins = "https://65.1.189.119"
```

### 3. Run Production Setup
```bash
# Set environment variable
export DRAPED_DREAMS_SITE_NAME="your-actual-production-site.com"

# Run setup script
./setup.sh production
```

### 4. Build Frontend for Production
```bash
# Navigate to frontend
cd frontend

# Copy production environment file
cp env.production.example .env.production

# Edit .env.production with your actual URLs
nano .env.production

# Build for production
npm run build
```

### 5. Restart Services
```bash
# Go back to bench directory
cd /path/to/your/frappe/bench

# Build Frappe assets
bench build --app draped_dreams

# Restart Frappe
bench restart
```

## Environment-Specific Setup

### Development Server
```bash
# Use development configuration
./setup.sh development
```

### Production Server
```bash
# Use production configuration
export DRAPED_DREAMS_SITE_NAME="your-production-site.com"
./setup.sh production
```

### Staging Server
```bash
# Use staging configuration
./setup.sh staging
```

## Verification Steps

### 1. Check CORS Configuration
```bash
# Verify CORS is set correctly
bench --site your-site-name get-config cors_allow_origins
```

### 2. Test API Endpoints
```bash
# Test registration endpoint
curl -X POST https://your-site.com/api/method/draped_dreams.api.auth.register_user \
  -H "Content-Type: application/json" \
  -H "Origin: https://65.1.189.119" \
  -d '{"first_name":"Test","last_name":"User","email":"test@example.com","phone":"+919876543210","user_password":"testpass123","confirm_password":"testpass123"}'
```

### 3. Check Frontend Build
```bash
# Verify frontend files are built
ls -la draped_dreams/public/frontend/
```

## Troubleshooting

### CORS Still Not Working?
```bash
# Re-run CORS setup
./setup_cors.sh your-site-name

# Check site configuration
bench --site your-site-name get-config
```

### Frontend Not Loading?
```bash
# Rebuild frontend
cd frontend
npm run build

# Rebuild Frappe assets
bench build --app draped_dreams
bench restart
```

### API Errors?
```bash
# Check Frappe logs
bench --site your-site-name logs

# Verify doctypes are installed
bench --site your-site-name console
# In console: frappe.get_all("Register")
```

## Production Security Notes

### 1. Update CORS Origins
```bash
# Replace "*" with specific domains
bench --site your-site-name set-config cors_allow_origins "https://yourdomain.com,https://www.yourdomain.com"
```

### 2. Environment Variables
```bash
# Set production environment
export DRAPED_DREAMS_ENV=production
export DRAPED_DREAMS_SITE_NAME="your-production-site.com"
```

### 3. Frontend Environment
```bash
# Update .env.production
VITE_API_BASE_URL=https://your-production-site.com/api/method/draped_dreams.api.auth
VITE_FRONTEND_URL=https://your-frontend-domain.com
VITE_ENVIRONMENT=production
```

## Quick Deployment Commands

### Complete Server Setup (One Command)
```bash
# Pull, configure, and deploy
git pull origin dev_branch && \
export DRAPED_DREAMS_SITE_NAME="your-site-name" && \
./setup.sh production && \
cd frontend && npm run build && \
cd .. && bench build --app draped_dreams && \
bench restart
```

## Success Indicators

✅ **CORS Headers Present** - Check browser network tab  
✅ **API Responds** - Registration endpoint works  
✅ **Frontend Loads** - No console errors  
✅ **Environment Variables** - Correct URLs in network requests  

## Next Steps After Deployment

1. **Test Registration** - Try registering a new user
2. **Check Logs** - Monitor for any errors
3. **Update DNS** - Point your domain to the server
4. **SSL Certificate** - Ensure HTTPS is working
5. **Monitor Performance** - Check server resources

Your app should now work perfectly with the new environment-aware configuration! 🎉
