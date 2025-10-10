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
            <h1 class="text-2xl font-bold text-gray-900">Draped Dreams Admin</h1>
          </div>
          <div class="flex items-center space-x-4">
            <Button variant="ghost" size="sm" @click="$router.push('/home')">
              <FeatherIcon name="home" class="w-5 h-5 mr-2" />
              View Store
            </Button>
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 font-medium">
                A
              </div>
              <span class="text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Product Management</h2>
          <p class="text-gray-600">Manage your saree inventory</p>
        </div>
        <Button @click="showAddProductModal = true">
          <FeatherIcon name="plus" class="w-5 h-5 mr-2" />
          Add New Product
        </Button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <FeatherIcon name="shopping-bag" class="w-6 h-6" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Products</p>
              <p class="text-2xl font-bold text-gray-900">{{ products.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <FeatherIcon name="check-circle" class="w-6 h-6" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">In Stock</p>
              <p class="text-2xl font-bold text-gray-900">{{ inStockCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FeatherIcon name="alert-triangle" class="w-6 h-6" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Low Stock</p>
              <p class="text-2xl font-bold text-gray-900">{{ lowStockCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-red-100 text-red-600">
              <FeatherIcon name="x-circle" class="w-6 h-6" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Out of Stock</p>
              <p class="text-2xl font-bold text-gray-900">{{ outOfStockCount }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">All Products</h3>
            <div class="flex items-center space-x-4">
              <TextInput
                v-model="searchQuery"
                placeholder="Search products..."
                class="w-64"
              />
              <select v-model="selectedCategory" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="product in filteredProducts" :key="product.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FeatherIcon name="image" class="w-6 h-6 text-purple-400" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                        <div class="text-sm text-gray-500">{{ product.description }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary">{{ product.category }}</Badge>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">₹{{ product.price }}</div>
                    <div v-if="product.originalPrice" class="text-xs text-gray-500 line-through">
                      ₹{{ product.originalPrice }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ product.stock }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <Badge :variant="getStockVariant(product.stock)">
                      {{ getStockStatus(product.stock) }}
                    </Badge>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" @click="editProduct(product)">
                        <FeatherIcon name="edit" class="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" @click="deleteProduct(product.id)">
                        <FeatherIcon name="trash-2" class="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Product Modal -->
    <div v-if="showAddProductModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Product</h3>
          
          <form @submit.prevent="addProduct" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <TextInput v-model="newProduct.name" placeholder="Enter product name" required />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <TextInput v-model="newProduct.description" placeholder="Enter product description" required />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <TextInput v-model="newProduct.price" placeholder="Enter price" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                <TextInput v-model="newProduct.originalPrice" placeholder="Enter original price" />
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select v-model="newProduct.category" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" required>
                  <option value="">Select Category</option>
                  <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                <TextInput v-model="newProduct.stock" type="number" placeholder="Enter stock quantity" required />
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
              <Button variant="outline" @click="showAddProductModal = false">
                Cancel
              </Button>
              <Button type="submit">
                Add Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const products = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')
const showAddProductModal = ref(false)

const categories = ref(['Silk', 'Cotton', 'Designer', 'Wedding', 'Casual', 'Party'])

const newProduct = ref({
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  category: '',
  stock: ''
})

const filteredProducts = computed(() => {
  let filtered = [...products.value]

  if (searchQuery.value) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  return filtered
})

const inStockCount = computed(() => {
  return products.value.filter(p => p.stock > 10).length
})

const lowStockCount = computed(() => {
  return products.value.filter(p => p.stock > 0 && p.stock <= 10).length
})

const outOfStockCount = computed(() => {
  return products.value.filter(p => p.stock === 0).length
})

const getStockVariant = (stock) => {
  if (stock === 0) return 'danger'
  if (stock <= 10) return 'warning'
  return 'success'
}

const getStockStatus = (stock) => {
  if (stock === 0) return 'Out of Stock'
  if (stock <= 10) return 'Low Stock'
  return 'In Stock'
}

const addProduct = () => {
  const product = {
    id: Date.now(),
    name: newProduct.value.name,
    description: newProduct.value.description,
    price: newProduct.value.price,
    originalPrice: newProduct.value.originalPrice,
    category: newProduct.value.category,
    stock: parseInt(newProduct.value.stock),
    rating: 4.5
  }

  products.value.push(product)
  
  // Reset form
  newProduct.value = {
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: ''
  }
  
  showAddProductModal.value = false
}

const editProduct = (product) => {
  console.log('Edit product:', product.name)
  // TODO: Implement edit functionality
}

const deleteProduct = (productId) => {
  if (confirm('Are you sure you want to delete this product?')) {
    const index = products.value.findIndex(p => p.id === productId)
    if (index > -1) {
      products.value.splice(index, 1)
    }
  }
}

onMounted(() => {
  // Load sample products
  products.value = [
    {
      id: 1,
      name: 'Elegant Silk Banarasi Saree',
      description: 'Beautiful silk saree with intricate Banarasi work',
      price: '25,000',
      originalPrice: '30,000',
      category: 'Silk',
      stock: 8,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Comfortable Cotton Handloom Saree',
      description: 'Light and breathable cotton saree',
      price: '3,500',
      category: 'Cotton',
      stock: 25,
      rating: 4.5
    },
    {
      id: 3,
      name: 'Modern Designer Party Saree',
      description: 'Contemporary designer saree',
      price: '18,000',
      originalPrice: '22,000',
      category: 'Designer',
      stock: 4,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Wedding Silk Saree',
      description: 'Heavy silk saree for weddings',
      price: '45,000',
      category: 'Wedding',
      stock: 0,
      rating: 4.7
    }
  ]
})
</script>
