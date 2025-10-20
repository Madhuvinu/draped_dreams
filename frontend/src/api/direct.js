// Direct fetch approach - bypasses all complexity
class DirectAPI {
  constructor() {
    this.baseUrl = this.getBaseUrl();
  }

  getBaseUrl() {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:8000`;
    } else {
      return `${protocol}//${hostname}${port ? ':' + port : ''}`;
    }
  }

  // Get CSRF token from Frappe's built-in endpoint
  async getCSRFToken() {
    try {
      const response = await fetch(`${this.baseUrl}/api/method/frappe.sessions.get_csrf_token`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.message || null;
      }
      return null;
    } catch (error) {
      console.log('Could not get CSRF token:', error);
      return null;
    }
  }

  // Generic makeRequest method for API calls
  async makeRequest(url, options = {}) {
    try {
      console.log('Making API request to:', url);
      console.log('Request options:', options);
      
      // For guest endpoints, try without CSRF token first
      let headers = { ...options.headers };
      
      // Try to get CSRF token for POST requests
      if (options.method === 'POST') {
        try {
          const csrfToken = await this.getCSRFToken();
          if (csrfToken) {
            headers['X-Frappe-CSRF-Token'] = csrfToken;
            console.log('CSRF token added:', csrfToken);
          }
        } catch (error) {
          console.log('Could not get CSRF token, proceeding without it:', error);
        }
      }
      
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('❌ Error response:', errorText);
        
        // If CSRF error, try without CSRF token
        if (response.status === 400 && errorText.includes('CSRFTokenError')) {
          console.log('🔄 CSRF error detected, retrying without CSRF token...');
          const retryResponse = await fetch(url, {
            ...options,
            headers: options.headers, // Use original headers without CSRF token
            credentials: 'include',
          });
          
          if (retryResponse.ok) {
            const result = await retryResponse.json();
            console.log('✅ API response (retry):', result);
            return result;
          }
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ API response:', result);
      
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Handle API response and format it properly
  handleResponse(result, successMessage) {
    console.log('Response result:', result);
    
    return {
      success: result.message?.success || false,
      message: result.message?.message || successMessage,
      data: result.message?.data || null
    };
  }

  // Direct registration - no CSRF, no complex headers
  async register(userData) {
    try {
      const formData = new URLSearchParams();
      Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
      });

      const url = `${this.baseUrl}/api/method/draped_dreams.api.auth.register_user`;
      
      console.log('🚀 Direct registration to:', url);
      console.log('📦 Form data:', formData.toString());

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
        credentials: 'include',
      });

      console.log('📊 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('❌ Error:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Success:', result);
      
      return {
        success: result.message?.success || false,
        message: result.message?.message || 'Registration completed',
        data: result.message?.data
      };
    } catch (error) {
      console.error('❌ Registration error:', error);
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    }
  }

  // Direct login
  async login(email, password) {
    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

      const url = `${this.baseUrl}/api/method/draped_dreams.api.auth.login_user`;
      
      console.log('🚀 Direct login to:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
        credentials: 'include',
      });

      const result = await response.json();
      
      return {
        success: result.message?.success || false,
        message: result.message?.message || 'Login completed',
        data: result.message?.data
      };
    } catch (error) {
      console.error('❌ Login error:', error);
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    }
  }
}

export default DirectAPI;
