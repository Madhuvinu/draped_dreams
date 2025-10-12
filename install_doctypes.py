# Run this in Frappe console: bench --site dreams.localhost console

# Install Register doctype
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
				{"fieldname": "phone", "fieldtype": "Data", "label": "Phone", "options": "Phone", "reqd": 1},
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
	register_doc.insert(ignore_permissions=True)
	print("✓ Register doctype installed")
except Exception as e:
	print(f"✗ Error installing Register doctype: {e}")

# Install Product doctype
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
					"read_only": 1,
					"unique": 1,
				},
				{
					"fieldname": "category",
					"fieldtype": "Select",
					"label": "Category",
					"options": "Silk\nCotton\nDesigner\nWedding\nCasual\nParty",
					"reqd": 1,
				},
				{"fieldname": "description", "fieldtype": "Text", "label": "Description", "reqd": 1},
				{"fieldname": "price", "fieldtype": "Currency", "label": "Price", "reqd": 1},
				{"fieldname": "original_price", "fieldtype": "Currency", "label": "Original Price"},
				{
					"fieldname": "stock_quantity",
					"fieldtype": "Int",
					"label": "Stock Quantity",
					"default": 0,
					"reqd": 1,
				},
				{
					"fieldname": "min_stock_level",
					"fieldtype": "Int",
					"label": "Minimum Stock Level",
					"default": 5,
					"reqd": 1,
				},
				{"fieldname": "product_image", "fieldtype": "Attach Image", "label": "Product Image"},
				{
					"fieldname": "status",
					"fieldtype": "Select",
					"label": "Status",
					"options": "Active\nInactive\nDiscontinued",
					"default": "Active",
					"reqd": 1,
				},
				{"fieldname": "featured", "fieldtype": "Check", "label": "Featured Product", "default": 0},
				{
					"fieldname": "rating",
					"fieldtype": "Float",
					"label": "Rating",
					"precision": "1",
					"default": 0,
				},
				{
					"fieldname": "created_date",
					"fieldtype": "Date",
					"label": "Created Date",
					"default": "Today",
					"read_only": 1,
				},
				{
					"fieldname": "modified_date",
					"fieldtype": "Date",
					"label": "Modified Date",
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
	product_doc.insert(ignore_permissions=True)
	print("✓ Product doctype installed")
except Exception as e:
	print(f"✗ Error installing Product doctype: {e}")

# Install Product Image Gallery doctype
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
				{"fieldname": "image_file", "fieldtype": "Attach Image", "label": "Image File", "reqd": 1},
				{"fieldname": "is_primary", "fieldtype": "Check", "label": "Is Primary", "default": 0},
			],
		}
	)
	gallery_doc.insert(ignore_permissions=True)
	print("✓ Product Image Gallery doctype installed")
except Exception as e:
	print(f"✗ Error installing Product Image Gallery doctype: {e}")

print("🎉 All doctypes installed successfully!")
