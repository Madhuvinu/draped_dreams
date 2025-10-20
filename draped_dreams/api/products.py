# Copyright (c) 2024, Draped Dreams and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.utils import today, now


@frappe.whitelist(allow_guest=True)
def get_products():
	"""Get all products"""
	try:
		products = frappe.get_all(
			"Product",
			fields=["name", "product_name", "description", "category", "price", "product_image"],
			order_by="creation desc"
		)
		
		# Transform the data to match frontend expectations
		transformed_products = []
		for product in products:
			transformed_products.append({
				"id": product.name,  # Use name as id for frontend compatibility
				"product_id": product.name,  # Also include product_id for orders API
				"name": product.name,
				"product_name": product.product_name,
				"description": product.description or "",
				"category": product.category or "General",
				"price": product.price or 0,
				"original_price": None,
				"stock_quantity": 0,
				"featured": False,
				"image": product.product_image or ""
			})
		
		return {
			"success": True,
			"data": transformed_products
		}
	except Exception as e:
		frappe.log_error(f"Error getting products: {str(e)}")
		return {
			"success": False,
			"message": "Failed to fetch products"
		}

@frappe.whitelist(allow_guest=True)
def get_categories():
	"""Get all product categories"""
	try:
		categories = frappe.get_all(
			"Product",
			fields=["category"],
			distinct=True,
			order_by="category asc"
		)
		
		# Extract category names
		category_list = [item.category for item in categories if item.category]
		
		return {
			"success": True,
			"data": category_list
		}
	except Exception as e:
		frappe.log_error(f"Error getting categories: {str(e)}")
		return {
			"success": False,
			"message": "Failed to fetch categories"
		}

@frappe.whitelist(allow_guest=True)
def create_product(product_name, description, category, price, original_price=None, stock_quantity=0, featured=False):
	"""Create a new product"""
	try:
		# Validate input
		if not all([product_name, description, category, price]):
			return {"success": False, "message": "Product name, description, category, and price are required"}

		# Check if product already exists
		if frappe.db.exists("Product", {"product_name": product_name}):
			return {"success": False, "message": "Product with this name already exists"}

		# Create new product
		product = frappe.get_doc({
			"doctype": "Product",
			"product_name": product_name,
			"description": description,
			"category": category,
			"price": float(price),
			"original_price": float(original_price) if original_price else None,
			"stock_quantity": int(stock_quantity),
			"featured": bool(featured),
			"status": "Active",
			"rating": 0,
			"created_date": today(),
		})
		
		product.insert()
		frappe.db.commit()

		return {
			"success": True,
			"message": "Product created successfully",
			"data": {
				"name": product.name,
				"product_name": product.product_name,
				"category": product.category,
				"price": product.price,
			}
		}

	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Create Product Error")
		return {"success": False, "message": str(e)}


@frappe.whitelist(allow_guest=True)
def update_product(product_id, product_name=None, description=None, category=None, price=None, original_price=None, stock_quantity=None, featured=None):
	"""Update an existing product"""
	try:
		# Get the product
		product = frappe.get_doc("Product", product_id)
		
		# Update fields if provided
		if product_name is not None:
			product.product_name = product_name
		if description is not None:
			product.description = description
		if category is not None:
			product.category = category
		if price is not None:
			product.price = float(price)
		if original_price is not None:
			product.original_price = float(original_price) if original_price else None
		if stock_quantity is not None:
			product.stock_quantity = int(stock_quantity)
		if featured is not None:
			product.featured = bool(featured)
		
		product.save()
		frappe.db.commit()

		return {
			"success": True,
			"message": "Product updated successfully",
			"data": {
				"name": product.name,
				"product_name": product.product_name,
				"category": product.category,
				"price": product.price,
			}
		}

	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Update Product Error")
		return {"success": False, "message": str(e)}


@frappe.whitelist(allow_guest=True)
def create_sample_items():
	"""Create sample items for testing"""
	try:
		sample_items = [
			{
				"product_name": "Elegant Silk Saree",
				"description": "Beautiful traditional silk saree with intricate work",
				"category": "Silk",
				"price": 15000,
				"original_price": 18000,
				"stock_quantity": 10,
				"featured": True
			},
			{
				"product_name": "Cotton Designer Saree",
				"description": "Comfortable cotton saree perfect for daily wear",
				"category": "Cotton",
				"price": 2500,
				"original_price": 3000,
				"stock_quantity": 15,
				"featured": False
			},
			{
				"product_name": "Premium Designer Saree",
				"description": "Exclusive designer saree with modern patterns",
				"category": "Designer",
				"price": 25000,
				"original_price": 30000,
				"stock_quantity": 5,
				"featured": True
			}
		]
		
		created_items = []
		for item_data in sample_items:
			# Check if product already exists
			if not frappe.db.exists("Product", {"product_name": item_data["product_name"]}):
				product = frappe.get_doc({
					"doctype": "Product",
					**item_data
				})
				product.insert(ignore_permissions=True)
				created_items.append(product.product_name)
		
		return {
			"success": True,
			"message": f"Created {len(created_items)} sample items",
			"data": created_items
		}
	except Exception as e:
		frappe.log_error(f"Error creating sample items: {str(e)}")
		return {
			"success": False,
			"message": "Failed to create sample items"
		}


@frappe.whitelist(allow_guest=True)
def delete_product(product_id):
	"""Delete a product"""
	try:
		# Get the product
		product = frappe.get_doc("Product", product_id)
		
		# Delete the product
		product.delete()
		frappe.db.commit()

		return {
			"success": True,
			"message": "Product deleted successfully"
		}

	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Delete Product Error")
		return {"success": False, "message": str(e)}


@frappe.whitelist(allow_guest=True)
def get_product_details(product_id):
	"""Get detailed information about a product"""
	try:
		product = frappe.get_doc("Product", product_id)
		
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
				"description": product.description,
				"category": product.category,
				"price": product.price,
				"original_price": product.original_price,
				"stock_quantity": product.stock_quantity,
				"rating": product.rating,
				"featured": product.featured,
				"status": product.status,
				"product_image": product.product_image,
				"gallery_images": gallery_images,
				"created_date": product.created_date,
			}
		}

	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Get Product Details Error")
		return {"success": False, "message": str(e)}
