#!/bin/bash

# CORS Configuration Script for Local Development
# This script configures CORS for the dreams.localhost site

echo "🔧 Configuring CORS for local development..."

# Set CORS configuration for dreams.localhost site
bench --site dreams.localhost set-config cors_allow_origins "*"
bench --site dreams.localhost set-config cors_allow_methods "GET,POST,PUT,DELETE,OPTIONS"
bench --site dreams.localhost set-config cors_allow_headers "Content-Type,Authorization,X-Requested-With,Accept,Origin"
bench --site dreams.localhost set-config cors_allow_credentials true
bench --site dreams.localhost set-config cors_max_age 86400

echo "✅ CORS configuration completed!"
echo ""
echo "🔄 Restarting Frappe server to apply changes..."
bench restart

echo ""
echo "🎉 Setup complete! Your local development environment is now ready."
echo "📝 Frontend URL: http://dreams.localhost:8002/draped_dreams"
echo "🔗 API URL: http://dreams.localhost:8002/api/method/draped_dreams.api.auth"
echo ""
echo "💡 You can now test the registration form!"
