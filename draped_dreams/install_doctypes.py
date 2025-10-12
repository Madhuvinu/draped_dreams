import frappe


def install_register_doctype():
	"""Install Register doctype"""
	try:
		register_doc = frappe.get_doc(
			{
				"doctype": "DocType",
				"name": "Register",
				"module": "Draped Dreams",
				"custom": 1,
				"fields": [
					{"fieldname": "first_name", "fieldtype": "Data", "label": "First Name", "reqd": 1},
					{"fieldname": "last_name", "fieldtype": "Data", "label": "Last Name", "reqd": 1},
					{
						"fieldname": "email",
						"fieldtype": "Data",
						"label": "Email",
						"options": "Email",
						"reqd": 1,
						"unique": 1,
					},
				],
			}
		)
		register_doc.insert(ignore_permissions=True)
		print("Register doctype installed successfully")
	except Exception as e:
		print(f"Error installing Register doctype: {e}")


def install_product_doctype():
	"""Install Product doctype"""
	try:
		product_doc = frappe.get_doc(
			{
				"doctype": "DocType",
				"name": "Product",
				"module": "Draped Dreams",
				"custom": 1,
				"fields": [
					{"fieldname": "product_name", "fieldtype": "Data", "label": "Product Name", "reqd": 1},
					{
						"fieldname": "product_code",
						"fieldtype": "Data",
						"label": "Product Code",
						"unique": 1,
						"reqd": 1,
					},
				],
			}
		)
		product_doc.insert(ignore_permissions=True)
		print("Product doctype installed successfully")
	except Exception as e:
		print(f"Error installing Product doctype: {e}")


def install_gallery_doctype():
	"""Install Product Image Gallery doctype"""
	try:
		gallery_doc = frappe.get_doc(
			{
				"doctype": "DocType",
				"name": "Product Image Gallery",
				"module": "Draped Dreams",
				"custom": 1,
				"istable": 1,
				"fields": [
					{"fieldname": "image_name", "fieldtype": "Data", "label": "Image Name", "reqd": 1},
					{
						"fieldname": "image_file",
						"fieldtype": "Attach Image",
						"label": "Image File",
						"reqd": 1,
					},
				],
			}
		)
		gallery_doc.insert(ignore_permissions=True)
		print("Product Image Gallery doctype installed successfully")
	except Exception as e:
		print(f"Error installing Product Image Gallery doctype: {e}")


def install_all_doctypes():
	"""Install all doctypes"""
	install_register_doctype()
	install_product_doctype()
	install_gallery_doctype()
