<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div 
      :class="[
        'bg-white shadow-lg transition-all duration-300 ease-in-out',
        isOpen ? 'w-64' : 'w-16',
        // Hide the sidebar entirely on very small screens when closed
        (!isOpen && isMobile) ? 'hidden sm:flex' : ''
      ]"
      class="flex flex-col"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <div v-if="isOpen" class="flex items-center space-x-2">
          <img src="/pwa-192x192.png" alt="Logo" class="w-8 h-8 rounded" />
          <span class="text-lg font-semibold text-gray-900">Draped Dreams</span>
        </div>
        <div v-else class="flex justify-center w-full">
          <img src="/pwa-192x192.png" alt="Logo" class="w-8 h-8 rounded" />
        </div>
        
        <!-- Toggle Button -->
        <button
          @click="toggleSidebar"
          class="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon :name="isOpen ? 'chevron-left' : 'chevron-right'" class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-4 py-4 space-y-2">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          :class="[
            'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
            $route.path === item.path 
              ? 'bg-purple-100 text-purple-700' 
              : 'text-gray-700 hover:bg-gray-100'
          ]"
        >
          <FeatherIcon :name="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="isOpen" class="ml-3">{{ item.name }}</span>
        </router-link>
      </nav>

      <!-- Filters Section (only on products page) -->
      <div v-if="isProductsPage && isOpen" class="px-4 py-4 border-t border-gray-200">
        <h3 class="text-sm font-medium text-gray-900 mb-4">Filters</h3>
        
        <!-- Search -->
        <div class="mb-4">
          <label class="block text-xs font-medium text-gray-700 mb-2">Search</label>
          <input
            v-model="filters.searchQuery"
            @input="emitFilters"
            type="text"
            placeholder="Search sarees..."
            class="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <!-- Category -->
        <div class="mb-4">
          <label class="block text-xs font-medium text-gray-700 mb-2">Category</label>
          <select
            v-model="filters.selectedCategory"
            @change="emitFilters"
            class="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="">All Categories</option>
            <option
              v-for="category in filters.categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Price Range -->
        <div class="mb-4">
          <label class="block text-xs font-medium text-gray-700 mb-2">Price Range</label>
          <select
            v-model="filters.priceRange"
            @change="emitFilters"
            class="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="">All Prices</option>
            <option value="0-5000">Under ₹5,000</option>
            <option value="5000-15000">₹5,000 - ₹15,000</option>
            <option value="15000-30000">₹15,000 - ₹30,000</option>
            <option value="30000+">Above ₹30,000</option>
          </select>
        </div>

        <!-- Sort By -->
        <div class="mb-4">
          <label class="block text-xs font-medium text-gray-700 mb-2">Sort By</label>
          <select
            v-model="filters.sortBy"
            @change="emitFilters"
            class="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        <!-- Clear Filters Button -->
        <button
          @click="clearFilters"
          class="w-full px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          Clear Filters
        </button>
      </div>

      <!-- User Info -->
      <div class="p-4 border-t border-gray-200">
        <div v-if="isOpen" class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <FeatherIcon name="user" class="w-4 h-4 text-purple-600" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ user?.name || 'Guest User' }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{ user?.email || 'guest@example.com' }}
            </p>
          </div>
        </div>
        <div v-else class="flex justify-center">
          <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <FeatherIcon name="user" class="w-4 h-4 text-purple-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Bar -->
      <div class="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 overflow-hidden">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3 sm:space-x-4">
            <!-- Mobile Menu Button (for mobile view) -->
            <button
              @click="toggleSidebar"
              class="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <FeatherIcon name="menu" class="w-5 h-5 text-gray-600" />
            </button>
            
            <h1 class="text-xl font-semibold text-gray-900">
              {{ currentPageTitle }}
            </h1>
          </div>
          
          <!-- Cart and User Actions -->
          <div class="flex items-center space-x-2 sm:space-x-4 flex-nowrap">
            <!-- Cart -->
            <router-link
              to="/cart"
              class="relative p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <FeatherIcon name="shopping-cart" class="w-5 h-5 text-gray-600" />
              <span
                v-if="cartItems.length > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartItems.length }}
              </span>
            </router-link>
            
            <!-- User Menu -->
            <div class="relative hidden sm:block">
              <button
                @click="toggleUserMenu"
                class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <FeatherIcon name="user" class="w-4 h-4 text-purple-600" />
                </div>
                <FeatherIcon name="chevron-down" class="w-4 h-4 text-gray-600" />
              </button>
              
              <!-- User Dropdown -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
              >
                <div class="py-1">
                  <router-link
                    to="/profile"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FeatherIcon name="user" class="w-4 h-4 mr-3" />
                    Profile
                  </router-link>
                  <router-link
                    to="/orders"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FeatherIcon name="package" class="w-4 h-4 mr-3" />
                    Orders
                  </router-link>
                  <button
                    @click="logout"
                    class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FeatherIcon name="log-out" class="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { sessionStore } from '@/stores/session';
