#!/usr/bin/env python3
"""
Setup script for Draped Dreams Frappe app
This script will install the doctypes and set up the database
"""

import os
import sys

import frappe


def install_doctypes():
	"""Install all doctypes"""
	print("Installing Draped Dreams doctypes...")

	# Install Register doctype
	try:
		frappe.get_doc(
			{
				"doctype": "DocType",
				"name": "Register",
				"module": "Draped Dreams",
				"custom": 1,
				"fields": [
					{"fieldname": "first_name", "fieldtype": "Data", "label": "First Name", "reqd": 1},
					{"fieldname": "last_name", "fieldtype": "Data", "label": "Last Name", "reqd": 1},
					{
						"fieldname": "email",
						"fieldtype": "Data",
						"label": "Email",
						"options": "Email",
						"reqd": 1,
						"unique": 1,
					},
					{
						"fieldname": "phone",
						"fieldtype": "Data",
						"label": "Phone",
						"options": "Phone",
						"reqd": 1,
					},
					{"fieldname": "password", "fieldtype": "Password", "label": "Password", "reqd": 1},
					{
						"fieldname": "confirm_password",
						"fieldtype": "Password",
						"label": "Confirm Password",
						"reqd": 1,
					},
					{
						"fieldname": "status",
						"fieldtype": "Select",
						"label": "Status",
						"options": "Active\nInactive\nPending",
						"default": "Active",
						"reqd": 1,
					},
					{
						"fieldname": "registration_date",
						"fieldtype": "Date",
						"label": "Registration Date",
						"default": "Today",
						"read_only": 1,
					},
				],
				"permissions": [
					{
						"role": "System Manager",
						"create": 1,
						"delete": 1,
						"email": 1,
						"export": 1,
						"print": 1,
						"read": 1,
						"report": 1,
						"share": 1,
						"write": 1,
					},
					{
						"role": "Guest",
						"create": 1,
						"email": 1,
						"export": 1,
						"print": 1,
						"read": 1,
						"report": 1,
						"share": 1,
					},
				],
			}
		).insert(ignore_permissions=True)
		print("✓ Register doctype installed")
	except Exception as e:
		print(f"✗ Error installing Register doctype: {e}")

	# Install Product doctype
	try:
		frappe.get_doc(
			{
				"doctype": "DocType",
				"name": "Product",
				"module": "Draped Dreams",
				"custom": 1,
				"fields": [
					{"fieldname": "product_name", "fieldtype": "Data", "label": "Product Name", "reqd": 1},
					{
						"fieldname": "product_code",
						"fieldtype": "Data",
						"label": "Product Code",
						"read_only": 1,
						"unique": 1,
					},
					{
						"fieldname": "category",
						"fieldtype": "Select",
						"label": "Category",
						"options": "Silk\nCotton\nDesigner\nWedding\nCasual\nParty",
						"reqd": 1,
					},
					{"fieldname": "description", "fieldtype": "Text", "label": "Description", "reqd": 1},
					{"fieldname": "price", "fieldtype": "Currency", "label": "Price", "reqd": 1},
					{"fieldname": "original_price", "fieldtype": "Currency", "label": "Original Price"},
					{
						"fieldname": "stock_quantity",
						"fieldtype": "Int",
						"label": "Stock Quantity",
						"default": 0,
						"reqd": 1,
					},
					{
						"fieldname": "min_stock_level",
						"fieldtype": "Int",
						"label": "Minimum Stock Level",
						"default": 5,
						"reqd": 1,
					},
					{"fieldname": "product_image", "fieldtype": "Attach Image", "label": "Product Image"},
					{
						"fieldname": "status",
						"fieldtype": "Select",
						"label": "Status",
						"options": "Active\nInactive\nDiscontinued",
						"default": "Active",
						"reqd": 1,
					},
					{
						"fieldname": "featured",
						"fieldtype": "Check",
						"label": "Featured Product",
						"default": 0,
					},
					{
						"fieldname": "rating",
						"fieldtype": "Float",
						"label": "Rating",
						"precision": "1",
						"default": 0,
					},
					{
						"fieldname": "created_date",
						"fieldtype": "Date",
						"label": "Created Date",
						"default": "Today",
						"read_only": 1,
					},
					{
						"fieldname": "modified_date",
						"fieldtype": "Date",
						"label": "Modified Date",
						"default": "Today",
						"read_only": 1,
					},
				],
				"permissions": [
					{
						"role": "System Manager",
						"create": 1,
						"delete": 1,
						"email": 1,
						"export": 1,
						"print": 1,
						"read": 1,
						"report": 1,
						"share": 1,
						"write": 1,
					},
					{
						"role": "Guest",
						"create": 1,
						"email": 1,
						"export": 1,
						"print": 1,
						"read": 1,
						"report": 1,
						"share": 1,
					},
				],
			}
		).insert(ignore_permissions=True)
		print("✓ Product doctype installed")
	except Exception as e:
		print(f"✗ Error installing Product doctype: {e}")

	# Install Product Image Gallery doctype
	try:
		frappe.get_doc(
			{
				"doctype": "DocType",
				"name": "Product Image Gallery",
				"module": "Draped Dreams",
				"custom": 1,
				"istable": 1,
				"fields": [
					{"fieldname": "image_name", "fieldtype": "Data", "label": "Image Name", "reqd": 1},
					{
						"fieldname": "image_file",
						"fieldtype": "Attach Image",
						"label": "Image File",
						"reqd": 1,
					},
					{"fieldname": "is_primary", "fieldtype": "Check", "label": "Is Primary", "default": 0},
				],
			}
		).insert(ignore_permissions=True)
		print("✓ Product Image Gallery doctype installed")
	except Exception as e:
		print(f"✗ Error installing Product Image Gallery doctype: {e}")


