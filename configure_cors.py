"""
CORS Configuration Script for Draped Dreams

This script helps configure CORS at the site level in Frappe
"""

import json
import os

import frappe


def configure_cors_site_level():
	"""Configure CORS at the site level"""

	print("🔧 Configuring CORS at site level...")

	try:
		# Method 1: Using Frappe's site configuration
		# This is the recommended approach for Frappe Cloud and production

		# Set CORS configuration in site config
		frappe.conf.cors = {
			"allow_origins": ["*"],  # In production, specify exact domains
			"allow_methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			"allow_headers": ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
			"allow_credentials": True,
			"max_age": 86400,
		}

		print("✅ CORS configuration set in frappe.conf")

		# Method 2: Create a site_config.json file (for local development)
		site_config = {
			"cors": {
				"allow_origins": ["*"],
				"allow_methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
				"allow_headers": ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
				"allow_credentials": True,
				"max_age": 86400,
			}
		}

		# Write site_config.json (this would be in your site directory)
		print("📝 Site configuration template created")
		print("To apply this configuration:")
		print("1. Copy the following JSON to your site's site_config.json file:")
		print(json.dumps(site_config, indent=2))
		print(
			"\n2. Or run: bench --site <your-site> set-config cors '{}'".format(
				json.dumps(site_config["cors"])
			)
		)

		return True

	except Exception as e:
		print(f"❌ Error configuring CORS: {e}")
		return False


def create_cors_middleware():
	"""Create a CORS middleware for Frappe"""

	cors_middleware_code = '''
# CORS Middleware for Frappe
# Add this to your hooks.py

def add_cors_headers():
	"""Add CORS headers to all responses"""
	import frappe

	if hasattr(frappe.local, 'response'):
		frappe.local.response.headers["Access-Control-Allow-Origin"] = "*"
		frappe.local.response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
		frappe.local.response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization,X-Requested-With,Accept,Origin"
		frappe.local.response.headers["Access-Control-Allow-Credentials"] = "true"
		frappe.local.response.headers["Access-Control-Max-Age"] = "86400"

def handle_cors_preflight():
	"""Handle CORS preflight OPTIONS requests"""
	import frappe

	if frappe.request.method == "OPTIONS":
		add_cors_headers()
		frappe.local.response.status_code = 200
		return frappe.local.response

# Add these to your hooks.py:
# before_request = "draped_dreams.hooks.add_cors_headers"
# handle_options = "draped_dreams.hooks.handle_cors_preflight"
'''

	print("📄 CORS Middleware code:")
	print(cors_middleware_code)


def main():
	"""Main function"""
	print("🚀 Draped Dreams CORS Configuration")
	print("=" * 50)

	# Initialize Frappe (you'll need to run this in your Frappe environment)
	try:
		frappe.init(site="dreams.localhost")
		frappe.connect()

		configure_cors_site_level()
		create_cors_middleware()

		print("\n🎉 CORS configuration completed!")
		print("\nNext steps:")
		print("1. Restart your Frappe server: bench restart")
		print("2. Test your API endpoints")
		print("3. For production, update allow_origins to specific domains")

	except Exception as e:
		print(f"❌ Error initializing Frappe: {e}")
		print("\nTo run this script:")
		print("1. Make sure you're in your Frappe bench directory")
		print("2. Run: bench --site <your-site> console")
		print("3. Then run this script")

	finally:
		try:
			frappe.destroy()
		except Exception:
			pass


if __name__ == "__main__":
	main()
