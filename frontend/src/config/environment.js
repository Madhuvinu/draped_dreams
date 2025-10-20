// Environment-specific API configuration
const API_CONFIG = {
  // Development configuration
  development: {
    baseUrl: 'http://dreams.localhost:8000',
    useCSRF: true,
    credentials: 'include'
  },
  
  // Production configuration  
  production: {
    baseUrl: 'https://65.1.189.119',
    useCSRF: false, // Disable CSRF for production
    credentials: 'include'
  }
};

// Auto-detect environment
const getEnvironment = () => {
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('localhost')) {
    return 'development';
  }
  return 'production';
};

// Get current config
const currentConfig = API_CONFIG[getEnvironment()];
console.log('🌍 Environment:', getEnvironment());
console.log('⚙️ Config:', currentConfig);
