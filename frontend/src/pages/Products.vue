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

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="saree in filteredSarees" 
          :key="saree.id"
          class="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          @click="$router.push(`/product/${saree.id}`)"
        >
          <div class="aspect-w-16 aspect-h-12 bg-gradient-to-br from-purple-100 to-pink-100 h-64 flex items-center justify-center relative">
            <FeatherIcon name="image" class="w-16 h-16 text-purple-400" />
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
                <span class="text-lg font-bold text-purple-600">₹{{ saree.price }}</span>
                <span v-if="saree.originalPrice" class="text-sm text-gray-500 line-through ml-2">
                  ₹{{ saree.originalPrice }}
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

const cartItems = ref([])
const wishlistItems = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')
const priceRange = ref('')
const sortBy = ref('featured')

const categories = ref(['Silk', 'Cotton', 'Designer', 'Wedding', 'Casual', 'Party'])

const allSarees = ref([
  {
    id: 1,
    name: 'Elegant Silk Banarasi Saree',
    description: 'Beautiful silk saree with intricate Banarasi work and golden zari borders',
    price: '25,000',
    originalPrice: '30,000',
    category: 'Silk',
    stock: 8,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Comfortable Cotton Handloom Saree',
    description: 'Light and breathable cotton saree perfect for daily wear',
    price: '3,500',
    category: 'Cotton',
    stock: 25,
    rating: 4.5
  },
  {
    id: 3,
    name: 'Modern Designer Party Saree',
    description: 'Contemporary designer saree with unique patterns',
    price: '18,000',
    originalPrice: '22,000',
    category: 'Designer',
    stock: 4,
    rating: 4.9
  },
  {
    id: 4,
    name: 'Wedding Silk Saree',
    description: 'Heavy silk saree with extensive embroidery perfect for weddings',
    price: '45,000',
    category: 'Wedding',
    stock: 3,
    rating: 4.7
  },
  {
    id: 5,
    name: 'Casual Cotton Saree',
    description: 'Light and comfortable cotton saree for casual occasions',
    price: '2,500',
    category: 'Casual',
    stock: 60,
    rating: 4.3
  },
  {
    id: 6,
    name: 'Printed Silk Saree',
    description: 'Beautiful printed silk saree with floral patterns',
    price: '12,000',
    category: 'Silk',
    stock: 0,
    rating: 4.6
  }
])

const filteredSarees = computed(() => {
  let filtered = [...allSarees.value]

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(saree => 
      saree.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
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
      const price = parseInt(saree.price.replace(/,/g, ''))
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
      filtered.sort((a, b) => parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, '')))
      break
    case 'price-high':
      filtered.sort((a, b) => parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, '')))
      break
    case 'newest':
      filtered.sort((a, b) => b.id - a.id)
      break
    case 'popular':
      filtered.sort((a, b) => b.rating - a.rating)
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
  console.log('Added to cart:', saree.name)
}

const toggleWishlist = (saree) => {
  const index = wishlistItems.value.findIndex(item => item.id === saree.id)
  if (index > -1) {
    wishlistItems.value.splice(index, 1)
  } else {
    wishlistItems.value.push(saree)
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value))
}

const isInWishlist = (sareeId) => {
  return wishlistItems.value.some(item => item.id === sareeId)
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

onMounted(() => {
  // Load cart and wishlist from localStorage
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  }
  
  const savedWishlist = localStorage.getItem('wishlist')
  if (savedWishlist) {
    wishlistItems.value = JSON.parse(savedWishlist)
  }
})
</script>