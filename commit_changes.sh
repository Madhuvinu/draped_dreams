#!/bin/bash
# Quick Git Commit Script for Draped Dreams
# This script commits all the new configuration files

echo "📝 Committing Draped Dreams Configuration Files"
echo "=============================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

echo "🔍 Checking git status..."
git status

echo ""
echo "📦 Adding new configuration files..."

# Add configuration files
git add config.ini
git add config_manager.py
git add setup.sh
git add setup_cors.sh
git add server_setup.sh
git add CORS_CONFIGURATION.md
git add ENVIRONMENT_CONFIGURATION.md
git add DEPLOYMENT_GUIDE.md
git add frontend/env.development.example
git add frontend/env.production.example

# Add modified files
git add draped_dreams/api/auth.py
git add draped_dreams/hooks.py
git add frontend/src/utils/api.js
git add setup.py
git add .gitignore

echo "✅ Files added to staging area"

echo ""
echo "📝 Committing changes..."
git commit -m "Add environment-aware configuration and CORS fixes

- Add config.ini for environment-specific settings
- Add config_manager.py for configuration management
- Add setup.sh for universal environment setup
- Add CORS configuration scripts
- Update API URLs to be environment-aware
- Add deployment guides and documentation
- Remove hardcoded dreams.localhost references"

echo ""
echo "🚀 Ready to push to git!"
echo ""
echo "To push to your repository:"
echo "git push origin dev_branch"
echo ""
echo "To push to main branch:"
echo "git push origin main"
