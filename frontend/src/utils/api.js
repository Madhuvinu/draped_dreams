// API utility functions for connecting to Frappe backend
const API_BASE_URL = 'http://dreams.localhost:8002/api/method/draped_dreams.api.auth'

export const api = {
  // Registration
  async register(userData) {
    try {
      console.log('Sending registration request:', userData)
      
      // Frappe expects JSON data
      console.log('Sending JSON data:', userData)
      
      const response = await fetch(`${API_BASE_URL}.register_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      
      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)
      
      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText)
        return { success: false, message: `HTTP ${response.status}: ${response.statusText}` }
      }
      
      let result
      try {
        result = await response.json()
        console.log('Response data:', result)
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError)
        const textResponse = await response.text()
        console.log('Raw response:', textResponse)
        return { success: false, message: 'Invalid response format from server' }
      }
      
      if (result.message && result.message.success) {
        return { success: true, message: result.message.message }
      } else {
        return { success: false, message: result.message?.message || 'Registration failed' }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  },

  // Login
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}.login_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })
      
      const result = await response.json()
      
      if (result.message && result.message.success) {
        return { success: true, message: result.message.message, data: result.message.data }
      } else {
        return { success: false, message: result.message?.message || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  },

  // Get products
  async getProducts(filters = {}) {
    try {
      const params = new URLSearchParams()
      
      if (filters.category) params.append('category', filters.category)
      if (filters.search) params.append('search', filters.search)
      if (filters.price_range) params.append('price_range', filters.price_range)
      if (filters.sort_by) params.append('sort_by', filters.sort_by)
      if (filters.limit) params.append('limit', filters.limit)
      if (filters.offset) params.append('offset', filters.offset)
      
      const response = await fetch(`${API_BASE_URL}.get_products?${params}`)
      const result = await response.json()
      
      if (result.message && result.message.success) {
        return { success: true, data: result.message.data }
      } else {
        return { success: false, message: result.message?.message || 'Failed to fetch products' }
      }
    } catch (error) {
      console.error('Get products error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  },

  // Get product details
  async getProductDetails(productName) {
    try {
      const response = await fetch(`${API_BASE_URL}.get_product_details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_name: productName })
      })
      
      const result = await response.json()
      
      if (result.message && result.message.success) {
        return { success: true, data: result.message.data }
      } else {
        return { success: false, message: result.message?.message || 'Failed to fetch product details' }
      }
    } catch (error) {
      console.error('Get product details error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  },

  // Get categories
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}.get_categories`)
      const result = await response.json()
      
      if (result.message && result.message.success) {
        return { success: true, data: result.message.data }
      } else {
        return { success: false, message: result.message?.message || 'Failed to fetch categories' }
      }
    } catch (error) {
      console.error('Get categories error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  }
}
