#!/bin/bash
# CORS Configuration Script for Draped Dreams
# This script applies CORS configuration at the site level

echo "🔧 Configuring CORS for Draped Dreams..."

# Check if we're in a Frappe bench directory
if [ ! -f "sites/common_site_config.json" ] && [ ! -d "sites" ]; then
    echo "❌ Error: This script must be run from a Frappe bench directory"
    echo "Please navigate to your Frappe bench directory and run this script again"
    exit 1
fi

# Get site name from environment variable, command line argument, or use default
SITE_NAME=${1:-${DRAPED_DREAMS_SITE_NAME:-"dreams.localhost"}}

echo "📝 Applying CORS configuration to site: $SITE_NAME"

# Apply CORS configuration using bench commands
echo "Setting CORS allow origins..."
bench --site $SITE_NAME set-config cors_allow_origins "*"

echo "Setting CORS allow methods..."
bench --site $SITE_NAME set-config cors_allow_methods "GET,POST,PUT,DELETE,OPTIONS"

echo "Setting CORS allow headers..."
bench --site $SITE_NAME set-config cors_allow_headers "Content-Type,Authorization,X-Requested-With,Accept,Origin"

echo "Setting CORS allow credentials..."
bench --site $SITE_NAME set-config cors_allow_credentials true

echo "Setting CORS max age..."
bench --site $SITE_NAME set-config cors_max_age 86400

echo "✅ CORS configuration applied successfully!"
echo ""
echo "🔄 Restarting Frappe server..."
bench restart

echo ""
echo "🎉 CORS configuration completed!"
echo ""
echo "Your API endpoints should now accept cross-origin requests from:"
echo "- https://65.1.189.119 (your frontend domain)"
echo "- Any other domain (currently set to '*')"
echo ""
echo "⚠️  Security Note: For production, consider restricting cors_allow_origins to specific domains"
echo "   Run: bench --site $SITE_NAME set-config cors_allow_origins 'https://yourdomain.com'"
echo ""
echo "🧪 Test your registration endpoint now!"
