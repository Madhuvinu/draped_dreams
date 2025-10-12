#!/bin/bash
# Server Setup Script for Draped Dreams
# Run this on your production server after pulling from git

echo "🚀 Draped Dreams Server Setup"
echo "============================="

# Configuration
SITE_NAME=${1:-"your-production-site.com"}
ENVIRONMENT=${2:-"production"}

echo "📝 Site Name: $SITE_NAME"
echo "🔧 Environment: $ENVIRONMENT"
echo ""

# Set environment variables
export DRAPED_DREAMS_SITE_NAME="$SITE_NAME"
export DRAPED_DREAMS_ENV="$ENVIRONMENT"

# Check if we're in the right directory
if [ ! -f "config.ini" ]; then
    echo "❌ Error: config.ini not found!"
    echo "Please run this script from the draped_dreams app directory"
    exit 1
fi

# Check if we're in a Frappe bench directory
if [ ! -f "../sites/common_site_config.json" ] && [ ! -d "../sites" ]; then
    echo "❌ Error: This script must be run from a Frappe app directory"
    echo "Expected structure: bench/apps/draped_dreams/"
    exit 1
fi

echo "🔧 Step 1: Updating configuration..."
# Update config.ini with actual site name if needed
if grep -q "your-production-site.com" config.ini; then
    echo "⚠️  Please update config.ini with your actual production site name"
    echo "   Edit the [production] section in config.ini"
    read -p "Press Enter after updating config.ini..."
fi

echo "🔧 Step 2: Setting up CORS..."
./setup.sh $ENVIRONMENT

echo "🔧 Step 3: Building frontend..."
cd frontend

# Copy environment file
if [ ! -f ".env.production" ]; then
    cp env.production.example .env.production
    echo "📝 Created .env.production - please update with your actual URLs"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Build frontend
echo "🏗️  Building frontend..."
npm run build

cd ..

echo "🔧 Step 4: Building Frappe assets..."
# Go to bench directory
cd ..
bench build --app draped_dreams

echo "🔧 Step 5: Restarting services..."
bench restart

echo ""
echo "🎉 Server setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update config.ini with your actual site name"
echo "2. Update frontend/.env.production with your actual URLs"
echo "3. Test your API endpoints"
echo "4. Check CORS configuration"
echo ""
echo "🧪 Test your registration endpoint:"
echo "   https://$SITE_NAME/api/method/draped_dreams.api.auth.register_user"
echo ""
echo "🔍 Check CORS configuration:"
echo "   bench --site $SITE_NAME get-config cors_allow_origins"
