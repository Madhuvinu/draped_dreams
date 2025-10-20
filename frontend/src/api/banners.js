// Banners API
import BaseAPI from './base.js';
import { API_CONFIG, ERROR_MESSAGES } from '../constants.js';

class BannersAPI extends BaseAPI {
  // Get all active banners
  async getBanners() {
    try {
      const url = `${API_CONFIG.ENDPOINTS.BANNERS.LIST}`;
      const result = await this.makeRequest(url);
      
      return this.handleResponse(result);
    } catch (error) {
      console.error('Get banners error:', error);
      return { success: false, message: ERROR_MESSAGES.BANNERS.FETCH_FAILED };
    }
  }

  // Get banner by ID
  async getBanner(bannerId) {
    try {
      if (!bannerId) {
        return { success: false, message: 'Banner ID is required' };
      }

      const url = `${API_CONFIG.ENDPOINTS.BANNERS.DETAIL}`;
      
      const result = await this.makeRequest(url, {
        method: 'POST',
        body: JSON.stringify({ banner_id: bannerId }),
      });

      return this.handleResponse(result);
    } catch (error) {
      console.error('Get banner error:', error);
      return { success: false, message: ERROR_MESSAGES.BANNERS.NOT_FOUND };
    }
  }
}

export default new BannersAPI();
