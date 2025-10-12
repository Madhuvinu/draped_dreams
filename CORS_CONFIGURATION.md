# Site-level CORS Configuration for Draped Dreams
# This file contains the CORS configuration that should be applied at the site level

# Method 1: Using bench commands (Recommended)
# Run these commands in your Frappe bench directory:

# bench --site dreams.localhost set-config cors_allow_origins "*"
# bench --site dreams.localhost set-config cors_allow_methods "GET,POST,PUT,DELETE,OPTIONS"
# bench --site dreams.localhost set-config cors_allow_headers "Content-Type,Authorization,X-Requested-With,Accept,Origin"
# bench --site dreams.localhost set-config cors_allow_credentials true
# bench --site dreams.localhost set-config cors_max_age 86400

# Method 2: Direct site_config.json configuration
# Add this to your site's site_config.json file:

{
    "cors_allow_origins": "*",
    "cors_allow_methods": "GET,POST,PUT,DELETE,OPTIONS",
    "cors_allow_headers": "Content-Type,Authorization,X-Requested-With,Accept,Origin",
    "cors_allow_credentials": true,
    "cors_max_age": 86400
}

# Method 3: Using Frappe hooks (Alternative approach)
# Add this to your hooks.py:

def add_cors_headers():
    """Add CORS headers to all responses"""
    import frappe
    
    if hasattr(frappe.local, 'response'):
        frappe.local.response.headers["Access-Control-Allow-Origin"] = "*"
        frappe.local.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        frappe.local.response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With, Accept, Origin"
        frappe.local.response.headers["Access-Control-Allow-Credentials"] = "true"
        frappe.local.response.headers["Access-Control-Max-Age"] = "86400"

def handle_cors_preflight():
    """Handle CORS preflight OPTIONS requests"""
    import frappe
    
    if frappe.request.method == "OPTIONS":
        add_cors_headers()
        frappe.local.response = frappe.response
        frappe.local.response.status_code = 200
        return True
    return False

# Then add these hooks:
# before_request = "draped_dreams.hooks.add_cors_headers"
# handle_options = "draped_dreams.hooks.handle_cors_preflight"

# Production Security Note:
# For production, replace "*" with specific domains:
# "cors_allow_origins": "https://yourdomain.com,https://www.yourdomain.com"
