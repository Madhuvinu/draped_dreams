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
		# Password hashing is handled in the auth API
		# Do not hash here to avoid double hashing
		pass
