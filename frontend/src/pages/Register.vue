<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-purple-100">
          <FeatherIcon name="user-plus" class="h-6 w-6 text-purple-600" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Join Draped Dreams today
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
              <TextInput
                id="first-name"
                name="firstName"
                type="text"
                required
                class="mt-1"
                placeholder="First name"
                v-model="formData.firstName"
              />
            </div>
            <div>
              <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
              <TextInput
                id="last-name"
                name="lastName"
                type="text"
                required
                class="mt-1"
                placeholder="Last name"
                v-model="formData.lastName"
              />
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <TextInput
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="mt-1"
              placeholder="Email address"
              v-model="formData.email"
            />
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <TextInput
              id="phone"
              name="phone"
              type="tel"
              required
              class="mt-1"
              placeholder="Phone number"
              v-model="formData.phone"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <TextInput
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="mt-1"
              placeholder="Password"
              v-model="formData.password"
            />
          </div>
          
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <TextInput
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              class="mt-1"
              placeholder="Confirm password"
              v-model="formData.confirmPassword"
            />
          </div>
        </div>

        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <FeatherIcon name="alert-circle" class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ error }}
              </h3>
            </div>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            :loading="loading"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <FeatherIcon name="user-plus" class="h-5 w-5 text-purple-500 group-hover:text-purple-400" />
            </span>
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </Button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account? 
            <Button variant="ghost" size="sm" @click="$router.push('/login')" class="text-purple-600 hover:text-purple-500">
              Sign in here
            </Button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Validate passwords match
    if (formData.value.password !== formData.value.confirmPassword) {
      error.value = 'Passwords do not match'
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For now, just redirect to login
    alert('Account created successfully! Please login.')
    router.push('/login')
    
  } catch (err) {
    error.value = 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
