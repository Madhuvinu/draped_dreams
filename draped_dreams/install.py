import frappe


def after_install():
	"""Called after app installation from hooks.py -> draped_dreams.install.after_install
	This forwards to the package-local install_doctypes implementation.
	"""
	try:
		# use a package-local module
		from .install_doctypes import install_all_doctypes

		print("Installing custom doctypes...")
		install_all_doctypes()

		# Commit changes
		frappe.db.commit()
		print("App installation completed successfully!")

	except Exception:
		# log the traceback in Frappe and re-raise so installer fails fast
		frappe.log_error(frappe.get_traceback(), "App Installation Error")
		raise
