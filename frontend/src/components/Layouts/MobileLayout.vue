<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile Layout -->
    <div class="flex flex-col h-screen">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="flex items-center justify-between px-4 py-3">
          <h1 class="text-lg font-bold text-primary-600">Draped Dreams</h1>
          
          <Button
            variant="ghost"
            size="sm"
            @click="logout"
            class="text-gray-600 hover:text-gray-900"
          >
            <FeatherIcon name="log-out" class="w-4 h-4" />
          </Button>
        </div>
      </header>

      <!-- Navigation Tabs -->
      <nav class="bg-white border-b">
        <div class="flex overflow-x-auto">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="flex-shrink-0 px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            :class="{ 'text-primary-600 border-b-2 border-primary-600': $route.name === item.name }"
          >
            <FeatherIcon :name="item.icon" class="w-4 h-4 mr-2" />
            {{ item.label }}
          </router-link>
        </div>
      </nav>

      <!-- Page Content -->
      <main class="flex-1 overflow-auto p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { sessionStore } from '@/stores/session'

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

const logout = async () => {
  await session.logout()
  router.push('/login')
}
</script>
