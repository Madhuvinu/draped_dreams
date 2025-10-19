// Main API module - exports all API services
import authAPI from './auth.js';
import productsAPI from './products.js';
import dashboardAPI from './dashboard.js';

// Export all API services
export {
  authAPI,
  productsAPI,
  dashboardAPI,
};

// Default export with all APIs
export default {
  auth: authAPI,
  products: productsAPI,
  dashboard: dashboardAPI,
};


