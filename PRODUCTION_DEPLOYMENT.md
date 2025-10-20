# 🚀 Deployment Guide - Development & Production

## Environment-Specific Asset Loading

The system now automatically detects the environment and loads the correct assets:

### **Development (localhost):**
- **URL**: `http://dreams.localhost:8000/draped_dreams`
- **Assets**: `index-440ba6ab.js` (development build)
- **Command**: `yarn build:dev`

### **Production (65.1.189.119):**
- **URL**: `https://65.1.189.119/draped_dreams`
- **Assets**: `index-ac6ebee6.js` (production build)
- **Command**: `yarn build:production`

## Quick Deployment Commands

### **For Development:**
```bash
cd frontend
yarn build:dev
```

### **For Production:**
```bash
cd frontend
yarn build:production
```

## Manual Asset Management

### **Development Assets:**
```bash
# Build and copy to local site
yarn build:dev
# Assets go to: ../../sites/dreams.localhost/public/files/assets/
```

### **Production Assets:**
```bash
# Build and deploy to production
yarn build:production
# Assets go to: /home/harsha/frappe-bench/frappe-bench/sites/dreams.localhost/public/files/assets/
```

## Troubleshooting

### **500 Errors:**
- **Development**: Run `yarn build:dev`
- **Production**: Run `yarn build:production`

### **Wrong Assets Loading:**
- Check if you're on the correct environment
- Rebuild with the correct command
- Clear browser cache

### **Permission Issues:**
```bash
# Development
chmod 644 ../../sites/dreams.localhost/public/files/assets/*

# Production
chmod 644 /path/to/sites/dreams.localhost/public/files/assets/*
chown harsha:harsha /path/to/sites/dreams.localhost/public/files/assets/*
```

## ✅ **This works for both environments automatically!**
