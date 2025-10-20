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
    echo "🌍 Deploying to production..."

    # Preferred local target paths (when running on the server)
    LOCAL_PATHS=(
        "/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets"
        "/home/harsha/frappe-bench/frappe-bench/sites/65.1.189.119/public/files/assets"
        "$HOME/frappe-bench/frappe-bench/sites/65.1.189.119/public/files/assets"
    )

    # If any local path exists, copy locally (no SSH)
    for TARGET in "${LOCAL_PATHS[@]}"; do
        if [ -d "$(dirname "$TARGET")" ]; then
            echo "📦 Detected local bench. Copying assets locally to: $TARGET"
            mkdir -p "$TARGET"
            cp -r "$DIST_DIR"/* "$TARGET/"
            chmod 644 "$TARGET"/* 2>/dev/null || true
            chown -R "$USER":"$USER" "$TARGET" 2>/dev/null || true
            echo "🔄 Restarting bench (if available)"
            (cd "$HOME/frappe-bench" 2>/dev/null && bench restart) 2>/dev/null || true
            echo "🎉 Production deployment completed (local copy)!"
            return 0
        fi
    done

    # Otherwise, fallback to remote copy via SSH (non-root user)
    PRODUCTION_USER="harsha"
    PRODUCTION_HOST="65.1.189.119"
    PRODUCTION_SERVER="$PRODUCTION_USER@$PRODUCTION_HOST"
    REMOTE_PATH="/home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets"

    echo "📤 Copying assets to remote production server ($PRODUCTION_SERVER)..."
    scp -r "$DIST_DIR"/* "$PRODUCTION_SERVER:$REMOTE_PATH/" || {
        echo "❌ Failed to copy assets to production server via scp"
        echo "ℹ️ Tip: Ensure SSH keys exist for $PRODUCTION_SERVER and the path $REMOTE_PATH is correct."
        exit 1
    }

    echo "✅ Assets copied to production server"
    echo "🔧 Setting permissions and restarting server..."
    ssh "$PRODUCTION_SERVER" << EOF
chmod 644 $REMOTE_PATH/* 2>/dev/null || true
chown -R frappe:frappe $REMOTE_PATH 2>/dev/null || true
cd /home/frappe/frappe-bench || exit 0
bench restart || true
echo "✅ Production server restarted"
EOF

    echo "🎉 Production deployment completed!"
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


