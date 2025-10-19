#!/usr/bin/env python3
"""
Deployment script for Draped Dreams assets to production server
This script helps you deploy the built frontend assets to your production server.
"""

import os
import subprocess
import sys
from pathlib import Path

def print_header():
    print("🚀 Draped Dreams - Production Asset Deployment")
    print("=" * 50)

def check_assets():
    """Check if assets exist locally"""
    assets_dir = Path("frontend/dist/assets")
    if not assets_dir.exists():
        print("❌ Assets directory not found. Please run 'yarn build' first.")
        return False
    
    asset_files = list(assets_dir.glob("*"))
    print(f"✅ Found {len(asset_files)} asset files locally")
    return True

def create_upload_script():
    """Create a script to upload assets to production server"""
    script_content = '''#!/bin/bash
# Upload script for Draped Dreams assets
# Run this script on your production server

echo "🚀 Deploying Draped Dreams Assets to Production"
echo "=============================================="

# Create assets directory if it doesn't exist
mkdir -p /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/

# List of asset files to upload (copy these files to your server)
echo "📦 Asset files to upload:"
echo "1. index-c7d485ac.js"
echo "2. index-e36060c2.css"
echo "3. Products-3f585344.js"
echo "4. FeatherIcon-82e60495.js"
echo "5. base-c576634b.js"
echo "6. TextInput-0a4cbe4e.js"
echo "7. Badge-87d29bac.js"
echo "8. Cart-ff73a54c.js"
echo "9. Checkout-8b9e0580.js"
echo "10. Customers-e93ee9e9.js"
echo "11. Dashboard-162fb3e5.js"
echo "12. Home-fd916962.js"
echo "13. Inventory-78d3928b.js"
echo "14. Login-9bc17930.js"
echo "15. Orders-6736d545.js"
echo "16. Products-1687e242.js"
echo "17. products-2e5e880d.js"
echo "18. Register-1ba13b64.js"
echo "19. Reports-19444a01.js"
echo "20. AdminProducts-b13bfa38.js"
echo "21. auth-3c962066.js"
echo "22. base-16152d6a.js"
echo "23. Cart-24155a26.js"
echo "24. Checkout-5b292af0.js"
echo "25. Customers-5bb0ecc2.js"
echo "26. Dashboard-2c54ba7a.js"
echo "27. FeatherIcon-dab16fbd.js"
echo "28. Home-fd916962.js"
echo "29. index-35c6b5bc.js"
echo "30. index-b092ffdf.css"
echo "31. Inventory-78d3928b.js"
echo "32. Login-9bc17930.js"
echo "33. Orders-6736d545.js"
echo "34. Products-1687e242.js"
echo "35. products-4ee3ca03.js"
echo "36. Register-1ba13b64.js"
echo "37. Reports-19444a01.js"

echo ""
echo "📋 Instructions:"
echo "1. Copy all the above files from your local machine to the production server"
echo "2. Place them in: /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/"
echo "3. Set proper permissions: chmod 644 /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/*"
echo "4. Restart the Frappe server: bench restart"
echo ""
echo "🔧 Alternative: Use SCP to copy files:"
echo "scp frontend/dist/assets/* root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/"
'''
    
    with open("upload_assets.sh", "w") as f:
        f.write(script_content)
    
    os.chmod("upload_assets.sh", 0o755)
    print("✅ Created upload_assets.sh script")

def create_scp_commands():
    """Create SCP commands for easy copying"""
    assets_dir = Path("frontend/dist/assets")
    if not assets_dir.exists():
        return
    
    print("\n🔧 SCP Commands to copy assets to production server:")
    print("=" * 60)
    
    # Get all asset files
    asset_files = list(assets_dir.glob("*"))
    
    for asset_file in asset_files:
        print(f"scp {asset_file} root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/")
    
    print("\n📋 Or copy all at once:")
    print(f"scp {assets_dir}/* root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/")

def create_rsync_command():
    """Create rsync command for efficient copying"""
    print("\n🚀 Rsync command (most efficient):")
    print("=" * 40)
    print("rsync -avz --progress frontend/dist/assets/ root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/")

def main():
    print_header()
    
    if not check_assets():
        sys.exit(1)
    
    print("\n📋 Deployment Options:")
    print("1. Create upload script")
    print("2. Show SCP commands")
    print("3. Show rsync command")
    print("4. All of the above")
    
    choice = input("\nEnter your choice (1-4): ").strip()
    
    if choice in ["1", "4"]:
        create_upload_script()
    
    if choice in ["2", "4"]:
        create_scp_commands()
    
    if choice in ["3", "4"]:
        create_rsync_command()
    
    print("\n🎯 Next Steps:")
    print("1. Choose one of the methods above to copy assets to production")
    print("2. Set proper permissions on the production server")
    print("3. Restart the Frappe server")
    print("4. Test the application at https://65.1.189.119/draped_dreams")
    
    print("\n✅ Deployment guide created!")

if __name__ == "__main__":
    main()
