# 🚀 Production Deployment Guide

## Quick Fix for Asset Loading Issues

### **Problem:**
Every time you deploy, frontend assets (CSS/JS) return 500 errors because they're not copied to the production server.

### **Solution:**

#### **Method 1: Automated Script (Recommended)**
```bash
# On your production server, run:
cd /path/to/your/app
./deploy_assets.sh
```

#### **Method 2: Manual Copy**
```bash
# Build frontend
cd frontend
yarn build

# Copy assets to Frappe sites
cp -r dist/assets/* /path/to/frappe/sites/your-site/public/files/assets/

# Set permissions
chmod 644 /path/to/frappe/sites/your-site/public/files/assets/*
chown frappe:frappe /path/to/frappe/sites/your-site/public/files/assets/*
```

#### **Method 3: Using Package Script**
```bash
# Build and deploy in one command
cd frontend
yarn build:production
```

### **Prevention:**

#### **Add to your deployment workflow:**
1. **Build frontend**: `yarn build`
2. **Deploy assets**: `./deploy_assets.sh`
3. **Restart Frappe**: `bench restart`

#### **For CI/CD pipelines:**
```yaml
# Add this step to your deployment pipeline
- name: Deploy Frontend Assets
  run: |
    cd frontend
    yarn build
    ./deploy_assets.sh
    bench restart
```

### **Common Frappe Sites Paths:**
- `/home/frappe/frappe-bench/sites/`
- `/opt/frappe/sites/`
- `/var/www/frappe/sites/`

### **Troubleshooting:**
- **500 errors**: Assets not copied or wrong permissions
- **404 errors**: Wrong path or missing files
- **Permission denied**: Run with correct user (frappe or www-data)

## ✅ **This will fix the issue permanently!**
