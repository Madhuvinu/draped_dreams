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
    // Get the clean base URL without any API paths
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      this.baseUrl = `${protocol}//${hostname}:8000`;
    } else {
      this.baseUrl = `${protocol}//${hostname}${port ? ':' + port : ''}`;
    }
    
    this.csrfToken = null;
  }

  // Fetch CSRF token from server
  async fetchCSRFToken() {
    try {
      const response = await fetch(`${this.baseUrl}/api/method/draped_dreams.api.auth.get_csrf_token`, {
        method: 'GET',
        credentials: 'include'
      });
      const result = await response.json();
      console.log('CSRF token response:', result);
      if (result.message && result.message.success && result.message.csrf_token) {
        this.csrfToken = result.message.csrf_token;
        console.log('CSRF token set:', this.csrfToken);
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

      // Only add CSRF token if we have one and we're not in production
      const isProduction = window.location.hostname !== 'localhost' && 
                           window.location.hostname !== '127.0.0.1' && 
                           !window.location.hostname.includes('localhost');
      
      if (csrfToken && !isProduction) {
        headers['X-Frappe-CSRF-Token'] = csrfToken;
        console.log('🔐 CSRF token added for development');
      } else if (isProduction) {
        console.log('🌐 Production mode - CSRF token disabled for testing');
      }

      // Construct the full URL properly
      let fullUrl;
      if (url.startsWith('/api/method/')) {
        // If URL already starts with /api/method/, use it as is
        fullUrl = `${this.baseUrl}${url}`;
      } else {
        // If URL doesn't start with /api/method/, add it
        fullUrl = `${this.baseUrl}/api/method/${url}`;
      }

      console.log('Making API request to:', fullUrl);
      console.log('Request options:', {
        method: options.method || 'GET',
        headers,
        body: options.body,
        credentials: 'include'
      });
      const response = await fetch(fullUrl, {
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
          const retryResponse = await fetch(fullUrl, {
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
            const errorText = await response.text();
            console.log('❌ Server Error Response:', errorText);
            console.log('❌ Response Status:', response.status);
            console.log('❌ Response Headers:', response.headers);
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


