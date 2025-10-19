# Copyright (c) 2025, Draped Dreams and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Order(Document):
	def validate(self):
		# Set order date if not set
		if not self.order_date:
			self.order_date = frappe.utils.now()
		
		# Only validate if order_items exist
		if self.order_items:
			# Calculate total amount
			total = 0
			for item in self.order_items:
				if hasattr(item, 'quantity') and hasattr(item, 'price'):
					total += (item.quantity or 0) * (item.price or 0)
			self.total_amount = total
	
	def on_submit(self):
		# Update product stock quantities
		for item in self.order_items:
			product = frappe.get_doc("Product", item.product_id)
			if product.stock_quantity < item.quantity:
				frappe.throw(f"Insufficient stock for {item.product_name}. Available: {product.stock_quantity}, Required: {item.quantity}")
			
			# Reduce stock quantity
			product.stock_quantity -= item.quantity
			product.save()
	
	def on_cancel(self):
		# Restore product stock quantities
		for item in self.order_items:
			product = frappe.get_doc("Product", item.product_id)
			product.stock_quantity += item.quantity
			product.save()
