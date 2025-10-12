# -*- coding: utf-8 -*-
# Copyright (c) 2024, Draped Dreams and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Register(Document):
	def validate(self):
		# Check if email already exists
		if frappe.db.exists("Register", {"email": self.email, "name": ["!=", self.name]}):
			frappe.throw("Email already registered")
	
	def before_save(self):
		# Hash password before saving
		if self.user_password and not self.user_password.startswith('$'):
			import hashlib
			self.user_password = hashlib.sha256(self.user_password.encode()).hexdigest()
			self.confirm_password = self.user_password
