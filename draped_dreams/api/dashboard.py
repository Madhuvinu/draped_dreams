import frappe
from frappe import _
from frappe.utils import flt, nowdate


@frappe.whitelist()
def get_dashboard_stats():
	"""Get dashboard statistics for the frontend"""
	try:
		# This is a mock implementation - replace with actual DocType queries
		stats = {
			"total_products": 156,
			"total_customers": 89,
			"total_orders": 234,
			"total_revenue": "2,45,000",
		}

		return {"status": "success", "data": stats}
	except Exception as e:
		frappe.log_error(f"Error getting dashboard stats: {e!s}")
		return {"status": "error", "message": "Failed to fetch dashboard statistics"}


@frappe.whitelist()
def get_products():
	"""Get list of products"""
	try:
		# Mock data - replace with actual DocType queries
		products = [
			{
				"id": 1,
				"name": "Silk Sari Collection",
				"description": "Premium silk sari with intricate designs",
				"price": "15,000",
				"stock": 25,
				"category": "Silk",
			},
			{
				"id": 2,
				"name": "Cotton Sari Set",
				"description": "Comfortable cotton sari for daily wear",
				"price": "3,500",
				"stock": 45,
				"category": "Cotton",
			},
			{
				"id": 3,
				"name": "Designer Sari",
				"description": "Exclusive designer sari collection",
				"price": "25,000",
				"stock": 8,
				"category": "Designer",
			},
		]

		return {"status": "success", "data": products}
	except Exception as e:
		frappe.log_error(f"Error getting products: {e!s}")
		return {"status": "error", "message": "Failed to fetch products"}


@frappe.whitelist()
def get_customers():
	"""Get list of customers"""
	try:
		# Mock data - replace with actual DocType queries
		customers = [
			{
				"id": 1,
				"name": "Priya Sharma",
				"email": "priya.sharma@email.com",
				"phone": "+91 98765 43210",
				"location": "Mumbai",
				"total_orders": 12,
				"status": "Active",
			},
			{
				"id": 2,
				"name": "Anita Patel",
				"email": "anita.patel@email.com",
				"phone": "+91 87654 32109",
				"location": "Delhi",
				"total_orders": 8,
				"status": "Active",
			},
		]

		return {"status": "success", "data": customers}
	except Exception as e:
		frappe.log_error(f"Error getting customers: {e!s}")
		return {"status": "error", "message": "Failed to fetch customers"}


@frappe.whitelist()
def get_orders():
	"""Get list of orders"""
	try:
		# Mock data - replace with actual DocType queries
		orders = [
			{
				"id": "1234",
				"customer": "Priya Sharma",
				"customer_email": "priya.sharma@email.com",
				"product_count": 2,
				"amount": "18,500",
				"status": "Completed",
				"date": "2024-01-15",
			},
			{
				"id": "1235",
				"customer": "Anita Patel",
				"customer_email": "anita.patel@email.com",
				"product_count": 1,
				"amount": "12,000",
				"status": "Processing",
				"date": "2024-01-16",
			},
		]

		return {"status": "success", "data": orders}
	except Exception as e:
		frappe.log_error(f"Error getting orders: {e!s}")
		return {"status": "error", "message": "Failed to fetch orders"}


@frappe.whitelist()
def get_inventory():
	"""Get inventory data"""
	try:
		# Mock data - replace with actual DocType queries
		inventory = [
			{
				"id": 1,
				"name": "Silk Sari Collection",
				"sku": "SS-001",
				"category": "Silk",
				"stock": 25,
				"unit_price": "15,000",
				"total_value": "3,75,000",
			},
			{
				"id": 2,
				"name": "Cotton Sari Set",
				"sku": "CS-002",
				"category": "Cotton",
				"stock": 45,
				"unit_price": "3,500",
				"total_value": "1,57,500",
			},
		]

		return {"status": "success", "data": inventory}
	except Exception as e:
		frappe.log_error(f"Error getting inventory: {e!s}")
		return {"status": "error", "message": "Failed to fetch inventory"}
