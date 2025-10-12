"""
Script to verify doctype installation and API endpoint
"""

import os

import frappe


def check_doctype_installation():
	"""Check if Register doctype is properly installed"""
	print("🔍 Checking doctype installation...")

	try:
		# Initialize Frappe
		site_name = os.getenv("DRAPED_DREAMS_SITE_NAME", "dreams.localhost")
		frappe.init(site=site_name)
		frappe.connect()

		# Check if Register doctype exists
		if frappe.db.exists("DocType", "Register"):
			print("✅ Register doctype exists")

			# Get doctype details
			doctype = frappe.get_doc("DocType", "Register")
			print(f"   Module: {doctype.module}")
			print(f"   Fields: {len(doctype.fields)}")

			# List field names
			field_names = [field.fieldname for field in doctype.fields]
			print(f"   Field names: {field_names}")

		else:
			print("❌ Register doctype does not exist!")
			return False

		# Check if API method exists
		print("\n🔍 Checking API method...")
		try:
			# Try to call the method directly
			result = frappe.call(
				"draped_dreams.api.auth.register_user",
				first_name="Test",
				last_name="User",
				email="test@example.com",
				phone="+919876543210",
				user_password="testpass123",
				confirm_password="testpass123",
			)
			print("✅ API method call successful!")
			print(f"   Result: {result}")

		except Exception as e:
			print(f"❌ API method call failed: {e}")
			return False

		return True

	except Exception as e:
		print(f"❌ Error checking doctype: {e}")
		return False
	finally:
		try:
			frappe.destroy()
		except Exception:
			pass


def check_api_endpoint():
	"""Check if API endpoint is accessible"""
	print("\n🌐 Checking API endpoint accessibility...")

	try:
		import requests

		# Test endpoint
		url = "https://65.1.189.119/api/method/draped_dreams.api.auth.register_user"

		# Simple GET request to check if endpoint exists
		response = requests.get(url)
		print(f"GET request status: {response.status_code}")

		if response.status_code == 405:  # Method Not Allowed is expected for GET
			print("✅ API endpoint exists (405 Method Not Allowed is expected for GET)")
		elif response.status_code == 200:
			print("✅ API endpoint accessible")
		else:
			print(f"⚠️  Unexpected status code: {response.status_code}")

	except Exception as e:
		print(f"❌ Error checking API endpoint: {e}")


def main():
	"""Main function"""
	print("🚀 Draped Dreams API Verification")
	print("=" * 40)

	# Check doctype installation
	doctype_ok = check_doctype_installation()

	# Check API endpoint
	check_api_endpoint()

	print("\n📋 Summary:")
	if doctype_ok:
		print("✅ Doctype and API method are properly installed")
		print("💡 The 400 error is likely due to request format (JSON vs Form data)")
		print("🔧 Frontend has been updated to use form-encoded data")
	else:
		print("❌ Doctype or API method has issues")
		print("🔧 Run: bench --site your-site install-app draped_dreams")


if __name__ == "__main__":
	main()
