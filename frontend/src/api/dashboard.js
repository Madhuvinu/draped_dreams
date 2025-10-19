// Dashboard API
import BaseAPI from './base.js';
import { API_CONFIG, ERROR_MESSAGES } from '../constants.js';

class DashboardAPI extends BaseAPI {
  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const url = `${API_CONFIG.getDashboardBaseUrl()}${API_CONFIG.ENDPOINTS.DASHBOARD.STATS}`;
      const result = await this.makeRequest(url);
      
      return this.handleResponse(result);
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      return { success: false, message: 'Failed to fetch dashboard statistics' };
    }
  }

  // Get products for admin
  async getProducts(filters = {}) {
    try {
      const params = new URLSearchParams();

      // Add filters to params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const url = `${API_CONFIG.getDashboardBaseUrl()}${API_CONFIG.ENDPOINTS.DASHBOARD.PRODUCTS}?${params}`;
      const result = await this.makeRequest(url);
      
      return this.handleResponse(result);
    } catch (error) {
      console.error('Get products error:', error);
      return { success: false, message: ERROR_MESSAGES.PRODUCTS.FETCH_FAILED };
    }
  }

  // Get customers
  async getCustomers(filters = {}) {
    try {
      const params = new URLSearchParams();

      // Add filters to params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const url = `${API_CONFIG.getDashboardBaseUrl()}${API_CONFIG.ENDPOINTS.DASHBOARD.CUSTOMERS}?${params}`;
      const result = await this.makeRequest(url);
      
      return this.handleResponse(result);
    } catch (error) {
      console.error('Get customers error:', error);
      return { success: false, message: 'Failed to fetch customers' };
    }
  }

  // Get orders
  async getOrders(filters = {}) {
    try {
      const params = new URLSearchParams();

      // Add filters to params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const url = `${API_CONFIG.getDashboardBaseUrl()}${API_CONFIG.ENDPOINTS.DASHBOARD.ORDERS}?${params}`;
      const result = await this.makeRequest(url);
      
      return this.handleResponse(result);
    } catch (error) {
      console.error('Get orders error:', error);
      return { success: false, message: 'Failed to fetch orders' };
    }
  }

  // Get inventory
  async getInventory(filters = {}) {
    try {
      const params = new URLSearchParams();

      // Add filters to params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const url = `${API_CONFIG.getDashboardBaseUrl()}${API_CONFIG.ENDPOINTS.DASHBOARD.INVENTORY}?${params}`;
      const result = await this.makeRequest(url);
      
      return this.handleResponse(result);
    } catch (error) {
      console.error('Get inventory error:', error);
      return { success: false, message: 'Failed to fetch inventory' };
    }
  }

  // Create new product
  async createProduct(productData) {
    try {
      const url = `${API_CONFIG.getDashboardBaseUrl()}/api/method/draped_dreams.api.products.create_product`;
      
      const result = await this.makeRequest(url, {
        method: 'POST',
        body: JSON.stringify(productData),
      });

      return this.handleResponse(result);
    } catch (error) {
      console.error('Create product error:', error);
      return { success: false, message: 'Failed to create product' };
    }
  }

  // Update product
  async updateProduct(productId, productData) {
    try {
      const url = `${API_CONFIG.getDashboardBaseUrl()}/api/method/draped_dreams.api.products.update_product`;
      
      const result = await this.makeRequest(url, {
        method: 'POST',
        body: JSON.stringify({
          product_id: productId,
          ...productData
        }),
      });

      return this.handleResponse(result);
    } catch (error) {
      console.error('Update product error:', error);
      return { success: false, message: 'Failed to update product' };
    }
  }

  // Delete product
  async deleteProduct(productId) {
    try {
      const url = `${API_CONFIG.getDashboardBaseUrl()}/api/method/draped_dreams.api.products.delete_product`;
      
      const result = await this.makeRequest(url, {
        method: 'POST',
        body: JSON.stringify({ product_id: productId }),
      });

      return this.handleResponse(result);
    } catch (error) {
      console.error('Delete product error:', error);
      return { success: false, message: 'Failed to delete product' };
    }
  }
}

export default new DashboardAPI();