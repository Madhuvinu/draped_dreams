# Copyright (c) 2024, Draped Dreams and contributors
# For license information, please see license.txt

import frappe


def after_install():
	"""Called after app installation"""
	try:
		# Import and run doctype installation
		from draped_dreams.install_doctypes import install_all_doctypes

		print("Installing custom doctypes...")
		install_all_doctypes()

		# Commit changes
		frappe.db.commit()
		print("App installation completed successfully!")

	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "App Installation Error")
		print(f"Error during installation: {e}")
