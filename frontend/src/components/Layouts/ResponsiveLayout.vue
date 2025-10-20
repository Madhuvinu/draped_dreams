<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Mobile Layout -->
		<div v-if="isMobile" class="flex flex-col h-screen">
			<!-- Mobile Header -->
			<header class="bg-white shadow-sm border-b sticky top-0 z-50">
				<div class="flex items-center justify-between px-4 py-3">
					<div class="flex items-center">
						<div class="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
							<span class="text-white text-lg">🛍️</span>
						</div>
						<h1 class="text-lg font-bold text-gray-900">Draped Dreams</h1>
					</div>
					<div class="flex items-center space-x-2">
						<Button variant="ghost" size="sm" @click="$router.push('/cart')">
							<FeatherIcon name="shopping-cart" class="w-4 h-4" />
							<span class="ml-1">{{ cartItems.length }}</span>
						</Button>
						<Button 
							v-if="!isLoggedIn"
							variant="outline" 
							size="sm" 
							@click="$router.push('/login')"
							class="border-purple-600 text-purple-600"
						>
							Login
						</Button>
						<Button 
							v-else
							variant="ghost" 
							size="sm" 
							@click="handleLogout"
						>
							<FeatherIcon name="log-out" class="w-4 h-4" />
						</Button>
					</div>
				</div>
			</header>

			<!-- Mobile Navigation -->
			<nav class="bg-white border-b">
				<div class="flex overflow-x-auto">
					<router-link
						v-for="item in navigation"
						:key="item.name"
						:to="item.href"
						class="flex-shrink-0 px-4 py-3 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
						:class="{
							'text-purple-600 border-b-2 border-purple-600': $route.name === item.name,
						}"
					>
						<FeatherIcon :name="item.icon" class="w-4 h-4 mr-2" />
						{{ item.label }}
					</router-link>
				</div>
			</nav>

			<!-- Mobile Content -->
			<main class="flex-1 overflow-auto">
				<slot />
			</main>
		</div>

		<!-- Desktop Layout -->
		<div v-else class="flex h-screen">
			<!-- Desktop Sidebar -->
			<div class="w-64 bg-white shadow-lg">
				<div class="p-6">
					<div class="flex items-center">
						<div class="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
							<span class="text-white text-lg">🛍️</span>
						</div>
						<div>
							<h1 class="text-xl font-bold text-gray-900">Draped Dreams</h1>
							<p class="text-sm text-gray-600">Elegant Sarees Collection</p>
						</div>
					</div>
				</div>

				<nav class="mt-8">
					<router-link
						v-for="item in navigation"
						:key="item.name"
						:to="item.href"
						class="flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
						:class="{
							'bg-purple-50 text-purple-600 border-r-2 border-purple-600': $route.name === item.name,
						}"
					>
						<FeatherIcon :name="item.icon" class="w-5 h-5 mr-3" />
						{{ item.label }}
					</router-link>
				</nav>

				<!-- User Info -->
				<div v-if="isLoggedIn" class="absolute bottom-0 w-64 p-6 border-t">
					<div class="flex items-center">
						<div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
							<FeatherIcon name="user" class="w-4 h-4 text-purple-600" />
						</div>
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-gray-900 truncate">
								{{ userData.first_name || userData.email }}
							</p>
							<p class="text-xs text-gray-500">Customer</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Desktop Main Content -->
			<div class="flex-1 flex flex-col overflow-hidden">
				<!-- Desktop Header -->
				<header class="bg-white shadow-sm border-b">
					<div class="flex items-center justify-between px-6 py-4">
						<h2 class="text-xl font-semibold text-gray-900">
							{{ getPageTitle() }}
						</h2>

						<div class="flex items-center space-x-4">
							<Button variant="ghost" size="sm" @click="$router.push('/cart')">
								<FeatherIcon name="shopping-cart" class="w-5 h-5 mr-2" />
								Cart ({{ cartItems.length }})
							</Button>
							<Button v-if="isLoggedIn" variant="ghost" size="sm" @click="$router.push('/orders')">
								<FeatherIcon name="package" class="w-5 h-5 mr-2" />
								Orders
							</Button>
							<Button 
								v-if="!isLoggedIn"
								variant="outline" 
								size="sm" 
								@click="$router.push('/login')"
								class="border-purple-600 text-purple-600 hover:bg-purple-50"
							>
								<FeatherIcon name="log-in" class="w-4 h-4 mr-2" />
								Login
							</Button>
							<Button 
								v-if="isLoggedIn"
								variant="ghost" 
								size="sm" 
								@click="handleLogout"
								class="text-gray-600 hover:text-gray-900"
							>
								<FeatherIcon name="log-out" class="w-4 h-4 mr-2" />
								Logout
							</Button>
						</div>
					</div>
				</header>

				<!-- Desktop Content -->
				<main class="flex-1 overflow-auto">
					<slot />
				</main>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { sessionStore } from '@/stores/session.js';
import Button from '@/components/Button.vue';
import FeatherIcon from '@/components/FeatherIcon.vue';

const route = useRoute();
const router = useRouter();
const session = sessionStore();

// Reactive data
const windowWidth = ref(window.innerWidth);
const cartItems = ref([]);

// Computed properties
const isMobile = computed(() => windowWidth.value < 768);
const isLoggedIn = computed(() => session.isLoggedIn);
const userData = computed(() => session.user || {});

const navigation = [
	{ name: "HomePage", href: "/home", icon: "home", label: "Home" },
	{ name: "Products", href: "/products", icon: "shopping-bag", label: "Saree Collection" },
	{ name: "Cart", href: "/cart", icon: "shopping-cart", label: "Cart" },
	{ name: "OrderHistory", href: "/orders", icon: "package", label: "Orders" },
];

// Methods
const getPageTitle = () => {
	const currentNav = navigation.find((item) => item.name === route.name);
	return currentNav ? currentNav.label : "Draped Dreams";
};

const handleLogout = async () => {
	await session.logout();
	router.push('/login');
};

const updateWindowWidth = () => {
	windowWidth.value = window.innerWidth;
};

const loadCartItems = () => {
	const savedCart = localStorage.getItem('cart');
	if (savedCart) {
		cartItems.value = JSON.parse(savedCart);
	}
};

// Lifecycle
onMounted(() => {
	window.addEventListener('resize', updateWindowWidth);
	loadCartItems();
	
	// Listen for cart updates
	window.addEventListener('storage', (e) => {
		if (e.key === 'cart') {
			loadCartItems();
		}
	});
});

onUnmounted(() => {
	window.removeEventListener('resize', updateWindowWidth);
});
</script>
