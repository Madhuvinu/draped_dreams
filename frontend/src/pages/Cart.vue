<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <div class="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span class="text-white text-lg">🛍️</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Draped Dreams</h1>
          </div>
          <div class="flex items-center space-x-4">
            <Button variant="ghost" size="sm" @click="$router.push('/products')">
              <FeatherIcon name="shopping-bag" class="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
            
            <!-- Show different options based on login status -->
            <template v-if="isLoggedIn">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">Welcome, {{ userData.first_name || userData.email }}!</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  @click="handleLogout"
                  class="text-gray-700 hover:bg-gray-100"
                >
                  <FeatherIcon name="log-out" class="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </template>
            
            <template v-else>
              <Button 
                variant="outline" 
                size="sm" 
                @click="$router.push('/register')"
                class="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <FeatherIcon name="user-plus" class="w-4 h-4 mr-2" />
                Register
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                @click="$router.push('/login')"
                class="text-gray-700 hover:bg-gray-100"
              >
                <FeatherIcon name="user" class="w-4 h-4 mr-2" />
                Login
              </Button>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Title -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Shopping Cart</h2>
        <p class="text-gray-600 mt-2">Review your items and proceed to checkout</p>
      </div>

      <!-- Authentication Check -->
      <div v-if="!isLoggedIn" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FeatherIcon name="lock" class="w-8 h-8 text-yellow-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h3>
          <p class="text-gray-600 mb-6">Please login or register to access your cart and place orders.</p>
          <div class="flex space-x-4 justify-center">
            <Button 
              @click="$router.push('/login')"
              class="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <FeatherIcon name="user" class="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button 
              @click="$router.push('/register')"
              variant="outline"
              class="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              <FeatherIcon name="user-plus" class="w-4 h-4 mr-2" />
              Register
            </Button>
          </div>
        </div>
      </div>

      <!-- Cart Content -->
      <div v-else>
        <!-- Empty Cart -->
        <div v-if="cartItems.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FeatherIcon name="shopping-cart" class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p class="text-gray-600 mb-6">Add some products to get started!</p>
          <Button 
            @click="$router.push('/products')"
            class="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <FeatherIcon name="shopping-bag" class="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <!-- Cart Items -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Cart Items List -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm border">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Cart Items ({{ cartItems.length }})</h3>
                
                <div class="space-y-4">
                  <div 
                    v-for="item in cartItems" 
                    :key="item.product_id"
                    class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <!-- Product Image -->
                    <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FeatherIcon name="image" class="w-8 h-8 text-gray-400" />
                    </div>
                    
                    <!-- Product Details -->
                    <div class="flex-1">
                      <h4 class="font-medium text-gray-900">{{ item.product_name }}</h4>
                      <p class="text-sm text-gray-600">{{ item.category }}</p>
                      <p class="text-sm font-medium text-purple-600">₹{{ item.price }}</p>
                    </div>
                    
                    <!-- Quantity Controls -->
                    <div class="flex items-center space-x-2">
                      <Button 
                        @click="updateQuantity(item.product_id, item.quantity - 1)"
                        :disabled="item.quantity <= 1"
                        size="sm"
                        variant="outline"
                        class="w-8 h-8 p-0"
                      >
                        <FeatherIcon name="minus" class="w-4 h-4" />
                      </Button>
                      <span class="w-12 text-center font-medium">{{ item.quantity }}</span>
                      <Button 
                        @click="updateQuantity(item.product_id, item.quantity + 1)"
                        :disabled="item.quantity >= item.stock_quantity"
                        size="sm"
                        variant="outline"
                        class="w-8 h-8 p-0"
                      >
                        <FeatherIcon name="plus" class="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <!-- Item Total -->
                    <div class="text-right">
                      <p class="font-medium text-gray-900">₹{{ ((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)).toFixed(2) }}</p>
                    </div>
                    
                    <!-- Remove Button -->
                    <Button 
                      @click="removeFromCart(item.product_id)"
                      size="sm"
                      variant="ghost"
                      class="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <FeatherIcon name="trash-2" class="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm border sticky top-24">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="font-medium">₹{{ subtotal.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Shipping</span>
                    <span class="font-medium">₹{{ shipping.toFixed(2) }}</span>
                  </div>
                  <div class="border-t pt-3">
                    <div class="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{{ total.toFixed(2) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Checkout Form -->
                <form @submit.prevent="placeOrder" class="mt-6 space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                    <textarea
                      v-model="shippingAddress"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your shipping address"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select
                      v-model="paymentMethod"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="Cash on Delivery">Cash on Delivery</option>
                      <option value="Online Payment">Online Payment</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                    <textarea
                      v-model="notes"
                      rows="2"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Any special instructions?"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    :disabled="isPlacingOrder"
                    class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                  >
                    <FeatherIcon v-if="!isPlacingOrder" name="check-circle" class="w-4 h-4 mr-2" />
                    <span v-if="isPlacingOrder">Placing Order...</span>
                    <span v-else>Place Order (₹{{ total.toFixed(2) }})</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import FeatherIcon from '@/components/FeatherIcon.vue'
