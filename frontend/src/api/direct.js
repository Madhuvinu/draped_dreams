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
