#!/bin/bash

echo "🚀 Draped Dreams - Simple Production Deployment"
echo "=============================================="

# Check current directory
echo "📍 Current directory: $(pwd)"
echo "📁 Contents:"
ls -la

echo ""
echo "🔍 Looking for frontend directory..."

if [ -d "frontend" ]; then
    echo "✅ Found frontend directory"
    
    echo "🔄 Step 1: Installing frontend dependencies..."
    cd frontend
    yarn install
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully"
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    
    echo "🔄 Step 2: Building frontend assets..."
    yarn build
    
    if [ $? -eq 0 ]; then
        echo "✅ Frontend assets built successfully"
    else
        echo "❌ Failed to build frontend assets"
        exit 1
    fi
    
    echo "🔄 Step 3: Copying assets to Frappe public directory..."
    yarn copy-assets
    
    if [ $? -eq 0 ]; then
        echo "✅ Assets copied to Frappe successfully"
    else
        echo "❌ Failed to copy assets to Frappe"
        exit 1
    fi
    
    echo "🔄 Step 4: Setting proper permissions..."
    chmod 644 /home/frappe/frappe-bench/sites/65.1.189.119/public/files/assets/* 2>/dev/null || true
    
    echo "🔄 Step 5: Restarting Frappe server..."
    cd ..
    bench restart
    
    if [ $? -eq 0 ]; then
        echo "✅ Frappe server restarted successfully"
    else
        echo "⚠️ Frappe restart may have failed, but continuing..."
    fi
    
    echo ""
    echo "🎉 Production deployment completed!"
    echo ""
    echo "🌐 Test your application at:"
    echo "   https://65.1.189.119/draped_dreams"
    echo ""
    echo "📊 Check if assets are accessible:"
    echo "   https://65.1.189.119/files/assets/index-c7d485ac.js"
    echo "   https://65.1.189.119/files/assets/index-e36060c2.css"
    
else
    echo "❌ Frontend directory not found!"
    echo "📁 Available directories:"
    ls -d */
    echo ""
    echo "Please make sure you're in the correct directory."
    echo "Expected structure:"
    echo "  draped_dreams/"
    echo "  ├── frontend/"
    echo "  ├── draped_dreams/"
    echo "  └── ..."
fi
