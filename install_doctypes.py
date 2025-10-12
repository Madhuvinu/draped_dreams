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
					{
						"fieldname": "phone",
						"fieldtype": "Data",
						"label": "Phone",
						"options": "Phone",
						"reqd": 1,
					},
					{"fieldname": "password", "fieldtype": "Password", "label": "Password", "reqd": 1},
					{
						"fieldname": "confirm_password",
						"fieldtype": "Password",
						"label": "Confirm Password",
						"reqd": 1,
					},
					{
						"fieldname": "status",
						"fieldtype": "Select",
						"label": "Status",
						"options": "Active\nInactive\nPending",
						"default": "Active",
						"reqd": 1,
					},
					{
						"fieldname": "registration_date",
						"fieldtype": "Date",
						"label": "Registration Date",
						"default": "Today",
						"read_only": 1,
					},
				],
				"permissions": [
					{
						"role": "System Manager",
						"create": 1,
						"delete": 1,
						"email": 1,
						"export": 1,
						"print": 1,
						"read": 1,
						"report": 1,
						"share": 1,
						"write": 1,
					},
					{
						"role": "Guest",
						"create": 1,
						"email": 1,
						"export": 1,
						"print": 1,
						"read": 1,
						"report": 1,
						"share": 1,
					},
				],
			}
		)
		register_doc.insert()
		frappe.db.commit()
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
					{"fieldname": "description", "fieldtype": "Text", "label": "Description"},
					{"fieldname": "category", "fieldtype": "Data", "label": "Category", "reqd": 1},
					{"fieldname": "price", "fieldtype": "Currency", "label": "Price", "reqd": 1},
					{"fieldname": "original_price", "fieldtype": "Currency", "label": "Original Price"},
					{
						"fieldname": "stock_quantity",
						"fieldtype": "Int",
						"label": "Stock Quantity",
						"default": 0,
					},
					{
						"fieldname": "min_stock_level",
						"fieldtype": "Int",
						"label": "Minimum Stock Level",
						"default": 5,
					},
					{"fieldname": "weight", "fieldtype": "Float", "label": "Weight (kg)"},
					{"fieldname": "dimensions", "fieldtype": "Data", "label": "Dimensions (LxWxH)"},
					{"fieldname": "brand", "fieldtype": "Data", "label": "Brand"},
					{"fieldname": "color", "fieldtype": "Data", "label": "Color"},
					{"fieldname": "size", "fieldtype": "Data", "label": "Size"},
					{"fieldname": "material", "fieldtype": "Data", "label": "Material"},
					{"fieldname": "is_active", "fieldtype": "Check", "label": "Is Active", "default": 1},
					{"fieldname": "featured", "fieldtype": "Check", "label": "Featured Product"},
					{"fieldname": "tags", "fieldtype": "Small Text", "label": "Tags"},
					{"fieldname": "meta_title", "fieldtype": "Data", "label": "Meta Title"},
					{"fieldname": "meta_description", "fieldtype": "Text", "label": "Meta Description"},
					{
						"fieldname": "created_date",
						"fieldtype": "Date",
						"label": "Created Date",
						"default": "Today",
					},
					{
						"fieldname": "modified_date",
						"fieldtype": "Date",
						"label": "Modified Date",
						"default": "Today",
					},
				],
				"permissions": [
					{
						"role": "System Manager",
						"create": 1,
						"delete": 1,
						"email": 1,
						"export": 1,
						"print": 1,
						"read": 1,
						"report": 1,
						"share": 1,
						"write": 1,
					},
					{
						"role": "Guest",
						"create": 1,
						"email": 1,
						"export": 1,
						"print": 1,
						"read": 1,
						"report": 1,
						"share": 1,
					},
				],
			}
		)
		product_doc.insert()
		frappe.db.commit()
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
					{"fieldname": "is_primary", "fieldtype": "Check", "label": "Primary Image"},
					{"fieldname": "alt_text", "fieldtype": "Data", "label": "Alt Text"},
				],
			}
		)
		gallery_doc.insert()
		frappe.db.commit()
		print("Product Image Gallery doctype installed successfully")
	except Exception as e:
		print(f"Error installing Product Image Gallery doctype: {e}")


def install_all_doctypes():
	"""Install all doctypes"""
	install_register_doctype()
	install_product_doctype()
	install_gallery_doctype()


# Run this in Frappe console: bench --site dreams.localhost console
# Then call: install_all_doctypes()
