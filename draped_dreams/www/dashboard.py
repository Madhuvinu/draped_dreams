# Copyright (c) 2024, Draped Dreams and contributors
# For license information, please see license.txt

import frappe
from frappe import _

def get_context(context):
    """Get context for dashboard page"""
    context.title = "Draped Dreams Dashboard"
    context.no_cache = 1
    
    # Get some basic stats for the dashboard
    try:
        # Get product count
        product_count = frappe.db.count("Product", {"status": "Active"})
        context.product_count = product_count
        
        # Get recent products
        recent_products = frappe.get_all(
            "Product",
            filters={"status": "Active"},
            fields=["name", "product_name", "category", "price", "stock_quantity"],
            order_by="creation desc",
            limit=5
        )
        context.recent_products = recent_products
        
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Dashboard Context Error")
        context.product_count = 0
        context.recent_products = []
