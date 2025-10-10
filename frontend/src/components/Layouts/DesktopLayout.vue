<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Desktop Layout -->
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div class="w-64 bg-white shadow-lg">
        <div class="p-6">
          <h1 class="text-2xl font-bold text-primary-600">Draped Dreams</h1>
          <p class="text-sm text-gray-600 mt-1">Sari Store Management</p>
        </div>
        
        <nav class="mt-8">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            :class="{ 'bg-primary-50 text-primary-600 border-r-2 border-primary-600': $route.name === item.name }"
          >
            <FeatherIcon :name="item.icon" class="w-5 h-5 mr-3" />
            {{ item.label }}
          </router-link>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b">
          <div class="flex items-center justify-between px-6 py-4">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ getPageTitle() }}
            </h2>
            
            <div class="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                @click="logout"
                class="text-gray-600 hover:text-gray-900"
              >
                <FeatherIcon name="log-out" class="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-auto p-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sessionStore } from '@/stores/session'

const route = useRoute()
const router = useRouter()
const session = sessionStore()

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'home', label: 'Dashboard' },
  { name: 'Products', href: '/products', icon: 'shopping-bag', label: 'Saree Collection' },
  { name: 'Customers', href: '/customers', icon: 'users', label: 'Customers' },
  { name: 'Orders', href: '/orders', icon: 'shopping-cart', label: 'Orders' },
  { name: 'Inventory', href: '/inventory', icon: 'archive', label: 'Inventory' },
  { name: 'Reports', href: '/reports', icon: 'bar-chart-2', label: 'Reports' },
]

const getPageTitle = () => {
  const currentNav = navigation.find(item => item.name === route.name)
  return currentNav ? currentNav.label : 'Draped Dreams'
}

const logout = async () => {
  await session.logout()
  router.push('/login')
}
</script>
