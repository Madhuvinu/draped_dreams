<template>
  <div v-if="showInstallPrompt" class="fixed bottom-4 left-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 md:left-auto md:right-4 md:w-80">
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <img src="/pwa-192x192.png" alt="Draped Dreams" class="w-12 h-12 rounded-lg" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-medium text-gray-900">Install Draped Dreams</h3>
        <p class="text-sm text-gray-500 mt-1">Add to your home screen for quick access</p>
        <div class="mt-3 flex space-x-2">
          <button
            @click="installApp"
            class="bg-purple-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Install
          </button>
          <button
            @click="dismissPrompt"
            class="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
      <button
        @click="dismissPrompt"
        class="flex-shrink-0 text-gray-400 hover:text-gray-600"
      >
        <FeatherIcon name="x" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FeatherIcon from '@/components/FeatherIcon.vue';

const showInstallPrompt = ref(false);
let deferredPrompt = null;

onMounted(() => {
  // Check if already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return; // Already installed
  }

  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Check if user has previously dismissed the prompt
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (!dismissed) {
      showInstallPrompt.value = true;
    }
  });

  // Listen for app installed event
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    showInstallPrompt.value = false;
    deferredPrompt = null;
  });
});

const installApp = async () => {
  if (!deferredPrompt) return;

  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt');
  } else {
    console.log('User dismissed the install prompt');
  }
  
  // Clear the deferredPrompt
  deferredPrompt = null;
  showInstallPrompt.value = false;
};

const dismissPrompt = () => {
  showInstallPrompt.value = false;
  // Remember that user dismissed the prompt
  localStorage.setItem('pwa-install-dismissed', 'true');
};
</script>