import { orderAPI } from '@/api/orders.js'

const router = useRouter()

// Reactive data
const isLoggedIn = ref(false)
const userData = ref({})
const cartItems = ref([])
const isPlacingOrder = ref(false)
const shippingAddress = ref('')
const paymentMethod = ref('Cash on Delivery')
const notes = ref('')

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    const price = parseFloat(item.price) || 0
    const quantity = parseInt(item.quantity) || 0
    return total + (price * quantity)
  }, 0)
})

const shipping = computed(() => {
  return subtotal.value > 1000 ? 0 : 50 // Free shipping over ₹1000
})

const total = computed(() => {
  return subtotal.value + shipping.value
})

// Methods
const checkLoginStatus = () => {
  const user = localStorage.getItem('user')
  const loggedIn = localStorage.getItem('isLoggedIn')
  
  if (user && loggedIn === 'true') {
    isLoggedIn.value = true
    userData.value = JSON.parse(user)
    loadCartItems()
  } else {
    isLoggedIn.value = false
    userData.value = {}
  }
}

const loadCartItems = () => {
  const cart = localStorage.getItem('cart')
  if (cart) {
    const parsedCart = JSON.parse(cart)
    // Ensure all values are properly typed
    cartItems.value = parsedCart.map(item => ({
      ...item,
      price: parseFloat(item.price) || 0,
      quantity: parseInt(item.quantity) || 1,
      stock_quantity: parseInt(item.stock_quantity) || 0
    }))
  }
}

const updateQuantity = (productId, newQuantity) => {
  const quantity = parseInt(newQuantity)
  if (quantity < 1) return
  
  const item = cartItems.value.find(item => item.product_id === productId)
  if (item) {
    const stockQuantity = parseInt(item.stock_quantity) || 0
    if (quantity > stockQuantity) {
      alert(`Only ${stockQuantity} items available in stock`)
      return
    }
    
    item.quantity = quantity
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }
}

const removeFromCart = (productId) => {
  cartItems.value = cartItems.value.filter(item => item.product_id !== productId)
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('cart')
  isLoggedIn.value = false
  userData.value = {}
  cartItems.value = []
  router.push('/products')
}

const placeOrder = async () => {
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }

  if (cartItems.value.length === 0) {
    alert('Your cart is empty')
    return
  }

  if (!shippingAddress.value.trim()) {
    alert('Please enter your shipping address')
    return
  }

  isPlacingOrder.value = true

  try {
    const orderData = {
      customer_email: userData.value.email,
      order_items: cartItems.value.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.price
      })),
      total_amount: total.value,
      shipping_address: shippingAddress.value,
      billing_address: shippingAddress.value, // Same as shipping for now
      payment_method: paymentMethod.value,
      notes: notes.value
    }

    const result = await orderAPI.placeOrder(orderData)
    
    if (result.message && result.message.success) {
      // Clear cart
      localStorage.removeItem('cart')
      cartItems.value = []
      
      // Show success message
      alert(`Order placed successfully! Order ID: ${result.message.order_id}`)
      
      // Redirect to products page
      router.push('/products')
    } else {
      alert(`Error: ${result.message ? result.message.message : 'Failed to place order'}`)
    }
  } catch (error) {
    console.error('Error placing order:', error)
    alert('Error placing order. Please try again.')
  } finally {
    isPlacingOrder.value = false
  }
}

// Lifecycle
onMounted(() => {
  checkLoginStatus()
})
</script>