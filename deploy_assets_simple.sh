#!/bin/bash

# 🚀 Simple Asset Deployment Script for Draped Dreams
# This script handles both development and production asset deployment

echo "🚀 Draped Dreams - Asset Deployment Script"
echo "=========================================="

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
    cd "$SCRIPT_DIR"
fi

echo "📦 Found built assets in: $DIST_DIR"

# Function to deploy to local development
deploy_local() {
    echo "🏠 Deploying to local development..."
    LOCAL_ASSETS_DIR="$SCRIPT_DIR/draped_dreams/www/assets"
    
    # Create assets directory if it doesn't exist
    mkdir -p "$LOCAL_ASSETS_DIR"
    
    # Copy all assets
    cp -r "$DIST_DIR"/* "$LOCAL_ASSETS_DIR/"
    
    echo "✅ Assets deployed to local development"
    echo "📍 Location: $LOCAL_ASSETS_DIR"
}

# Function to deploy to production
deploy_production() {
    echo "🌍 Deploying to production server..."
    
    PRODUCTION_SERVER="root@65.1.189.119"
    PRODUCTION_PATH="/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets"
    
    echo "📤 Copying assets to production server..."
    scp -r "$DIST_DIR"/* "$PRODUCTION_SERVER:$PRODUCTION_PATH/"
    
    if [ $? -eq 0 ]; then
        echo "✅ Assets copied to production server"
        echo "🔧 Setting permissions and restarting server..."
        
        ssh "$PRODUCTION_SERVER" << EOF
chmod 644 $PRODUCTION_PATH/*
chown -R frappe:frappe $PRODUCTION_PATH
bench restart
echo "✅ Production server restarted"
EOF
        
        echo "🎉 Production deployment completed!"
    else
        echo "❌ Failed to copy assets to production server"
        exit 1
    fi
}

# Main deployment logic
if [ "$1" = "production" ] || [ "$1" = "prod" ]; then
    deploy_production
elif [ "$1" = "local" ] || [ "$1" = "dev" ]; then
    deploy_local
else
    echo "🤔 Deploying to both local and production..."
    deploy_local
    echo ""
    deploy_production
fi

echo ""
echo "🎯 Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   - Test your application in the browser"
echo "   - Check browser console for any errors"
echo "   - Verify all pages load correctly"
echo ""
echo "🆘 If you encounter issues:"
echo "   - Check browser console for error messages"
echo "   - Verify assets are in the correct location"
echo "   - Restart your Frappe server: bench restart"


