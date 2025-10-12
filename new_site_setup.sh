#!/bin/bash
# New Site Setup Script for Draped Dreams
# Use this when creating a completely new site

echo "🆕 Draped Dreams - New Site Setup"
echo "=================================="

# Get site name from user
if [ -z "$1" ]; then
    echo "❌ Please provide the site name"
    echo "Usage: ./new_site_setup.sh your-new-site-name"
    exit 1
fi

SITE_NAME=$1
echo "📝 Setting up site: $SITE_NAME"
echo ""

# Check if we're in a Frappe bench directory
if [ ! -f "sites/common_site_config.json" ] && [ ! -d "sites" ]; then
    echo "❌ Error: This script must be run from a Frappe bench directory"
    echo "Expected structure: bench/"
    exit 1
fi

echo "🔧 Step 1: Creating new site..."
# Create new site (you'll need to provide admin password)
bench new-site $SITE_NAME --admin-password admin

echo "🔧 Step 2: Installing draped_dreams app..."
bench --site $SITE_NAME install-app draped_dreams

echo "🔧 Step 3: Setting up environment configuration..."
# Navigate to app directory
cd apps/draped_dreams

# Set environment variables
export DRAPED_DREAMS_SITE_NAME="$SITE_NAME"
export DRAPED_DREAMS_ENV="production"

echo "🔧 Step 4: Configuring CORS..."
./setup.sh production

echo "🔧 Step 5: Building frontend..."
cd frontend

# Copy environment file
cp env.production.example .env.production

# Update .env.production with actual site name
sed -i "s/your-production-site.com/$SITE_NAME/g" .env.production

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Build frontend
echo "🏗️  Building frontend..."
npm run build

cd ..

echo "🔧 Step 6: Building Frappe assets..."
# Go back to bench directory
cd ..
bench build --app draped_dreams

echo "🔧 Step 7: Restarting services..."
bench restart

echo ""
echo "🎉 New site setup completed!"
echo ""
echo "📋 Site Information:"
echo "  Site Name: $SITE_NAME"
echo "  Admin Password: admin"
echo "  Frappe Desk: http://$SITE_NAME:8002"
echo "  Frontend: http://$SITE_NAME:8002/draped_dreams"
echo ""
echo "🧪 Test your API:"
echo "  Registration: http://$SITE_NAME:8002/api/method/draped_dreams.api.auth.register_user"
echo ""
echo "🔍 Check CORS configuration:"
echo "  bench --site $SITE_NAME get-config cors_allow_origins"
echo ""
echo "💡 Next steps:"
echo "1. Update config.ini with your actual domain (if using custom domain)"
echo "2. Test registration functionality"
echo "3. Set up SSL certificate if needed"
echo "4. Configure DNS to point to your server"
