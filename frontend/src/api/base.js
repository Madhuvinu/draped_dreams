// API Base Configuration
import { API_CONFIG } from '../constants.js';

// Get CSRF token from meta tag or cookies
const getCSRFToken = () => {
  // First try to get from meta tag
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (metaTag) {
    return metaTag.getAttribute('content');
  }
  
  // Fallback to cookies
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrf_token') {
      return value;
    }
  }
  return null;
};

// Base API class with common functionality
class BaseAPI {
  constructor() {
    this.baseUrl = API_CONFIG.getBaseUrl();
    this.csrfToken = null;
  }

  // Fetch CSRF token from server
  async fetchCSRFToken() {
    try {
      const response = await fetch(`${API_CONFIG.getDashboardBaseUrl()}/api/method/draped_dreams.api.auth.get_csrf_token`, {
        method: 'GET',
        credentials: 'include'
      });
      const result = await response.json();
      if (result.message && result.message.success) {
        this.csrfToken = result.message.csrf_token;
        return this.csrfToken;
      }
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
    return null;
  }

  // Make HTTP request with common error handling
  async makeRequest(url, options = {}) {
    try {
      // Get CSRF token (from cache or fetch if needed)
      let csrfToken = this.csrfToken || getCSRFToken();
      
      // If no CSRF token available, fetch it
      if (!csrfToken) {
        csrfToken = await this.fetchCSRFToken();
      }
      
      const headers = {
        ...API_CONFIG.HEADERS.JSON,
        ...options.headers,
      };

      if (csrfToken) {
        headers['X-Frappe-CSRF-Token'] = csrfToken;
      }

      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });

      // If 400 error and we have a CSRF token, try fetching a new one and retry
      if (!response.ok && response.status === 400 && csrfToken) {
        console.log('CSRF token may have expired, fetching new one...');
        this.csrfToken = null; // Clear cached token
        csrfToken = await this.fetchCSRFToken();
        
        if (csrfToken) {
          headers['X-Frappe-CSRF-Token'] = csrfToken;
          const retryResponse = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
          });
          
          if (retryResponse.ok) {
            const result = await retryResponse.json();
            return result;
          }
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Handle API response
  handleResponse(result, successMessage = 'Operation successful') {
    if (result.message && result.message.success) {
      return {
        success: true,
        message: result.message.message || successMessage,
        data: result.message.data,
      };
    } else {
      return {
        success: false,
        message: result.message?.message || 'Operation failed',
      };
    }
  }
}

export default BaseAPI;


