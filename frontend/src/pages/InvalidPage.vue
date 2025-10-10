<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
          <FeatherIcon name="alert-triangle" class="h-6 w-6 text-red-600" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Page Not Found
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          The page you're looking for doesn't exist.
        </p>
      </div>
      
      <div class="mt-8">
        <Button
          @click="$router.push('/dashboard')"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FeatherIcon name="home" class="h-5 w-5 mr-2" />
          Go to Dashboard
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Simple 404 page component
</script>
