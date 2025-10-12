#!/usr/bin/env python3
"""
Test script to verify the registration API endpoint
"""

import urllib.parse

import requests

# Test data for registration
test_user_data = {
	"first_name": "Test",
	"last_name": "User",
	"email": "test@example.com",
	"phone": "+919876543210",
	"password": "testpassword123",
	"confirm_password": "testpassword123",
}

# API endpoint
api_url = "https://65.1.189.119/api/method/draped_dreams.api.auth.register_user"


def test_registration_api():
	"""Test the registration API with form-encoded data"""
	print("🧪 Testing Registration API...")
	print(f"URL: {api_url}")
	print(f"Data: {test_user_data}")
	print("")

	# Method 1: Form-encoded data (what Frappe expects)
	print("1. Testing with form-encoded data...")
	try:
		form_data = urllib.parse.urlencode(test_user_data)
		print(f"Form data: {form_data}")

		response = requests.post(
			api_url,
			data=form_data,
			headers={"Content-Type": "application/x-www-form-urlencoded", "Origin": "https://65.1.189.119"},
			verify=False,  # Skip SSL verification for testing
		)

		print(f"Status Code: {response.status_code}")
		print(f"Response Headers: {dict(response.headers)}")
		print(f"Response Text: {response.text}")

		if response.status_code == 200:
			print("✅ Form-encoded request successful!")
			try:
				data = response.json()
				print(f"Response JSON: {data}")
			except Exception:
				print("Response is not JSON")
		else:
			print(f"❌ Form-encoded request failed: {response.status_code}")

	except Exception as e:
		print(f"❌ Error with form-encoded request: {e}")

	print("\n" + "=" * 50 + "\n")

	# Method 2: JSON data (what was causing the 400 error)
	print("2. Testing with JSON data (should fail)...")
	try:
		response = requests.post(
			api_url,
			json=test_user_data,
			headers={"Content-Type": "application/json", "Origin": "https://65.1.189.119"},
			verify=False,  # Skip SSL verification for testing
		)

		print(f"Status Code: {response.status_code}")
		print(f"Response Text: {response.text}")

		if response.status_code == 400:
			print("✅ JSON request failed as expected (400 BAD REQUEST)")
		else:
			print(f"❌ Unexpected response: {response.status_code}")

	except Exception as e:
		print(f"❌ Error with JSON request: {e}")


if __name__ == "__main__":
	test_registration_api()