def create_sample_data():
	"""Create sample products"""
	print("Creating sample products...")

	sample_products = [
		{
			"product_name": "Elegant Silk Banarasi Saree",
			"description": "Beautiful silk saree with intricate Banarasi work and golden zari borders",
			"category": "Silk",
			"price": 25000,
			"original_price": 30000,
			"stock_quantity": 8,
			"rating": 4.8,
			"featured": 1,
		},
		{
			"product_name": "Comfortable Cotton Handloom Saree",
			"description": "Light and breathable cotton saree perfect for daily wear",
			"category": "Cotton",
			"price": 3500,
			"stock_quantity": 25,
			"rating": 4.5,
		},
		{
			"product_name": "Modern Designer Party Saree",
			"description": "Contemporary designer saree with unique patterns",
			"category": "Designer",
			"price": 18000,
			"original_price": 22000,
			"stock_quantity": 4,
			"rating": 4.9,
			"featured": 1,
		},
		{
			"product_name": "Wedding Silk Saree",
			"description": "Heavy silk saree with extensive embroidery perfect for weddings",
			"category": "Wedding",
			"price": 45000,
			"stock_quantity": 3,
			"rating": 4.7,
		},
		{
			"product_name": "Casual Cotton Saree",
			"description": "Light and comfortable cotton saree for casual occasions",
			"category": "Casual",
			"price": 2500,
			"stock_quantity": 60,
			"rating": 4.3,
		},
		{
			"product_name": "Printed Silk Saree",
			"description": "Beautiful printed silk saree with floral patterns",
			"category": "Silk",
			"price": 12000,
			"stock_quantity": 0,
			"rating": 4.6,
		},
	]

	for product_data in sample_products:
		try:
			frappe.get_doc({"doctype": "Product", **product_data}).insert(ignore_permissions=True)
			print(f"✓ Created product: {product_data['product_name']}")
		except Exception as e:
			print(f"✗ Error creating product {product_data['product_name']}: {e}")


if __name__ == "__main__":
	# Get site name from environment variable or use default
	site_name = os.getenv('DRAPED_DREAMS_SITE_NAME', 'dreams.localhost')
	
	# Initialize Frappe
	frappe.init(site=site_name)
	frappe.connect()

	try:
		install_doctypes()
		create_sample_data()
		print("\n🎉 Setup completed successfully!")
		print("You can now:")
		print("1. Start your Frappe server: bench start")
		print(f"2. Access your frontend at: http://{site_name}:8002/draped_dreams")
		print(f"3. Access Frappe desk at: http://{site_name}:8002")
	except Exception as e:
		print(f"\n❌ Setup failed: {e}")
		sys.exit(1)
	finally:
		frappe.destroy()
