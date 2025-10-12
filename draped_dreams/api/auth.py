# Copyright (c) 2024, Draped Dreams and contributors
# For license information, please see license.txt

import hashlib

import frappe
from frappe import _
from frappe.utils import cint, today


@frappe.whitelist(allow_guest=True)
def register_user(first_name, last_name, email, phone, password, confirm_password):
	"""Register a new user"""
	try:
		# Validate input
		if not all([first_name, last_name, email, phone, password, confirm_password]):
			return {"success": False, "message": "All fields are required"}

		# Input validation
		if len(first_name.strip()) < 2 or len(last_name.strip()) < 2:
			return {"success": False, "message": "Name must be at least 2 characters"}

		if not email or "@" not in email or "." not in email:
			return {"success": False, "message": "Invalid email format"}

		if len(phone.strip()) < 10:
			return {"success": False, "message": "Phone number must be at least 10 digits"}

		if len(password) < 8:
			return {"success": False, "message": "Password must be at least 8 characters"}

		if password != confirm_password:
			return {"success": False, "message": "Passwords do not match"}

		# Check if email already exists
		if frappe.db.exists("Register", {"email": email}):
			return {"success": False, "message": "Email already registered"}

		# Create new registration using direct database insert
		# Hash password manually to ensure consistency
		hashed_password = hashlib.sha256(password.encode()).hexdigest()
		
		# Insert directly into database to bypass any doctype hooks
		frappe.db.sql("""
			INSERT INTO `tabRegister` 
			(name, first_name, last_name, email, phone, password, confirm_password, status, registration_date, creation, modified, owner, modified_by)
			VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW(), 'Administrator', 'Administrator')
		""", (email, first_name, last_name, email, phone, hashed_password, hashed_password, "Active", today()))

		frappe.db.commit()

		return {
			"success": True,
			"message": "Registration successful! Please login.",
			"data": {"name": email, "email": email},
		}

	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Registration Error")
		return {"success": False, "message": str(e)}


@frappe.whitelist(allow_guest=True)
def login_user(email, password):
	"""Login user"""
	try:
		# Input validation
		if not email or not password:
			return {"success": False, "message": "Email and password are required"}

		if not email or "@" not in email or "." not in email:
			return {"success": False, "message": "Invalid email format"}

		if len(password) < 8:
			return {"success": False, "message": "Password must be at least 8 characters"}

		# Debug logging
		frappe.log_error(f"Login attempt for email: {email}", "Login Debug")

		# Find user by email
		user = frappe.db.get_value(
			"Register", {"email": email}, ["name", "password", "status"], as_dict=True
		)

		if not user:
			frappe.log_error(f"User not found for email: {email}", "Login Debug")
			return {"success": False, "message": "Invalid email or password"}

		if user.status != "Active":
			frappe.log_error(f"User {email} is not active, status: {user.status}", "Login Debug")
			return {"success": False, "message": "Account is not active"}

		# Verify password
		hashed_password = hashlib.sha256(password.encode()).hexdigest()
		frappe.log_error(f"Password hash comparison - Input: {hashed_password[:10]}..., Stored: {user.password[:10]}...", "Login Debug")
		
		if hashed_password != user.password:
			frappe.log_error(f"Password mismatch for user: {email}", "Login Debug")
			return {"success": False, "message": "Invalid email or password"}

		# Get user details
		user_details = frappe.db.get_value(
			"Register", {"email": email}, ["first_name", "last_name", "email", "phone"], as_dict=True
		)

		frappe.log_error(f"Login successful for user: {email}", "Login Debug")

		return {
			"success": True,
			"message": "Login successful",
			"data": {
				"user": email,
				"name": user.name,
				"first_name": user_details.first_name,
				"last_name": user_details.last_name,
				"email": user_details.email,
				"phone": user_details.phone,
			},
		}

	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Login Error")
		return {"success": False, "message": str(e)}


