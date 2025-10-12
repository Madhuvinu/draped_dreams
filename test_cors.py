#!/usr/bin/env python3
"""
Test script to verify CORS configuration for the Draped Dreams API
"""

import requests
import json

# Test data for registration
test_user_data = {
    "first_name": "Test",
    "last_name": "User", 
    "email": "test@example.com",
    "phone": "+919876543210",
    "user_password": "testpassword123",
    "confirm_password": "testpassword123"
}

# API endpoint - using production domain
api_url = "https://65.1.189.119/api/method/draped_dreams.api.auth.register_user"

def test_cors_headers():
    """Test if CORS headers are properly set"""
    print("Testing CORS configuration...")
    
    # Test OPTIONS request (preflight)
    print("\n1. Testing OPTIONS request (CORS preflight)...")
    try:
        response = requests.options(api_url, headers={
            "Origin": "https://65.1.189.119",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "Content-Type"
        })
        
        print(f"Status Code: {response.status_code}")
        print("CORS Headers:")
        for header, value in response.headers.items():
            if header.lower().startswith('access-control'):
                print(f"  {header}: {value}")
        
        if response.status_code == 200:
            print("✅ OPTIONS request successful")
        else:
            print("❌ OPTIONS request failed")
            
    except Exception as e:
        print(f"❌ Error testing OPTIONS request: {e}")
    
    # Test POST request
    print("\n2. Testing POST request...")
    try:
        response = requests.post(api_url, 
            json=test_user_data,
            headers={
                "Content-Type": "application/json",
                "Origin": "https://65.1.189.119"
            }
        )
        
        print(f"Status Code: {response.status_code}")
        print("CORS Headers:")
        for header, value in response.headers.items():
            if header.lower().startswith('access-control'):
                print(f"  {header}: {value}")
        
        if response.status_code in [200, 201]:
            print("✅ POST request successful")
            try:
                data = response.json()
                print(f"Response: {json.dumps(data, indent=2)}")
            except:
                print(f"Response text: {response.text}")
        else:
            print("❌ POST request failed")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error testing POST request: {e}")

if __name__ == "__main__":
    test_cors_headers()
