#!/bin/bash

# Automated Asset Deployment Script for Production
# This script will automatically copy frontend assets to the correct location

echo "🚀 Starting automated asset deployment..."

# Get the current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"
DIST_DIR="$FRONTEND_DIR/dist/assets"

# Check if frontend is built
if [ ! -d "$DIST_DIR" ]; then
    echo "❌ Frontend not built. Building now..."
    cd "$FRONTEND_DIR"
    yarn build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed!"
        exit 1
    fi
fi

# Find the Frappe sites directory
FRAPPE_SITES_DIR=""
if [ -d "/home/frappe/frappe-bench/sites" ]; then
    FRAPPE_SITES_DIR="/home/frappe/frappe-bench/sites"
elif [ -d "/opt/frappe/sites" ]; then
    FRAPPE_SITES_DIR="/opt/frappe/sites"
elif [ -d "/var/www/frappe/sites" ]; then
    FRAPPE_SITES_DIR="/var/www/frappe/sites"
else
    echo "❌ Frappe sites directory not found!"
    echo "Please update the script with the correct path"
    exit 1
fi

echo "📁 Found Frappe sites directory: $FRAPPE_SITES_DIR"

# Copy assets to all sites
for site_dir in "$FRAPPE_SITES_DIR"/*/; do
    if [ -d "$site_dir" ]; then
        site_name=$(basename "$site_dir")
        assets_dir="$site_dir/public/files/assets"
        
        echo "📦 Deploying assets to site: $site_name"
        
        # Create assets directory if it doesn't exist
        mkdir -p "$assets_dir"
        
        # Copy all assets
        cp -r "$DIST_DIR"/* "$assets_dir/"
        
        # Set proper permissions
        chmod 644 "$assets_dir"/*
        chown -R frappe:frappe "$assets_dir" 2>/dev/null || chown -R www-data:www-data "$assets_dir" 2>/dev/null
        
        echo "✅ Assets deployed to $site_name"
    fi
done

echo "🎉 Asset deployment completed successfully!"
echo "🔄 Please restart your Frappe services:"
echo "   bench restart"
