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
		if self.password and not self.password.startswith("$"):
			self.password = hashlib.sha256(self.password.encode()).hexdigest()
			self.confirm_password = self.password
