#!/bin/bash

echo "🚀 Draped Dreams - Copying Assets to Production Server"
echo "======================================================"

# Check if assets directory exists
if [ ! -d "frontend/dist/assets" ]; then
    echo "❌ Assets directory not found. Please run 'yarn build' first."
    exit 1
fi

# Count asset files
ASSET_COUNT=$(ls frontend/dist/assets/*.js frontend/dist/assets/*.css 2>/dev/null | wc -l)
echo "📦 Found $ASSET_COUNT asset files to copy"

# Copy all assets to production server
echo "📤 Copying assets to production server..."
scp frontend/dist/assets/* root@65.1.189.119:/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/

if [ $? -eq 0 ]; then
    echo "✅ Assets copied successfully!"
    echo ""
    echo "🔧 Next steps (run these on your production server):"
    echo "1. chmod 644 /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/*"
    echo "2. bench restart"
    echo ""
    echo "🎯 Then test your application at: https://65.1.189.119/draped_dreams"
else
    echo "❌ Failed to copy assets. Please check your SSH connection and try again."
    exit 1
fi
