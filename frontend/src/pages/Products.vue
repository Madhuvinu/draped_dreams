<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <div class="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <FeatherIcon name="shopping-bag" class="text-white" />
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Draped Dreams</h1>
          </div>
          <div class="flex items-center space-x-4">
            <Button variant="ghost" size="sm" @click="$router.push('/cart')">
              <FeatherIcon name="shopping-cart" class="w-5 h-5 mr-2" />
              Cart ({{ cartItems.length }})
            </Button>
            <Button variant="ghost" size="sm" @click="$router.push('/login')">
              <FeatherIcon name="user" class="w-5 h-5 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-8">
        <Button variant="ghost" size="sm" @click="$router.push('/')">
          <FeatherIcon name="home" class="w-4 h-4 mr-2" />
          Home
        </Button>
        <span class="mx-2 text-gray-400">/</span>
        <span class="text-gray-600">Products</span>
      </nav>

      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <TextInput
              v-model="searchQuery"
              placeholder="Search sarees..."
              @input="filterProducts"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select v-model="selectedCategory" @change="filterProducts" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select v-model="priceRange" @change="filterProducts" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">All Prices</option>
              <option value="0-5000">Under ₹5,000</option>
              <option value="5000-15000">₹5,000 - ₹15,000</option>
              <option value="15000-30000">₹15,000 - ₹30,000</option>
              <option value="30000+">Above ₹30,000</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select v-model="sortBy" @change="filterProducts" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <p class="mt-2 text-gray-600">Loading products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <FeatherIcon name="alert-circle" class="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Error loading products</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <Button @click="loadProducts">Try Again</Button>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="saree in filteredSarees" 
          :key="saree.id"
          class="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          @click="$router.push(`/product/${saree.id}`)"
        >
          <div class="aspect-w-16 aspect-h-12 bg-gradient-to-br from-purple-100 to-pink-100 h-64 flex items-center justify-center relative">
            <!-- Product Image -->
            <img 
              v-if="saree.image" 
              :src="saree.image" 
              :alt="saree.product_name"
              class="w-full h-full object-cover"
            />
            <!-- Placeholder if no image -->
            <FeatherIcon v-else name="image" class="w-16 h-16 text-purple-400" />
            
            <div class="absolute top-2 right-2">
              <Badge :variant="getStockVariant(saree.stock)">
                {{ saree.stock }} left
              </Badge>
            </div>
            <div class="absolute top-2 left-2">
              <Badge variant="secondary" class="text-xs">
                {{ saree.category }}
              </Badge>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2">{{ saree.name }}</h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ saree.description }}</p>
            
            <div class="flex items-center justify-between mb-3">
              <div>
                <span class="text-lg font-bold text-purple-600">₹{{ saree.price.toLocaleString() }}</span>
                <span v-if="saree.originalPrice" class="text-sm text-gray-500 line-through ml-2">
                  ₹{{ saree.originalPrice.toLocaleString() }}
                </span>
              </div>
              <div class="flex items-center">
                <div class="flex text-yellow-400">
                  <FeatherIcon v-for="i in 5" :key="i" name="star" class="w-3 h-3 fill-current" />
                </div>
                <span class="text-xs text-gray-500 ml-1">({{ saree.rating }})</span>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm" 
                @click.stop="addToCart(saree)"
                :disabled="saree.stock === 0"
              >
                <FeatherIcon name="plus" class="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                @click.stop="toggleWishlist(saree)"
              >
                <FeatherIcon :name="isInWishlist(saree.id) ? 'heart' : 'heart'" 
                  :class="isInWishlist(saree.id) ? 'text-red-500 fill-current' : 'text-gray-400'" 
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredSarees.length === 0" class="text-center py-12">
        <FeatherIcon name="search" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No sarees found</h3>
        <p class="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
        <Button @click="clearFilters">Clear Filters</Button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '../utils/api'
import TextInput from '../components/TextInput.vue'
import Button from '../components/Button.vue'
import FeatherIcon from '../components/FeatherIcon.vue'
import Badge from '../components/Badge.vue'

