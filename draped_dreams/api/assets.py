import frappe
import os
from frappe import _

@frappe.whitelist(allow_guest=True)
def serve_asset(filename):
    """Serve static assets for the frontend application"""
    
    # Get the app directory
    app_dir = frappe.get_app_path("draped_dreams")
    
    # Possible asset locations
    asset_locations = [
        os.path.join(app_dir, "www", "assets", filename),
        os.path.join(app_dir, "public", "frontend", "assets", filename),
        os.path.join(app_dir, "frontend", "dist", "assets", filename)
    ]
    
    # Find the file
    file_path = None
    for location in asset_locations:
        if os.path.exists(location):
            file_path = location
            break
    
    if not file_path:
        frappe.throw(_("Asset not found: {0}").format(filename), frappe.NotFound)
    
    # Determine content type
    if filename.endswith('.js'):
        content_type = 'application/javascript'
    elif filename.endswith('.css'):
        content_type = 'text/css'
    else:
        content_type = 'application/octet-stream'
    
    # Read and return the file
    try:
        with open(file_path, 'rb') as f:
            content = f.read()
        
        # Set response headers
        frappe.local.response.headers["Content-Type"] = content_type
        frappe.local.response.headers["Cache-Control"] = "public, max-age=31536000"
        frappe.local.response.headers["ETag"] = f'"{hash(content)}"'
        frappe.local.response.headers["Access-Control-Allow-Origin"] = "*"
        frappe.local.response.headers["Access-Control-Allow-Methods"] = "GET"
        
        # Return the file content
        frappe.local.response.filecontent = content
        frappe.local.response.type = "download"
        frappe.local.response.filename = filename
        
    except Exception as e:
        frappe.throw(_("Error reading asset: {0}").format(str(e)), frappe.ServerError)
