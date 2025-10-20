// Products API
import BaseAPI from './base.js';
import { API_CONFIG, ERROR_MESSAGES } from '../constants.js';

class ProductsAPI extends BaseAPI {
  // Get products with filters
  async getProducts(filters = {}) {
    try {
      const params = new URLSearchParams();

      // Add filters to params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const url = `${API_CONFIG.ENDPOINTS.PRODUCTS.LIST}?${params}`;
      const result = await this.makeRequest(url);
      
      return this.handleResponse(result);
    } catch (error) {
      console.error('Get products error:', error);
      return { success: false, message: ERROR_MESSAGES.PRODUCTS.FETCH_FAILED };
    }
  }

  // Get product details by name
  async getProductDetails(productName) {
    try {
      if (!productName) {
        return { success: false, message: 'Product name is required' };
      }

      const url = `${API_CONFIG.ENDPOINTS.PRODUCTS.DETAILS}`;
      
      const result = await this.makeRequest(url, {
        method: 'POST',
        body: JSON.stringify({ product_name: productName }),
      });

      return this.handleResponse(result);
    } catch (error) {
      console.error('Get product details error:', error);
      return { success: false, message: ERROR_MESSAGES.PRODUCTS.NOT_FOUND };
    }
  }

  // Get product categories
  async getCategories() {
    try {
      const url = `${API_CONFIG.ENDPOINTS.PRODUCTS.CATEGORIES}`;
      const result = await this.makeRequest(url);
      
      return this.handleResponse(result);
    } catch (error) {
      console.error('Get categories error:', error);
      return { success: false, message: 'Failed to fetch categories' };
    }
  }

  // Search products
  async searchProducts(query, filters = {}) {
    try {
      if (!query || query.trim().length < 2) {
        return { success: false, message: 'Search query must be at least 2 characters' };
      }

      const searchFilters = {
        ...filters,
        search: query.trim(),
      };

      return await this.getProducts(searchFilters);
    } catch (error) {
      console.error('Search products error:', error);
      return { success: false, message: 'Search failed' };
    }
  }

  // Get featured products
  async getFeaturedProducts(limit = 8) {
    try {
      const filters = {
        featured: true,
        limit: limit,
      };

      return await this.getProducts(filters);
    } catch (error) {
      console.error('Get featured products error:', error);
      return { success: false, message: 'Failed to fetch featured products' };
    }
  }

  // Get products by category
  async getProductsByCategory(category, limit = 20) {
    try {
      if (!category || category === 'All Categories') {
        return await this.getProducts({ limit });
      }

      const filters = {
        category: category,
        limit: limit,
      };

      return await this.getProducts(filters);
    } catch (error) {
      console.error('Get products by category error:', error);
      return { success: false, message: 'Failed to fetch products by category' };
    }
  }
}

export default new ProductsAPI();


