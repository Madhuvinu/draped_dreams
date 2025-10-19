#!/bin/bash

echo "🚀 Draped Dreams - Complete Production Deployment"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
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

echo "📋 Deployment Steps:"
echo "1. Push code to git"
echo "2. Pull on production server"
echo "3. Build frontend assets"
echo "4. Copy assets to Frappe"
echo "5. Restart server"
echo ""

# Step 1: Push to git
echo "🔄 Step 1: Pushing code to git..."
git add .
git commit -m "Deploy Draped Dreams to production - $(date)"
git push

if [ $? -eq 0 ]; then
    print_status "Code pushed to git successfully"
else
    print_error "Failed to push to git"
    exit 1
fi

echo ""
echo "📋 Next steps to run on your production server:"
echo "=============================================="
echo ""
echo "1. SSH into your production server:"
echo "   ssh root@65.1.189.119"
echo ""
echo "2. Navigate to your app directory:"
echo "   cd /path/to/your/draped_dreams/app"
echo ""
echo "3. Pull the latest code:"
echo "   git pull"
echo ""
echo "4. Build and deploy frontend assets:"
echo "   cd frontend"
echo "   yarn install"
echo "   yarn build"
echo "   yarn copy-assets"
echo ""
echo "5. Restart Frappe server:"
echo "   bench restart"
echo ""
echo "6. Test your application:"
echo "   Visit: https://65.1.189.119/draped_dreams"
echo ""

print_warning "Important Notes:"
echo "• The frontend/dist/ folder is not tracked by git (it's in .gitignore)"
echo "• You MUST run 'yarn build' on the production server after git pull"
echo "• The 'yarn copy-assets' command will copy assets to the correct Frappe directory"
echo "• Without building assets, you'll get 500 errors on the frontend"

echo ""
print_status "Deployment guide ready! Follow the steps above."
