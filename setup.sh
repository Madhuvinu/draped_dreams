#!/bin/bash
# Universal Setup Script for Draped Dreams
# This script handles configuration for different environments

echo "🚀 Draped Dreams Universal Setup"
echo "================================"

# Configuration
CONFIG_FILE="config.ini"
ENVIRONMENT=${1:-"default"}

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Configuration file $CONFIG_FILE not found!"
    echo "Please create the configuration file first."
    exit 1
fi

# Function to get config value
get_config() {
    local section=$1
    local key=$2
    python3 -c "
import configparser
config = configparser.ConfigParser()
config.read('$CONFIG_FILE')
print(config.get('$section', '$key', fallback=''))
"
}

# Get configuration values
SITE_NAME=$(get_config $ENVIRONMENT site_name)
API_BASE_URL=$(get_config $ENVIRONMENT api_base_url)
FRONTEND_URL=$(get_config $ENVIRONMENT frontend_url)
CORS_ORIGINS=$(get_config $ENVIRONMENT cors_origins)

echo "🔧 Environment: $ENVIRONMENT"
echo "📝 Site Name: $SITE_NAME"
echo "🌐 API Base URL: $API_BASE_URL"
echo "🎨 Frontend URL: $FRONTEND_URL"
echo "🔒 CORS Origins: $CORS_ORIGINS"
echo ""

# Set environment variables
export DRAPED_DREAMS_SITE_NAME="$SITE_NAME"
export DRAPED_DREAMS_ENV="$ENVIRONMENT"

# Check if we're in a Frappe bench directory
if [ ! -f "sites/common_site_config.json" ] && [ ! -d "sites" ]; then
    echo "❌ Error: This script must be run from a Frappe bench directory"
    echo "Please navigate to your Frappe bench directory and run this script again"
    exit 1
fi

echo "🔧 Setting up CORS configuration..."
bench --site $SITE_NAME set-config cors_allow_origins "$CORS_ORIGINS"
bench --site $SITE_NAME set-config cors_allow_methods "GET,POST,PUT,DELETE,OPTIONS"
bench --site $SITE_NAME set-config cors_allow_headers "Content-Type,Authorization,X-Requested-With,Accept,Origin"
bench --site $SITE_NAME set-config cors_allow_credentials true
bench --site $SITE_NAME set-config cors_max_age 86400

echo "✅ CORS configuration applied!"

echo "🔄 Restarting Frappe server..."
bench restart

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Configuration Summary:"
echo "  Environment: $ENVIRONMENT"
echo "  Site Name: $SITE_NAME"
echo "  API URL: $API_BASE_URL"
echo "  Frontend URL: $FRONTEND_URL"
echo "  CORS Origins: $CORS_ORIGINS"
echo ""
echo "🧪 Test your API endpoints now!"
echo "   Registration: $API_BASE_URL.register_user"
echo ""
echo "💡 To use different environments:"
echo "   ./setup.sh development"
echo "   ./setup.sh production"
echo "   ./setup.sh staging"