@frappe.whitelist(allow_guest=True)
def get_products(category=None, search=None, price_range=None, sort_by="featured", limit=20, offset=0):
	"""Get products with filters"""
	try:
		filters = {"status": "Active"}

		# Apply category filter
		if category and category != "All Categories":
			filters["category"] = category

		# Apply search filter
		if search:
			filters["product_name"] = ["like", f"%{search}%"]

		# Get products
		products = frappe.get_all(
			"Product",
			filters=filters,
			fields=[
				"name",
				"product_name",
				"product_code",
				"category",
				"description",
				"price",
				"original_price",
				"stock_quantity",
				"rating",
				"featured",
				"product_image",
				"created_date",
			],
			limit=limit,
			start=offset,
		)

		# Apply price range filter
		if price_range and price_range != "All Prices":
			filtered_products = []
			for product in products:
				price = product.price
				if price_range == "0-5000" and price < 5000:
					filtered_products.append(product)
				elif price_range == "5000-15000" and 5000 <= price <= 15000:
					filtered_products.append(product)
				elif price_range == "15000-30000" and 15000 <= price <= 30000:
					filtered_products.append(product)
				elif price_range == "30000+" and price > 30000:
					filtered_products.append(product)
			products = filtered_products

		# Apply sorting
		if sort_by == "price-low":
			products.sort(key=lambda x: x.price)
		elif sort_by == "price-high":
			products.sort(key=lambda x: x.price, reverse=True)
		elif sort_by == "newest":
			products.sort(key=lambda x: x.created_date, reverse=True)
		elif sort_by == "popular":
			products.sort(key=lambda x: x.rating or 0, reverse=True)
		elif sort_by == "featured":
			products.sort(key=lambda x: (x.featured, x.rating or 0), reverse=True)

		# Get gallery images for each product
		for product in products:
			try:
				gallery_images = frappe.get_all(
					"Product Image Gallery",
					filters={"parent": product.name},
					fields=["image_name", "image_file", "is_primary"],
				)
				product.gallery_images = gallery_images
			except Exception:
				product.gallery_images = []

		return {"success": True, "data": products, "total": len(products)}

	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Get Products Error")
		return {"success": False, "message": str(e)}


@frappe.whitelist(allow_guest=True)
def get_product_details(product_name):
	"""Get detailed product information"""
	try:
		product = frappe.get_doc("Product", product_name)

		# Get gallery images
		gallery_images = frappe.get_all(
			"Product Image Gallery",
			filters={"parent": product.name},
			fields=["image_name", "image_file", "is_primary"],
		)

		return {
			"success": True,
			"data": {
				"name": product.name,
				"product_name": product.product_name,
				"product_code": product.product_code,
				"category": product.category,
				"description": product.description,
				"price": product.price,
				"original_price": product.original_price,
				"stock_quantity": product.stock_quantity,
				"rating": product.rating,
				"featured": product.featured,
				"product_image": product.product_image,
				"gallery_images": gallery_images,
				"created_date": product.created_date,
			},
		}

	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Get Product Details Error")
		return {"success": False, "message": str(e)}


@frappe.whitelist(allow_guest=True)
def get_categories():
	"""Get all product categories"""
	try:
		categories = frappe.get_all(
			"Product", filters={"status": "Active"}, fields=["category"], distinct=True
		)

		category_list = [cat.category for cat in categories if cat.category]

		return {"success": True, "data": category_list}

	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Get Categories Error")
		return {"success": False, "message": str(e)}


@frappe.whitelist(allow_guest=True)
def update_register_doctype():
	"""Update Register doctype to use correct field names"""
	try:
		# Get the Register doctype
		register_doctype = frappe.get_doc("DocType", "Register")
		
		# Check if user_password field exists and rename it to password
		user_password_field = None
		for field in register_doctype.fields:
			if field.fieldname == "user_password":
				user_password_field = field
				break
		
		if user_password_field:
			# Rename the field
			user_password_field.fieldname = "password"
			user_password_field.label = "Password"
			register_doctype.save()
			frappe.db.commit()
			
			return {"success": True, "message": "Register doctype updated successfully"}
		else:
			return {"success": True, "message": "Register doctype already has correct field names"}
			
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Update Register Doctype Error")
		return {"success": False, "message": str(e)}


@frappe.whitelist(allow_guest=True)
def debug_user(email):
	"""Debug function to check user data"""
	try:
		# Get user data
		user = frappe.db.get_value(
			"Register", {"email": email}, ["name", "user_password", "status", "first_name", "last_name"], as_dict=True
		)
		
		if user:
			return {
				"success": True,
				"data": {
					"name": user.name,
					"email": email,
					"status": user.status,
					"first_name": user.first_name,
					"last_name": user.last_name,
					"password_length": len(user.user_password) if user.user_password else 0,
					"password_preview": user.user_password[:10] + "..." if user.user_password else None,
					"password_hash": user.user_password,  # Show the actual hash for debugging
					"password_start": user.user_password[:20] if user.user_password else None
				}
			}
		else:
			return {"success": False, "message": "User not found"}
			
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Debug User Error")
		return {"success": False, "message": str(e)}
