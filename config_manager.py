#!/usr/bin/env python3
"""
Configuration Manager for Draped Dreams
Handles environment-specific configuration
"""

import configparser
import os
import sys

class ConfigManager:
    def __init__(self, config_file="config.ini"):
        self.config_file = config_file
        self.config = configparser.ConfigParser()
        self.load_config()
    
    def load_config(self):
        """Load configuration from file"""
        if os.path.exists(self.config_file):
            self.config.read(self.config_file)
        else:
            print(f"❌ Configuration file {self.config_file} not found!")
            sys.exit(1)
    
    def get_environment(self):
        """Get current environment from environment variable"""
        return os.getenv('DRAPED_DREAMS_ENV', 'default')
    
    def get_site_name(self):
        """Get site name for current environment"""
        env = self.get_environment()
        return self.config.get(env, 'site_name', fallback=self.config.get('default', 'site_name'))
    
    def get_api_base_url(self):
        """Get API base URL for current environment"""
        env = self.get_environment()
        return self.config.get(env, 'api_base_url', fallback=self.config.get('default', 'api_base_url'))
    
    def get_frontend_url(self):
        """Get frontend URL for current environment"""
        env = self.get_environment()
        return self.config.get(env, 'frontend_url', fallback=self.config.get('default', 'frontend_url'))
    
    def get_cors_origins(self):
        """Get CORS origins for current environment"""
        env = self.get_environment()
        return self.config.get(env, 'cors_origins', fallback=self.config.get('default', 'cors_origins'))
    
    def print_config(self):
        """Print current configuration"""
        env = self.get_environment()
        print(f"🔧 Current Environment: {env}")
        print(f"📝 Site Name: {self.get_site_name()}")
        print(f"🌐 API Base URL: {self.get_api_base_url()}")
        print(f"🎨 Frontend URL: {self.get_frontend_url()}")
        print(f"🔒 CORS Origins: {self.get_cors_origins()}")

def main():
    """Main function to test configuration"""
    config = ConfigManager()
    config.print_config()

if __name__ == "__main__":
    main()
