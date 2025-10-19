#!/bin/bash

echo "🚀 Draped Dreams - Production Server Deployment"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the draped_dreams app root directory"
    exit 1
fi

echo "📋 Running production deployment steps..."

# Step 1: Install/update dependencies
echo "🔄 Step 1: Installing frontend dependencies..."
cd frontend
yarn install

if [ $? -eq 0 ]; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Step 2: Build frontend assets
echo "🔄 Step 2: Building frontend assets..."
yarn build

if [ $? -eq 0 ]; then
    print_status "Frontend assets built successfully"
else
    print_error "Failed to build frontend assets"
    exit 1
fi

# Step 3: Copy assets to Frappe public directory
echo "🔄 Step 3: Copying assets to Frappe public directory..."
yarn copy-assets

if [ $? -eq 0 ]; then
    print_status "Assets copied to Frappe successfully"
else
    print_error "Failed to copy assets to Frappe"
    exit 1
fi

# Step 4: Set proper permissions
echo "🔄 Step 4: Setting proper permissions..."
chmod 644 /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/* 2>/dev/null || true

# Step 5: Restart Frappe server
echo "🔄 Step 5: Restarting Frappe server..."
bench restart

if [ $? -eq 0 ]; then
    print_status "Frappe server restarted successfully"
else
    print_warning "Frappe restart may have failed, but continuing..."
fi

echo ""
print_status "🎉 Production deployment completed!"
echo ""
echo "🌐 Test your application at:"
echo "   https://65.1.189.119/draped_dreams"
echo ""
echo "📊 Check if assets are accessible:"
echo "   https://65.1.189.119/files/assets/index-c7d485ac.js"
echo "   https://65.1.189.119/files/assets/index-e36060c2.css"
echo ""

print_warning "If you still get 500 errors:"
echo "1. Check Frappe logs: bench --site 65.1.189.119 logs"
echo "2. Verify assets exist: ls -la /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/"
echo "3. Check permissions: ls -la /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/"
