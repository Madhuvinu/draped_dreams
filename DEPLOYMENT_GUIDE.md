# 🚀 Draped Dreams - Production Deployment Guide

## Problem
Your production server at `https://65.1.189.119` is missing the built frontend assets, causing 500 errors when trying to load the application.

## Solution
You need to copy the built assets from your local machine to the production server.

## 📦 Assets to Deploy
You have **22 asset files** that need to be copied to production:

### Main Files (Critical):
- `index-c7d485ac.js` - Main JavaScript bundle
- `index-e36060c2.css` - Main CSS bundle

### Chunk Files (Required for dynamic imports):
- `Products-3f585344.js` - Products page
- `FeatherIcon-82e60495.js` - Icons component
- `base-c576634b.js` - Base utilities
- `TextInput-0a4cbe4e.js` - Text input component
- `Badge-87d29bac.js` - Badge component
- `Cart-ff73a54c.js` - Cart page
- `Checkout-8b9e0580.js` - Checkout page
- `Customers-e93ee9e9.js` - Customers page
- `Dashboard-162fb3e5.js` - Dashboard page
- `Home-1dfd3e91.js` - Home page
- `Inventory-c728b434.js` - Inventory page
- `Login-d4aa28dd.js` - Login page
- `Orders-6736d545.js` - Orders page
- `Products-1687e242.js` - Products component
- `products-2e5e880d.js` - Products utilities
- `Register-1ba13b64.js` - Register page
- `Reports-19444a01.js` - Reports page
- `AdminProducts-b13bfa38.js` - Admin products
- `auth-3c962066.js` - Authentication
- `base-16152d6a.js` - Base utilities
- `Cart-24155a26.js` - Cart utilities
- `Checkout-5b292af0.js` - Checkout utilities

## 🚀 Deployment Methods

### Method 1: SCP (Recommended)
Copy all assets at once:
```bash
scp frontend/dist/assets/* root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/
```

### Method 2: Rsync (Most Efficient)
```bash
rsync -avz --progress frontend/dist/assets/ root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/
```

### Method 3: Individual Files
If you prefer to copy files individually:
```bash
scp frontend/dist/assets/index-c7d485ac.js root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/
scp frontend/dist/assets/index-e36060c2.css root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/
scp frontend/dist/assets/Products-3f585344.js root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/
# ... continue for all 22 files
```

## 🔧 Post-Deployment Steps

1. **Set Permissions** (on production server):
   ```bash
   chmod 644 /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/*
   ```

2. **Restart Frappe Server** (on production server):
   ```bash
   bench restart
   ```

3. **Test the Application**:
   - Visit: `https://65.1.189.119/draped_dreams`
   - Check browser console for any remaining errors
   - Verify all pages load correctly

## 🎯 Expected Result

After deployment, your application should:
- ✅ Load without 500 errors
- ✅ Display all pages correctly
- ✅ Work with dynamic imports
- ✅ Be accessible from any domain/port

## 🆘 Troubleshooting

If you still get 500 errors:
1. Check if files were copied correctly: `ls -la /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/`
2. Verify permissions: `ls -la /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/`
3. Check Frappe logs: `bench --site 65.1.189.119 logs`
4. Restart the server: `bench restart`

## 📝 Quick Commands

```bash
# From your local machine, run:
cd /Users/harshakm/erp_project/apps/draped_dreams

# Copy all assets to production
scp frontend/dist/assets/* root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/

# Then on production server:
chmod 644 /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/*
bench restart
```

That's it! Your application should now work perfectly on production! 🎉
