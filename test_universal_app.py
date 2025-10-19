#!/usr/bin/env python3
"""
Universal Application Test
Tests that the Draped Dreams application works everywhere without hardcoded URLs
"""

import requests
import json
import time
from urllib.parse import urljoin

class UniversalAppTester:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Draped Dreams Universal Tester/1.0',
            'Accept': 'application/json, text/html, */*',
            'Accept-Language': 'en-US,en;q=0.9'
        })
        
    def test_environment_detection(self):
        """Test that the app correctly detects the environment"""
        print("🔍 Testing Environment Detection...")
        
        try:
            # Test the main page
            response = self.session.get(f"{self.base_url}/draped_dreams")
            if response.status_code == 200:
                print("✅ Main page loads successfully")
                
                # Check if the page contains dynamic asset loading
                if "Universal Dynamic Asset Loading" in response.text:
                    print("✅ Dynamic asset loading detected")
                else:
                    print("⚠️ Dynamic asset loading not found")
                    
                # Check for hardcoded URLs
                hardcoded_urls = [
                    "http://localhost:8000",
                    "https://65.1.189.119",
                    "127.0.0.1:8000"
                ]
                
                found_hardcoded = []
                for url in hardcoded_urls:
                    if url in response.text:
                        found_hardcoded.append(url)
                
                if found_hardcoded:
                    print(f"❌ Found hardcoded URLs: {found_hardcoded}")
                else:
                    print("✅ No hardcoded URLs found")
                    
            else:
                print(f"❌ Main page failed to load: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Environment detection test failed: {e}")
            return False
            
        return True
    
    def test_api_endpoints(self):
        """Test that API endpoints work with dynamic URLs"""
        print("\n🔌 Testing API Endpoints...")
        
        endpoints = [
            "/api/method/draped_dreams.api.auth.get_products",
            "/api/method/draped_dreams.api.auth.get_categories",
            "/api/method/draped_dreams.api.auth.get_csrf_token"
        ]
        
        for endpoint in endpoints:
            try:
                url = f"{self.base_url}{endpoint}"
                response = self.session.get(url)
                
                if response.status_code == 200:
                    print(f"✅ {endpoint} - OK")
                elif response.status_code == 403:
                    print(f"⚠️ {endpoint} - 403 (Expected for auth endpoints)")
                else:
                    print(f"❌ {endpoint} - {response.status_code}")
                    
            except Exception as e:
                print(f"❌ {endpoint} - Error: {e}")
    
    def test_static_assets(self):
        """Test that static assets are served correctly"""
        print("\n📦 Testing Static Assets...")
        
        # Test if assets directory is accessible
        try:
            response = self.session.get(f"{self.base_url}/files/assets/")
            if response.status_code == 200:
                print("✅ Assets directory accessible")
                
                # Check for common asset files
                asset_files = [
                    "index-c7d485ac.js",
                    "index-e36060c2.css"
                ]
                
                for asset in asset_files:
                    asset_url = f"{self.base_url}/files/assets/{asset}"
                    asset_response = self.session.get(asset_url)
                    
                    if asset_response.status_code == 200:
                        print(f"✅ {asset} - OK")
                    else:
                        print(f"❌ {asset} - {asset_response.status_code}")
                        
            else:
                print(f"❌ Assets directory not accessible: {response.status_code}")
                
        except Exception as e:
            print(f"❌ Static assets test failed: {e}")
    
    def test_routing(self):
        """Test that all routes work correctly"""
        print("\n🛣️ Testing Routing...")
        
        routes = [
            "/draped_dreams#/products",
            "/draped_dreams#/cart", 
            "/draped_dreams#/login",
            "/draped_dreams#/register",
            "/draped_dreams#/orders",
            "/draped_dreams#/admin/dashboard"
        ]
        
        for route in routes:
            try:
                url = f"{self.base_url}{route}"
                response = self.session.get(url)
                
                if response.status_code == 200:
                    print(f"✅ {route} - OK")
                else:
                    print(f"❌ {route} - {response.status_code}")
                    
            except Exception as e:
                print(f"❌ {route} - Error: {e}")
    
    def test_cors_headers(self):
        """Test CORS headers for cross-origin requests"""
        print("\n🌐 Testing CORS Headers...")
        
        try:
            # Test a simple API endpoint
            response = self.session.options(f"{self.base_url}/api/method/draped_dreams.api.auth.get_products")
            
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            found_headers = []
            for header in cors_headers:
                if header in response.headers:
                    found_headers.append(header)
                    print(f"✅ {header}: {response.headers[header]}")
                else:
                    print(f"⚠️ {header}: Not found")
            
            if len(found_headers) >= 2:
                print("✅ CORS headers properly configured")
            else:
                print("⚠️ CORS headers may need configuration")
                
        except Exception as e:
            print(f"❌ CORS test failed: {e}")
    
    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting Universal Application Tests")
        print("=" * 50)
        
        tests = [
            self.test_environment_detection,
            self.test_api_endpoints,
            self.test_static_assets,
            self.test_routing,
            self.test_cors_headers
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            try:
                if test():
                    passed += 1
            except Exception as e:
                print(f"❌ Test failed with exception: {e}")
        
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! Application is universal!")
        else:
            print("⚠️ Some tests failed. Check the output above.")
        
        return passed == total

def main():
    """Main function"""
    import sys
    
    if len(sys.argv) != 2:
        print("Usage: python test_universal_app.py <base_url>")
        print("Example: python test_universal_app.py http://dreams.localhost:8000")
        print("Example: python test_universal_app.py https://your-domain.com")
        sys.exit(1)
    
    base_url = sys.argv[1]
    print(f"Testing application at: {base_url}")
    
    tester = UniversalAppTester(base_url)
    success = tester.run_all_tests()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
