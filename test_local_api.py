#!/usr/bin/env python3
"""
Quick test to verify the local API endpoint
"""

import requests
import urllib.parse

# Test data
test_data = {
    "first_name": "Test",
    "last_name": "User", 
    "email": "test@example.com",
    "phone": "1234567890",
    "password": "testpass123",
    "confirm_password": "testpass123"
}

# Test with password field (new API)
print("🧪 Testing with 'password' field...")
form_data = urllib.parse.urlencode(test_data)
response = requests.post(
    "http://dreams.localhost:8002/api/method/draped_dreams.api.auth.register_user",
    data=form_data,
    headers={"Content-Type": "application/x-www-form-urlencoded"}
)
print(f"Status: {response.status_code}")
print(f"Response: {response.text}")

print("\n" + "="*50 + "\n")

# Test with user_password field (old API)
print("🧪 Testing with 'user_password' field...")
test_data_old = test_data.copy()
test_data_old["user_password"] = test_data_old.pop("password")
form_data_old = urllib.parse.urlencode(test_data_old)
response_old = requests.post(
    "http://dreams.localhost:8002/api/method/draped_dreams.api.auth.register_user",
    data=form_data_old,
    headers={"Content-Type": "application/x-www-form-urlencoded"}
)
print(f"Status: {response_old.status_code}")
print(f"Response: {response_old.text}")
