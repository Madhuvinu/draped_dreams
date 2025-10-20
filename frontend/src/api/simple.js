// Simplified API base class that works in both environments
import { API_CONFIG, ERROR_MESSAGES } from '../constants.js';

class SimpleAPI {
  constructor() {
    this.baseUrl = this.getBaseUrl();
    this.environment = this.getEnvironment();
    console.log('🌍 Environment:', this.environment);
    console.log('🔗 Base URL:', this.baseUrl);
  }

  getEnvironment() {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('localhost')) {
      return 'development';
    }
    return 'production';
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

  // Simple request method that works everywhere
  async makeRequest(url, options = {}) {
    try {
      const fullUrl = `${this.baseUrl}/api/method/${url}`;
      
      console.log('🚀 Making request to:', fullUrl);
      console.log('📦 Request options:', options);

      const response = await fetch(fullUrl, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...options.headers,
        },
        body: options.body,
        credentials: 'include',
      });

      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('❌ Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Success response:', result);
      return result;
    } catch (error) {
      console.error('❌ API Request Error:', error);
      throw error;
    }
  }

  handleResponse(result, successMessage = 'Success') {
    if (result.message && result.message.success) {
      return {
        success: true,
        message: result.message.message || successMessage,
        data: result.message.data
      };
    } else {
      return {
        success: false,
        message: result.message || 'An error occurred'
      };
    }
  }
}

export default SimpleAPI;
