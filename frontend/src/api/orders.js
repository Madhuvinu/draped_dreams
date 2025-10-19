// Orders API
import { API_CONFIG } from '../constants.js'
import BaseAPI from './base.js'

class OrdersAPI extends BaseAPI {
  constructor() {
    super()
    this.baseUrl = API_CONFIG.getBaseUrl()
  }

  // Place a new order
  async placeOrder(orderData) {
    try {
      const url = `${API_CONFIG.getDashboardBaseUrl()}/api/method/draped_dreams.api.orders.place_order`
      const result = await this.makeRequest(url, {
        method: 'POST',
        body: JSON.stringify(orderData)
      })
      return result
    } catch (error) {
      console.error('Place order error:', error)
      return {
        success: false,
        message: 'Failed to place order'
      }
    }
  }

  // Get user orders
  async getUserOrders(customerEmail) {
    try {
      const url = `${API_CONFIG.getDashboardBaseUrl()}/api/method/draped_dreams.api.orders.get_user_orders`
      const result = await this.makeRequest(`${url}?customer_email=${encodeURIComponent(customerEmail)}`)
      return result
    } catch (error) {
      console.error('Get user orders error:', error)
      return {
        success: false,
        message: 'Failed to fetch orders'
      }
    }
  }

  // Get order details
  async getOrderDetails(orderId) {
    try {
      const url = `${API_CONFIG.getDashboardBaseUrl()}/api/method/draped_dreams.api.orders.get_order_details`
      const result = await this.makeRequest(`${url}?order_id=${encodeURIComponent(orderId)}`)
      return result
    } catch (error) {
      console.error('Get order details error:', error)
      return {
        success: false,
        message: 'Failed to fetch order details'
      }
    }
  }

  // Update order status (admin only)
  async updateOrderStatus(orderId, status) {
    try {
      const url = `${API_CONFIG.getDashboardBaseUrl()}/api/method/draped_dreams.api.orders.update_order_status`
      const result = await this.makeRequest(url, {
        method: 'POST',
        body: JSON.stringify({
          order_id: orderId,
          status: status
        })
      })
      return result
    } catch (error) {
      console.error('Update order status error:', error)
      return {
        success: false,
        message: 'Failed to update order status'
      }
    }
  }
}

export const orderAPI = new OrdersAPI()
