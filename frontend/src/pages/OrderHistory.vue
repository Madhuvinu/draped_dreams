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
              Products
            </Button>
            <Button variant="ghost" size="sm" @click="$router.push('/cart')">
              <FeatherIcon name="shopping-cart" class="w-5 h-5 mr-2" />
              Cart ({{ cartItems.length }})
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
                  <FeatherIcon name="user" class="w-4 h-4 mr-2" />
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
        <h2 class="text-3xl font-bold text-gray-900">Order History</h2>
        <p class="text-gray-600 mt-2">View all your past orders</p>
      </div>

      <!-- Authentication Check -->
      <div v-if="!isLoggedIn" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FeatherIcon name="lock" class="w-8 h-8 text-yellow-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h3>
          <p class="text-gray-600 mb-6">Please login to view your order history.</p>
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

      <!-- Loading State -->
      <div v-else-if="loading" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FeatherIcon name="check-circle" class="w-8 h-8 text-gray-400 animate-spin" />
        </div>
        <p class="text-gray-600">Loading your orders...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FeatherIcon name="alert-circle" class="w-8 h-8 text-red-600" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Error Loading Orders</h3>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <Button @click="loadOrders" class="bg-purple-600 hover:bg-purple-700 text-white">
          Try Again
        </Button>
      </div>

      <!-- Empty State -->
      <div v-else-if="orders.length === 0" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FeatherIcon name="package" class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
        <p class="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping!</p>
        <Button 
          @click="$router.push('/products')"
          class="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <FeatherIcon name="shopping-bag" class="w-4 h-4 mr-2" />
          Start Shopping
        </Button>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div 
          v-for="order in orders" 
          :key="order.order_id"
          class="bg-white rounded-lg shadow-sm border"
        >
          <!-- Order Header -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Order #{{ order.order_id }}</h3>
                <p class="text-sm text-gray-600">
                  Placed on {{ formatDate(order.order_date) }}
                </p>
              </div>
              <div class="text-right">
                <Badge :variant="getStatusVariant(order.status)">
                  {{ order.status }}
                </Badge>
                <p class="text-lg font-semibold text-gray-900 mt-1">
                  ₹{{ order.total_amount.toFixed(2) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="p-6">
            <h4 class="text-sm font-medium text-gray-900 mb-4">Order Items</h4>
            <div class="space-y-3">
              <div 
                v-for="item in order.items" 
                :key="item.product_id"
                class="flex items-center space-x-4"
              >
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FeatherIcon name="image" class="w-6 h-6 text-gray-400" />
                </div>
                <div class="flex-1">
                  <h5 class="font-medium text-gray-900">{{ item.product_name }}</h5>
                  <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900">₹{{ (item.rate || item.price || 0).toFixed(2) }}</p>
                  <p class="text-sm text-gray-600">Total: ₹{{ (item.amount || item.total_price || 0).toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Details -->
          <div class="px-6 pb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div v-if="order.shipping_address">
                <h5 class="font-medium text-gray-900 mb-1">Shipping Address</h5>
                <p class="text-gray-600">{{ order.shipping_address }}</p>
              </div>
              <div>
                <h5 class="font-medium text-gray-900 mb-1">Payment Method</h5>
                <p class="text-gray-600">{{ order.payment_method }}</p>
              </div>
            </div>
            <div v-if="order.notes" class="mt-4">
              <h5 class="font-medium text-gray-900 mb-1">Notes</h5>
              <p class="text-gray-600">{{ order.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import FeatherIcon from '@/components/FeatherIcon.vue'
import Badge from '@/components/Badge.vue'
import { orderAPI } from '@/api/orders.js'

const router = useRouter()

// Reactive data
const isLoggedIn = ref(false)
const userData = ref({})
const cartItems = ref([])
const orders = ref([])
const loading = ref(false)
const error = ref('')

// Methods
const checkLoginStatus = () => {
  const user = localStorage.getItem('user')
  const loggedIn = localStorage.getItem('isLoggedIn')
  
  if (user && loggedIn === 'true') {
    isLoggedIn.value = true
    userData.value = JSON.parse(user)
    loadOrders()
  } else {
    isLoggedIn.value = false
    userData.value = {}
  }
}

const loadCartItems = () => {
  const cart = localStorage.getItem('cart')
  if (cart) {
    cartItems.value = JSON.parse(cart)
  }
}

const loadOrders = async () => {
  if (!isLoggedIn.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    const result = await orderAPI.getUserOrders(userData.value.email)
    console.log('Order API result:', result)
    
    if (result.message && result.message.success) {
      orders.value = result.message.data
    } else {
      error.value = result.message ? result.message.message : 'Failed to load orders'
    }
  } catch (err) {
    console.error('Error loading orders:', err)
    error.value = 'Failed to load orders'
  } finally {
    loading.value = false
  }
}

const handleLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('cart')
  isLoggedIn.value = false
  userData.value = {}
  cartItems.value = []
  orders.value = []
  router.push('/products')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusVariant = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning'
    case 'confirmed':
    case 'processing':
      return 'info'
    case 'shipped':
      return 'success'
    case 'delivered':
      return 'success'
    case 'cancelled':
      return 'danger'
    default:
      return 'default'
  }
}

// Lifecycle
onMounted(() => {
  checkLoginStatus()
  loadCartItems()
})
</script>
