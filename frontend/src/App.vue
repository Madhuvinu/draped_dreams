<template>
	<div>
		<!-- Check if user is logged in and not on login/register pages -->
		<GlobalSidebar v-if="showSidebar">
			<router-view />
		</GlobalSidebar>
		
		<!-- Show pages without sidebar for login/register -->
		<router-view v-else />
		
		<PWAInstallPrompt />
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { sessionStore } from '@/stores/session';
import GlobalSidebar from '@/components/Layouts/GlobalSidebar.vue';
import PWAInstallPrompt from '@/components/PWAInstallPrompt.vue';

const route = useRoute();
const session = sessionStore();

// Show sidebar for all pages except login and register
const showSidebar = computed(() => {
  const noSidebarPages = ['/login', '/register'];
  return !noSidebarPages.includes(route.path);
});
</script>
