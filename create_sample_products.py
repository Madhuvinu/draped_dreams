#!/usr/bin/env python3
"""
Script to create sample products for testing the Draped Dreams application
"""

import frappe
import sys
import os

# Add the app directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'draped_dreams'))

def create_sample_products():
    """Create sample products for testing"""
    
    # Sample products data
    sample_products = [
        {
            "product_name": "Elegant Silk Banarasi Saree",
            "description": "Beautiful silk saree with intricate Banarasi work, perfect for weddings and special occasions",
            "category": "Silk",
            "price": 25000,
            "original_price": 30000,
            "stock_quantity": 8,
            "featured": True,
            "status": "Active"
        },
        {
            "product_name": "Comfortable Cotton Handloom Saree",
            "description": "Light and breathable cotton saree, ideal for daily wear and casual occasions",
            "category": "Cotton",
            "price": 3500,
            "stock_quantity": 25,
            "featured": False,
            "status": "Active"
        },
        {
            "product_name": "Modern Designer Party Saree",
            "description": "Contemporary designer saree with modern patterns, perfect for parties and events",
            "category": "Designer",
            "price": 18000,
            "original_price": 22000,
            "stock_quantity": 4,
            "featured": True,
            "status": "Active"
        },
        {
            "product_name": "Wedding Silk Saree",
            "description": "Heavy silk saree with gold work, perfect for weddings and grand celebrations",
            "category": "Wedding",
            "price": 45000,
            "stock_quantity": 0,
            "featured": True,
            "status": "Active"
        },
        {
            "product_name": "Casual Cotton Saree",
            "description": "Simple and elegant cotton saree for everyday wear",
            "category": "Cotton",
            "price": 2500,
            "stock_quantity": 15,
            "featured": False,
            "status": "Active"
        },
        {
            "product_name": "Traditional Silk Saree",
            "description": "Classic traditional silk saree with traditional motifs",
            "category": "Silk",
            "price": 12000,
            "stock_quantity": 12,
            "featured": False,
            "status": "Active"
        }
    ]
    
    print("Creating sample products...")
    
    for product_data in sample_products:
        try:
            # Check if product already exists
            if frappe.db.exists("Product", {"product_name": product_data["product_name"]}):
                print(f"Product '{product_data['product_name']}' already exists, skipping...")
                continue
            
            # Create product
            product = frappe.get_doc({
                "doctype": "Product",
                "product_name": product_data["product_name"],
                "description": product_data["description"],
                "category": product_data["category"],
                "price": product_data["price"],
                "original_price": product_data.get("original_price"),
                "stock_quantity": product_data["stock_quantity"],
                "featured": product_data["featured"],
                "status": product_data["status"],
                "rating": 0,
                "created_date": frappe.utils.today(),
            })
            
            product.insert()
            print(f"Created product: {product_data['product_name']}")
            
        except Exception as e:
            print(f"Error creating product '{product_data['product_name']}': {str(e)}")
    
    frappe.db.commit()
    print("Sample products created successfully!")

if __name__ == "__main__":
    # Initialize Frappe
    frappe.init(site='dress.localhost')
    frappe.connect()
    
    create_sample_products()
    
    frappe.destroy()
