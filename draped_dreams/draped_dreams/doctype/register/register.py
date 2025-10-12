import hashlib

import frappe
from frappe import _
from frappe.model.document import Document


class Register(Document):
	def validate(self):
		# Check if email already exists
		if frappe.db.exists("Register", {"email": self.email, "name": ["!=", self.name]}):
			frappe.throw(_("Email already registered"))

	def before_save(self):
		# Hash password before saving
		if self.user_password and not self.user_password.startswith("$"):
			self.user_password = hashlib.sha256(self.user_password.encode()).hexdigest()
			self.confirm_password = self.user_password
