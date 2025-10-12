# Environment Configuration Guide

## Overview
Draped Dreams now supports multiple environments with configurable site names and URLs. No more hardcoded `dreams.localhost` everywhere!

## Configuration Files

### 1. `config.ini` - Main Configuration
Contains environment-specific settings:
- `site_name`: Frappe site name
- `api_base_url`: Backend API URL
- `frontend_url`: Frontend URL
- `cors_origins`: Allowed CORS origins

### 2. Frontend Environment Files
- `frontend/env.development.example` - Development settings
- `frontend/env.production.example` - Production settings

## Usage

### Development Environment
```bash
# Set environment variable
export DRAPED_DREAMS_SITE_NAME="your-dev-site.localhost"

# Run setup
./setup.sh development
```

### Production Environment
```bash
# Set environment variable
export DRAPED_DREAMS_SITE_NAME="your-production-site.com"

# Run setup
./setup.sh production
```

### Custom Environment
```bash
# Use any environment name
./setup.sh staging
```

## Environment Variables

### Backend (Python/Frappe)
- `DRAPED_DREAMS_SITE_NAME`: Site name for Frappe operations
- `DRAPED_DREAMS_ENV`: Environment name (development/production/staging)

### Frontend (Vite)
- `VITE_API_BASE_URL`: Backend API URL
- `VITE_FRONTEND_URL`: Frontend URL
- `VITE_ENVIRONMENT`: Environment name

## Quick Setup

### 1. Configure Your Environment
Edit `config.ini` and update the `[production]` section:
```ini
[production]
site_name = "your-production-site.com"
api_base_url = "https://your-production-site.com/api/method/draped_dreams.api.auth"
frontend_url = "https://your-frontend-domain.com"
cors_origins = "https://your-frontend-domain.com"
```

### 2. Run Setup
```bash
# For production
./setup.sh production

# For development
./setup.sh development
```

### 3. Frontend Environment
Copy the appropriate environment file:
```bash
# For development
cp frontend/env.development.example frontend/.env.development

# For production
cp frontend/env.production.example frontend/.env.production
```

## Benefits

✅ **No Hardcoded Values** - All URLs and site names are configurable  
✅ **Environment-Specific** - Different settings for dev/staging/production  
✅ **Easy Deployment** - Just change environment and run setup  
✅ **Frontend Flexibility** - Vite environment variables for different builds  
✅ **CORS Management** - Automatic CORS configuration per environment  

## Migration from Hardcoded Values

If you have existing deployments with hardcoded `dreams.localhost`:

1. **Update config.ini** with your actual site names
2. **Run setup script** with your environment
3. **Rebuild frontend** with new environment variables
4. **Test** all endpoints

## Troubleshooting

### Site Name Issues
```bash
# Check current site name
bench --site list

# Use specific site name
export DRAPED_DREAMS_SITE_NAME="your-actual-site-name"
./setup.sh production
```

### Frontend API Issues
```bash
# Check environment variables
echo $VITE_API_BASE_URL

# Rebuild with correct environment
npm run build --mode production
```

### CORS Issues
```bash
# Check CORS configuration
bench --site your-site-name get-config cors_allow_origins

# Reconfigure CORS
./setup.sh production
```
