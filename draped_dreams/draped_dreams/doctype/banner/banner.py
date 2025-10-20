# Copyright (c) 2024, Draped Dreams and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Banner(Document):
	def validate(self):
		"""Validate banner data"""
		if not self.title:
			frappe.throw("Title is required")
		
		if not self.image:
			frappe.throw("Banner image is required")
		
		# Validate link format if provided
		if self.link and not self.link.startswith(('http://', 'https://', '/')):
			frappe.throw("Link must start with http://, https://, or /")
	
	def before_save(self):
		"""Set default values before saving"""
		if not self.sort_order:
			self.sort_order = 0
		
		if self.is_active is None:
			self.is_active = 1
