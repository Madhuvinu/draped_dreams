// Authentication API
import BaseAPI from './base.js';
import { API_CONFIG, VALIDATION, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants.js';

class AuthAPI extends BaseAPI {
  // Register a new user
  async register(userData) {
    try {
      // Validate input
      const validation = this.validateRegistrationData(userData);
      if (!validation.isValid) {
        return { success: false, message: validation.message };
      }

      // Prepare form data
      const formData = new URLSearchParams();
      Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
      });

      const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: API_CONFIG.HEADERS.FORM_DATA,
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const result = await response.json();
      return this.handleResponse(result, SUCCESS_MESSAGES.AUTH.REGISTRATION_SUCCESS);
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: ERROR_MESSAGES.NETWORK };
    }
  }

  // Login user
  async login(email, password) {
    try {
      // Validate input
      const validation = this.validateLoginData(email, password);
      if (!validation.isValid) {
        return { success: false, message: validation.message };
      }

      // Prepare form data
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

      const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: API_CONFIG.HEADERS.FORM_DATA,
        body: formData,
        credentials: 'include',
      });

      const result = await response.json();
      return this.handleResponse(result, SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS);
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: ERROR_MESSAGES.NETWORK };
    }
  }

  // Validate registration data
  validateRegistrationData(data) {
    const { first_name, last_name, email, phone, password, confirm_password } = data;

    if (!all([first_name, last_name, email, phone, password, confirm_password])) {
      return { isValid: false, message: ERROR_MESSAGES.VALIDATION.REQUIRED };
    }

    if (first_name.length < VALIDATION.USER.NAME_MIN_LENGTH || 
        last_name.length < VALIDATION.USER.NAME_MIN_LENGTH) {
      return { isValid: false, message: 'Name must be at least 2 characters' };
    }

    if (!VALIDATION.USER.EMAIL_REGEX.test(email)) {
      return { isValid: false, message: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID };
    }

    if (phone.length < VALIDATION.USER.PHONE_MIN_LENGTH) {
      return { isValid: false, message: ERROR_MESSAGES.VALIDATION.PHONE_INVALID };
    }

    if (password.length < VALIDATION.USER.PASSWORD_MIN_LENGTH) {
      return { isValid: false, message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT };
    }

    if (password !== confirm_password) {
      return { isValid: false, message: ERROR_MESSAGES.VALIDATION.PASSWORDS_DONT_MATCH };
    }

    return { isValid: true };
  }

  // Validate login data
  validateLoginData(email, password) {
    if (!email || !password) {
      return { isValid: false, message: 'Email and password are required' };
    }

    if (!VALIDATION.USER.EMAIL_REGEX.test(email)) {
      return { isValid: false, message: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID };
    }

    if (password.length < VALIDATION.USER.PASSWORD_MIN_LENGTH) {
      return { isValid: false, message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT };
    }

    return { isValid: true };
  }
}

// Helper function to check if all values exist
function all(values) {
  return values.every(value => value && value.toString().trim() !== '');
}

export default new AuthAPI();


