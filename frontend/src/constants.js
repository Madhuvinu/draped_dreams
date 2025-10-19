// Application Constants
// Centralized configuration for the Draped Dreams application
console.log('CONSTANTS.JS LOADED - VERSION 2.0');

// Environment Detection - Completely dynamic, no hardcoded values
const getEnvironment = () => {
  console.log('Environment detection - hostname:', window.location.hostname);
  console.log('Environment detection - protocol:', window.location.protocol);
  console.log('Environment detection - port:', window.location.port);
  
  // Check if we're in development (localhost or local domains)
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' || 
      window.location.hostname.includes('localhost') ||
      window.location.hostname.includes('.local')) {
    console.log('Environment detected: development');
    return 'development';
  }
  
  // Check if we're in production (any non-local domain)
  if (window.location.hostname !== 'localhost' && 
      window.location.hostname !== '127.0.0.1' && 
      !window.location.hostname.includes('localhost') &&
      !window.location.hostname.includes('.local')) {
    console.log('Environment detected: production');
    return 'production';
  }
  
  // Default to development for any other local setup
  console.log('Environment detected: development (default)');
  return 'development';
};

// Dynamic API Configuration
export const API_CONFIG = {
  // Base URL configuration - dynamically detects environment
  getBaseUrl: () => {
    console.log('API_CONFIG.getBaseUrl called');
    
    // Priority 1: Environment variable (highest priority) - but ignore in development
    const env = getEnvironment();
    if (import.meta.env.VITE_API_BASE_URL && env !== 'development') {
      console.log('Using environment variable VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
      return import.meta.env.VITE_API_BASE_URL;
    }
    
    if (import.meta.env.VITE_API_BASE_URL && env === 'development') {
      console.log('Ignoring environment variable in development mode, using dynamic detection instead');
    }
    
    // Priority 2: Auto-detect based on current location - completely dynamic
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    console.log('Environment:', env);
    console.log('Protocol:', protocol);
    console.log('Hostname:', hostname);
    console.log('Port:', port);
    
    if (env === 'development') {
      // Development: Use current hostname with port 8000
      const url = `${protocol}//${hostname}:8000/api/method/draped_dreams.api.auth`;
      console.log('Using development URL:', url);
      return url;
    } else {
      // Production: Use current hostname with standard port
      const productionPort = port ? `:${port}` : '';
      const url = `${protocol}//${hostname}${productionPort}/api/method/draped_dreams.api.auth`;
      console.log('Using production URL:', url);
      return url;
    }
  },
  
  // Get base URL for dashboard endpoints - completely dynamic
  getDashboardBaseUrl: () => {
    const env = getEnvironment();
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    if (env === 'development') {
      return `${protocol}//${hostname}:8000`;
    } else {
      // Production: Use current hostname with standard port
      const productionPort = port ? `:${port}` : '';
      return `${protocol}//${hostname}${productionPort}`;
    }
  },
  
  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      REGISTER: '.register_user',
      LOGIN: '.login_user',
    },
    PRODUCTS: {
      LIST: '.get_products',
      DETAILS: '.get_product_details',
      CATEGORIES: '.get_categories',
    },
    DASHBOARD: {
      STATS: '/api/method/draped_dreams.api.dashboard.get_dashboard_stats',
      PRODUCTS: '/api/method/draped_dreams.api.dashboard.get_products',
      CUSTOMERS: '/api/method/draped_dreams.api.dashboard.get_customers',
      ORDERS: '/api/method/draped_dreams.api.dashboard.get_orders',
      INVENTORY: '/api/method/draped_dreams.api.dashboard.get_inventory',
    }
  },
  
  // Request Headers
  HEADERS: {
    FORM_DATA: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    JSON: {
      'Content-Type': 'application/json',
    }
  }
};

// Application Routes
export const ROUTES = {
  PUBLIC: {
    HOME: '/home',
    PRODUCTS: '/products',
    CART: '/cart',
    CHECKOUT: '/checkout',
    LOGIN: '/login',
    REGISTER: '/register',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/products',
    CUSTOMERS: '/admin/customers',
    ORDERS: '/admin/orders',
    INVENTORY: '/admin/inventory',
    REPORTS: '/admin/reports',
  }
};

// Product Configuration
export const PRODUCT_CONFIG = {
  CATEGORIES: [
    'All Categories',
    'Silk',
    'Cotton',
    'Designer',
    'Traditional',
    'Modern',
  ],
  
  PRICE_RANGES: [
    'All Prices',
    '0-5000',
    '5000-15000',
    '15000-30000',
    '30000+',
  ],
  
  SORT_OPTIONS: [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
  ],
  
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// Validation Rules
export const VALIDATION = {
  USER: {
    NAME_MIN_LENGTH: 2,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_MIN_LENGTH: 10,
    PASSWORD_MIN_LENGTH: 8,
  },
  
  PRODUCT: {
    NAME_MIN_LENGTH: 3,
    DESCRIPTION_MIN_LENGTH: 10,
    PRICE_MIN: 0,
    STOCK_MIN: 0,
  }
};

// UI Configuration
export const UI_CONFIG = {
  THEME: {
    PRIMARY_COLOR: 'purple',
    SECONDARY_COLOR: 'gray',
  },
  
  BREAKPOINTS: {
    MOBILE: '768px',
    TABLET: '1024px',
    DESKTOP: '1280px',
  },
  
  ANIMATION: {
    DURATION: {
      FAST: '150ms',
      NORMAL: '300ms',
      SLOW: '500ms',
    }
  }
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection and try again.',
  VALIDATION: {
    REQUIRED: 'This field is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    PHONE_INVALID: 'Please enter a valid phone number',
  },
  AUTH: {
    LOGIN_FAILED: 'Invalid email or password',
    REGISTRATION_FAILED: 'Registration failed. Please try again.',
    EMAIL_EXISTS: 'Email already registered',
    ACCOUNT_INACTIVE: 'Account is not active',
  },
  PRODUCTS: {
    FETCH_FAILED: 'Failed to fetch products',
    NOT_FOUND: 'Product not found',
  }
};

// Success Messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    REGISTRATION_SUCCESS: 'Registration successful! Please login.',
    LOGIN_SUCCESS: 'Login successful',
  },
  GENERAL: {
    SAVE_SUCCESS: 'Changes saved successfully',
    DELETE_SUCCESS: 'Item deleted successfully',
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_SESSION: 'draped_dreams_user_session',
  CART_ITEMS: 'draped_dreams_cart_items',
  USER_PREFERENCES: 'draped_dreams_user_preferences',
};

// Default Values
export const DEFAULTS = {
  USER: {
    ROLE: 'Customer',
    STATUS: 'Active',
  },
  PRODUCT: {
    STATUS: 'Active',
    FEATURED: false,
    RATING: 0,
    STOCK_QUANTITY: 0,
  },
  ORDER: {
    STATUS: 'Draft',
    PAYMENT_STATUS: 'Pending',
  }
};

