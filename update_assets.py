#!/usr/bin/env python3
"""
Script to automatically update HTML file with latest asset names
This ensures the application works everywhere without hardcoded asset names
"""

import os
import re
import glob
from pathlib import Path

def find_latest_assets():
    """Find the latest built assets"""
    assets_dir = Path("sites/dreams.localhost/public/files/assets")
    
    if not assets_dir.exists():
        print("Assets directory not found!")
        return None, None
    
    # Find the latest index.js file
    js_files = list(assets_dir.glob("index-*.js"))
    css_files = list(assets_dir.glob("index-*.css"))
    
    if not js_files or not css_files:
        print("No index assets found!")
        return None, None
    
    # Get the most recent files
    latest_js = max(js_files, key=os.path.getmtime)
    latest_css = max(css_files, key=os.path.getmtime)
    
    return latest_js.name, latest_css.name

def update_html_file(js_file, css_file):
    """Update the HTML file with new asset names"""
    html_file = Path("draped_dreams/www/draped_dreams.html")
    
    if not html_file.exists():
        print("HTML file not found!")
        return False
    
    # Read the current HTML content
    with open(html_file, 'r') as f:
        content = f.read()
    
    # Update the JavaScript file name
    content = re.sub(
        r'const jsFile = `\${baseUrl}/files/assets/index-[a-f0-9-]+\.js',
        f'const jsFile = `${{baseUrl}}/files/assets/{js_file}',
        content
    )
    
    # Update the CSS file name
    content = re.sub(
        r'const cssFile = `\${baseUrl}/files/assets/index-[a-f0-9-]+\.css',
        f'const cssFile = `${{baseUrl}}/files/assets/{css_file}',
        content
    )
    
    # Write the updated content
    with open(html_file, 'w') as f:
        f.write(content)
    
    print(f"Updated HTML file with assets: {js_file}, {css_file}")
    return True

def main():
    """Main function"""
    print("Updating asset references in HTML file...")
    
    # Find latest assets
    js_file, css_file = find_latest_assets()
    
    if not js_file or not css_file:
        print("Failed to find assets!")
        return False
    
    # Update HTML file
    success = update_html_file(js_file, css_file)
    
    if success:
        print("✅ Asset references updated successfully!")
        print(f"   JS: {js_file}")
        print(f"   CSS: {css_file}")
    else:
        print("❌ Failed to update asset references!")
    
    return success

if __name__ == "__main__":
    main()
