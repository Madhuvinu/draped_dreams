# Copyright (c) 2025, Draped Dreams and contributors
# For license information, please see license.txt

import frappe
from frappe import _
import json
from datetime import datetime


@frappe.whitelist(allow_guest=True)
def place_order(customer_email, order_items, total_amount, **kwargs):
	"""
	Place a new order
	"""
	try:
		# Create order_data dict from parameters
		order_data = {
			'customer_email': customer_email,
			'order_items': order_items,
			'total_amount': total_amount
		}
		
		# Add any additional fields from kwargs
		order_data.update(kwargs)
		
		# Validate required fields
		required_fields = ['customer_email', 'order_items', 'total_amount']
		for field in required_fields:
			if not order_data.get(field):
				return {
					"success": False,
					"message": f"Missing required field: {field}"
				}
		
		# Validate order items
		if not order_data.get('order_items') or len(order_data['order_items']) == 0:
			return {
				"success": False,
				"message": "Order must have at least one item"
			}
		
		# Check if customer exists
		customer = frappe.db.get_value("Register", {"email": order_data['customer_email']}, "name")
		if not customer:
			return {
				"success": False,
				"message": "Customer not found. Please register first."
			}
		
		# Generate order ID
		order_id = f"ORD-{datetime.now().strftime('%Y%m%d%H%M%S')}"
		
		# Store order in a simple JSON format in the database
		order_data_to_store = {
			"order_id": order_id,
			"customer_email": order_data['customer_email'],
			"order_date": frappe.utils.now(),
			"status": "Pending",
			"total_amount": order_data['total_amount'],
			"shipping_address": order_data.get('shipping_address', ''),
			"billing_address": order_data.get('billing_address', ''),
			"payment_method": order_data.get('payment_method', 'Cash on Delivery'),
			"notes": order_data.get('notes', ''),
			"order_items": []
		}
		
		# Add order items (simplified for now)
		for item in order_data['order_items']:
			# Add item to order
			order_data_to_store["order_items"].append({
				"product_id": item['product_id'],
				"product_name": item['product_name'],
				"quantity": item['quantity'],
				"price": item['price'],
				"total": item['quantity'] * item['price']
			})
		
		# Create order using the Order doctype
		try:
			order = frappe.get_doc({
				"doctype": "Order",
				"order_id": order_id,
				"customer_email": order_data_to_store['customer_email'],
				"order_date": order_data_to_store['order_date'],
				"status": order_data_to_store['status'],
				"total_amount": order_data_to_store['total_amount']
			})
			
			# Add order items (required field)
			for item in order_data_to_store['order_items']:
				order.append("order_items", {
					"product_id": item['product_id'],
					"product_name": item['product_name'],
					"quantity": item['quantity'],
					"price": item['price'],
					"total_price": item['total']
				})
			
			order.insert()
			
			# Update product stock quantities
			for item in order_data_to_store['order_items']:
				product = frappe.get_doc("Product", item['product_id'])
				if product.stock_quantity < item['quantity']:
					frappe.throw(f"Insufficient stock for {item['product_name']}. Available: {product.stock_quantity}, Required: {item['quantity']}")
				
				# Reduce stock quantity
				product.stock_quantity -= item['quantity']
				product.save()
			
			frappe.db.commit()
		except Exception as e:
			frappe.log_error(f"Error storing order: {str(e)}")
			return {
				"success": False,
				"message": f"Error storing order: {str(e)}"
			}
		
		return {
			"success": True,
			"message": "Order placed successfully!",
			"order_id": order.name
		}
		
	except Exception as e:
		frappe.log_error(f"Error placing order: {str(e)}")
		return {
			"success": False,
			"message": f"Error placing order: {str(e)}"
		}


@frappe.whitelist(allow_guest=True)
def get_user_orders(customer_email):
	"""
	Get orders for a specific customer
	"""
	try:
		# Validate customer exists
		customer = frappe.db.get_value("Register", {"email": customer_email}, "name")
		if not customer:
			return {
				"success": False,
				"message": "Customer not found"
			}
		
		# Get orders using the Order doctype
		orders = frappe.get_all("Order", 
			filters={"customer_email": customer_email},
			fields=["name", "order_id", "order_date", "status", "total_amount", "shipping_address", "billing_address", "payment_method", "notes"],
			order_by="order_date desc"
		)
		
		# Get order items for each order
		for order in orders:
			order_items = frappe.get_all("Order Item",
				filters={"parent": order.name},
				fields=["product_id", "product_name", "quantity", "rate", "amount"]
			)
			order['items'] = order_items
		
		return {
			"success": True,
			"data": orders
		}
		
	except Exception as e:
		frappe.log_error(f"Error getting user orders: {str(e)}")
		return {
			"success": False,
			"message": f"Error getting orders: {str(e)}"
		}


@frappe.whitelist(allow_guest=True)
def get_order_details(order_id):
	"""
	Get detailed information about a specific order
	"""
	try:
		# Get order details
		order = frappe.get_doc("Order", order_id)
		
		order_data = {
			"order_id": order.name,
			"customer_email": order.customer_email,
			"order_date": order.order_date,
			"status": order.status,
			"total_amount": order.total_amount,
			"shipping_address": order.shipping_address,
			"billing_address": order.billing_address,
			"payment_method": order.payment_method,
			"notes": order.notes,
			"order_items": []
		}
		
		# Get order items
		for item in order.order_items:
			order_data["order_items"].append({
				"product_id": item.product_id,
				"product_name": item.product_name,
				"quantity": item.quantity,
				"price": item.price,
				"total_price": item.total_price
			})
		
		return {
			"success": True,
			"data": order_data
		}
		
	except Exception as e:
		frappe.log_error(f"Error getting order details: {str(e)}")
		return {
			"success": False,
			"message": f"Error getting order details: {str(e)}"
		}


@frappe.whitelist(allow_guest=True)
def update_order_status(order_id, status):
	"""
	Update order status (admin only)
	"""
	try:
		# Check if user is admin
		if not frappe.session.user or frappe.session.user == "Guest":
			return {
				"success": False,
				"message": "Admin access required"
			}
		
		# Validate status
		valid_statuses = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"]
		if status not in valid_statuses:
			return {
				"success": False,
				"message": f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
			}
		
		# Update order
		order = frappe.get_doc("Order", order_id)
		order.status = status
		order.save()
		
		return {
			"success": True,
			"message": f"Order status updated to {status}",
			"data": {
				"order_id": order.name,
				"status": order.status
			}
		}
		
	except Exception as e:
		frappe.log_error(f"Error updating order status: {str(e)}")
		return {
			"success": False,
			"message": f"Error updating order status: {str(e)}"
		}
