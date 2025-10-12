# Frappe Cloud Deployment Configuration

## Required Files for Frappe Cloud:

### 1. Create `requirements.txt` (if not exists)
```
frappe>=14.0.0
```

### 2. Create `pyproject.toml` (already exists ✅)

### 3. Create `hooks.py` (already exists ✅)

### 4. Create `install.py` (for app installation)
```python
# install.py
import frappe

def after_install():
    """Called after app installation"""
    # Install your custom doctypes
    frappe.db.commit()
```

### 5. Update `hooks.py` to include install.py
```python
# Add this to hooks.py
after_install = "draped_dreams.install.after_install"
```

## Deployment Steps:

1. **Push your code to GitHub** (already done ✅)
2. **Create site on Frappe Cloud**
3. **Connect your GitHub repository**
4. **Frappe Cloud will automatically:**
   - Clone your repository
   - Install dependencies
   - Run migrations
   - Deploy your app

## Important Notes:

- Your app must be in the `apps/` directory structure
- All doctypes must be properly defined
- API endpoints must be whitelisted
- Database migrations must be handled properly

## Custom Domain (Optional):
- You can add a custom domain in Frappe Cloud settings
- Example: `draped-dreams.yourdomain.com`