import FeatherIcon from '@/components/FeatherIcon.vue';

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();
const session = sessionStore();

// State
const isOpen = ref(true);
const isMobile = ref(false);
const showUserMenu = ref(false);

// Filters state
const filters = ref({
  searchQuery: '',
  selectedCategory: '',
  priceRange: '',
  sortBy: 'featured',
  categories: []
});

// Computed
const cartItems = computed(() => cartStore.items);
const user = computed(() => session.user);
const isProductsPage = computed(() => route.path === '/products');

const currentPageTitle = computed(() => {
  const titles = {
    '/': 'Dashboard',
    '/products': 'Products',
    '/cart': 'Shopping Cart',
    '/checkout': 'Checkout',
    '/orders': 'Order History',
    '/profile': 'Profile',
    '/login': 'Login',
    '/register': 'Register',
    '/admin/products': 'Admin - Products',
    '/admin/orders': 'Admin - Orders',
    '/admin/customers': 'Admin - Customers',
    '/admin/inventory': 'Admin - Inventory',
    '/admin/reports': 'Admin - Reports'
  };
  return titles[route.path] || 'Draped Dreams';
});

// Menu items
const menuItems = [
  { name: 'Dashboard', path: '/', icon: 'home' },
  { name: 'Products', path: '/products', icon: 'star' },
  { name: 'Cart', path: '/cart', icon: 'shopping-cart' },
  { name: 'Orders', path: '/orders', icon: 'star' },
  { name: 'Profile', path: '/profile', icon: 'user' },
  { name: 'Admin', path: '/admin/products', icon: 'star' }
];

// Methods
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
  localStorage.setItem('sidebar-open', isOpen.value.toString());
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const logout = () => {
  session.logout();
  router.push('/login');
  showUserMenu.value = false;
};

// Filter methods
const emitFilters = () => {
  // Emit filter changes to parent component
  const filterData = {
    searchQuery: filters.value.searchQuery,
    selectedCategory: filters.value.selectedCategory,
    priceRange: filters.value.priceRange,
    sortBy: filters.value.sortBy
  };
  
  // Use a custom event to communicate with the Products page
  window.dispatchEvent(new CustomEvent('sidebar-filters-changed', {
    detail: filterData
  }));
};

const clearFilters = () => {
  filters.value.searchQuery = '';
  filters.value.selectedCategory = '';
  filters.value.priceRange = '';
  filters.value.sortBy = 'featured';
  emitFilters();
};

// Load categories when on products page
const loadCategories = async () => {
  if (isProductsPage.value) {
    try {
      // Import productsAPI dynamically to avoid circular dependencies
      const { default: productsAPI } = await import('@/api/products.js');
      const response = await productsAPI.getCategories();
      filters.value.categories = response.data || [];
    } catch (err) {
      console.error('Error loading categories:', err);
      filters.value.categories = ['Cotton', 'Silk', 'Designer']; // Fallback
    }
  }
};

// Close user menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false;
  }
};

// Watch for route changes to load categories
watch(() => route.path, () => {
  if (isProductsPage.value) {
    loadCategories();
  }
}, { immediate: true });

// Lifecycle
onMounted(() => {
  // Check session status
  session.checkSession();
  
  // Restore sidebar state from localStorage
  const savedState = localStorage.getItem('sidebar-open');
  if (savedState !== null) {
    isOpen.value = savedState === 'true';
  }
  // Collapse by default on small screens for better mobile UX
  isMobile.value = window.innerWidth < 640;
  if (isMobile.value) {
    isOpen.value = false;
  }
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside);
  
  // Load categories if on products page
  if (isProductsPage.value) {
    loadCategories();
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
