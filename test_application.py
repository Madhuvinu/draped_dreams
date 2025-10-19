#!/usr/bin/env python3
"""
Comprehensive test script for Draped Dreams application
Tests all major functionality including API endpoints, frontend, and integration
"""

import requests
import json
import time
import sys

# Configuration
BASE_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:3001"

def test_api_endpoint(endpoint, method="GET", data=None, expected_status=200):
    """Test an API endpoint"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, data=data)
        
        print(f"✓ {method} {endpoint} - Status: {response.status_code}")
        
        if response.status_code == expected_status:
            try:
                result = response.json()
                if result.get("message", {}).get("success"):
                    print(f"  ✓ API Response: Success")
                    return True, result
                else:
                    print(f"  ✗ API Response: {result.get('message', {}).get('message', 'Unknown error')}")
                    return False, result
            except:
                print(f"  ✓ API Response: {response.text[:100]}...")
                return True, response.text
        else:
            print(f"  ✗ Expected status {expected_status}, got {response.status_code}")
            return False, None
            
    except Exception as e:
        print(f"  ✗ Error: {str(e)}")
        return False, None

def test_frontend():
    """Test frontend accessibility"""
    try:
        response = requests.get(FRONTEND_URL)
        if response.status_code == 200:
            print(f"✓ Frontend accessible at {FRONTEND_URL}")
            return True
        else:
            print(f"✗ Frontend returned status {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Frontend not accessible: {str(e)}")
        return False

def main():
    """Run comprehensive tests"""
    print("🎀 Draped Dreams - Comprehensive Application Test")
    print("=" * 60)
    
    # Test 1: Frontend Accessibility
    print("\n1. Testing Frontend Accessibility...")
    frontend_ok = test_frontend()
    
    # Test 2: Backend API Health
    print("\n2. Testing Backend API Health...")
    health_ok, _ = test_api_endpoint("/api/method/draped_dreams.api.auth.get_products", expected_status=200)
    
    # Test 3: Product Management APIs
    print("\n3. Testing Product Management APIs...")
    
    # Get products
    products_ok, products_data = test_api_endpoint("/api/method/draped_dreams.api.auth.get_products")
    
    # Get categories
    categories_ok, categories_data = test_api_endpoint("/api/method/draped_dreams.api.auth.get_categories")
    
    # Test 4: User Registration API
    print("\n4. Testing User Registration API...")
    import time
    timestamp = str(int(time.time()))
    test_user = {
        "first_name": "Test",
        "last_name": "User",
        "email": f"test{timestamp}@example.com",
        "phone": "1234567890",
        "password": "testpassword123",
        "confirm_password": "testpassword123"
    }
    
    registration_ok, reg_data = test_api_endpoint(
        "/api/method/draped_dreams.api.auth.register_user",
        method="POST",
        data=test_user
    )
    
    # Test 5: User Login API
    print("\n5. Testing User Login API...")
    login_data = {
        "email": test_user["email"],
        "password": "testpassword123"
    }
    
    login_ok, login_result = test_api_endpoint(
        "/api/method/draped_dreams.api.auth.login_user",
        method="POST",
        data=login_data
    )
    
    # Test 6: Product Creation API
    print("\n6. Testing Product Creation API...")
    import time
    timestamp = str(int(time.time()))
    new_product = {
        "product_name": f"Test Product {timestamp}",
        "description": "A test product for validation",
        "category": "Silk",
        "price": "1000",
        "stock_quantity": "10",
        "featured": "false"
    }
    
    create_ok, create_data = test_api_endpoint(
        "/api/method/draped_dreams.api.products.create_product",
        method="POST",
        data=new_product
    )
    
    # Test 7: Product Deletion API
    if create_ok and create_data:
        product_name = create_data.get("message", {}).get("data", {}).get("name")
        if product_name:
            print("\n7. Testing Product Deletion API...")
            delete_data = {"product_id": product_name}
            delete_ok, _ = test_api_endpoint(
                "/api/method/draped_dreams.api.products.delete_product",
                method="POST",
                data=delete_data
            )
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    tests = [
        ("Frontend Accessibility", frontend_ok),
        ("Backend Health", health_ok),
        ("Products API", products_ok),
        ("Categories API", categories_ok),
        ("User Registration", registration_ok),
        ("User Login", login_ok),
        ("Product Creation", create_ok),
    ]
    
    passed = sum(1 for _, result in tests if result)
    total = len(tests)
    
    for test_name, result in tests:
        status = "✓ PASS" if result else "✗ FAIL"
        print(f"{test_name:<25} {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed! Application is working correctly.")
        print(f"\n🌐 Access your application at: {FRONTEND_URL}")
        print("📱 Admin Dashboard: http://localhost:3001/#/admin/dashboard")
        print("🛍️ Products Page: http://localhost:3001/#/products")
        print("🛒 Cart Page: http://localhost:3001/#/cart")
        print("👤 Login Page: http://localhost:3001/#/login")
        print("📝 Register Page: http://localhost:3001/#/register")
    else:
        print(f"\n⚠️ {total - passed} tests failed. Please check the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
