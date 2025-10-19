# Copyright (c) 2025, Draped Dreams and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class OrderItem(Document):
	def validate(self):
		# Calculate total price
		self.total_price = self.quantity * self.price
