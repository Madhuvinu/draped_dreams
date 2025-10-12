# -*- coding: utf-8 -*-
# Copyright (c) 2024, Draped Dreams and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Product(Document):
	def validate(self):
		# Generate product code if not provided
		if not self.product_code:
			self.product_code = self.generate_product_code()

		# Validate stock levels
		if self.stock_quantity < 0:
			frappe.throw("Stock quantity cannot be negative")

		# Validate pricing
		if self.original_price and self.original_price <= self.price:
			frappe.throw("Original price should be greater than current price")

	def before_save(self):
		# Update modified date
		self.modified_date = frappe.utils.today()

	def generate_product_code(self):
		# Generate a unique product code
		category_prefix = self.category[:3].upper() if self.category else "PRD"
		import random
		import string

		# Generate random suffix
		suffix = "".join(random.choices(string.digits, k=4))
		product_code = f"{category_prefix}-{suffix}"

		# Ensure uniqueness
		while frappe.db.exists("Product", {"product_code": product_code}):
			suffix = "".join(random.choices(string.digits, k=4))
			product_code = f"{category_prefix}-{suffix}"

		return product_code