const cartItems = ref([])
const wishlistItems = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')
const priceRange = ref('')
const sortBy = ref('featured')
const loading = ref(false)
const error = ref('')

const categories = ref(['Silk', 'Cotton', 'Designer', 'Wedding', 'Casual', 'Party'])
const allSarees = ref([])

const filteredSarees = computed(() => {
  let filtered = [...allSarees.value]

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(saree => 
      saree.product_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      saree.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(saree => saree.category === selectedCategory.value)
  }

  // Price filter
  if (priceRange.value) {
    filtered = filtered.filter(saree => {
      const price = saree.price
      switch (priceRange.value) {
        case '0-5000': return price < 5000
        case '5000-15000': return price >= 5000 && price <= 15000
        case '15000-30000': return price >= 15000 && price <= 30000
        case '30000+': return price > 30000
        default: return true
      }
    })
  }

  // Sort
  switch (sortBy.value) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
      break
    case 'popular':
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    case 'featured':
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return (b.rating || 0) - (a.rating || 0)
      })
      break
  }

  return filtered
})

const getStockVariant = (stock) => {
  if (stock === 0) return 'danger'
  if (stock <= 5) return 'warning'
  return 'success'
}

const addToCart = (saree) => {
  cartItems.value.push(saree)
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
  console.log('Added to cart:', saree.product_name)
}

const toggleWishlist = (saree) => {
  const index = wishlistItems.value.findIndex(item => item.name === saree.name)
  if (index > -1) {
    wishlistItems.value.splice(index, 1)
  } else {
    wishlistItems.value.push(saree)
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value))
}

const isInWishlist = (sareeName) => {
  return wishlistItems.value.some(item => item.name === sareeName)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  priceRange.value = ''
  sortBy.value = 'featured'
}

const filterProducts = () => {
  // This will trigger the computed property
}

const loadProducts = async () => {
  loading.value = true
  error.value = ''
  
  try {
    console.log('Loading products with filters:', {
      category: selectedCategory.value,
      search: searchQuery.value,
      price_range: priceRange.value,
      sort_by: sortBy.value,
      limit: 50
    })
    
    const result = await api.getProducts({
      category: selectedCategory.value,
      search: searchQuery.value,
      price_range: priceRange.value,
      sort_by: sortBy.value,
      limit: 50
    })
    
    console.log('API result:', result)
    
    if (result.success) {
      console.log('Raw products data:', result.data)
      allSarees.value = result.data.map(product => ({
        id: product.name,
        name: product.product_name,
        product_name: product.product_name,
        description: product.description,
        price: product.price,
        originalPrice: product.original_price,
        category: product.category,
        stock: product.stock_quantity,
        rating: product.rating || 0,
        featured: product.featured,
        image: product.product_image,
        gallery_images: product.gallery_images || []
      }))
      console.log('Processed products:', allSarees.value)
    } else {
      error.value = result.message
      console.error('API error:', result.message)
    }
  } catch (err) {
    error.value = 'Failed to load products'
    console.error('Load products error:', err)
  } finally {
    loading.value = false
  }
}

const loadCategories = async () => {
  try {
    console.log('Loading categories...')
    const result = await api.getCategories()
    console.log('Categories API result:', result)
    if (result.success) {
      categories.value = result.data
      console.log('Loaded categories:', categories.value)
    }
  } catch (err) {
    console.error('Load categories error:', err)
  }
}

onMounted(async () => {
  console.log('Products page mounted, initializing...')
  
  // Load cart and wishlist from localStorage
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  }
  
  const savedWishlist = localStorage.getItem('wishlist')
  if (savedWishlist) {
    wishlistItems.value = JSON.parse(savedWishlist)
  }
  
  console.log('Initial state:', {
    selectedCategory: selectedCategory.value,
    searchQuery: searchQuery.value,
    priceRange: priceRange.value,
    sortBy: sortBy.value
  })
  
  // Load products and categories from backend
  await Promise.all([
    loadProducts(),
    loadCategories()
  ])
  
  console.log('Initialization complete. Products loaded:', allSarees.value.length)
})
</script>