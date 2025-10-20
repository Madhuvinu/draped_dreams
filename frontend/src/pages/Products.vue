<template>
	<div class="p-4 md:p-6">
		<!-- Banner Section -->
		<div class="mb-8">
			<Banner />
		</div>



		<!-- Loading State -->
		<div v-if="loading" class="text-center py-12">
			<div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
			<p class="mt-2 text-gray-600">Loading products...</p>
		</div>

		<!-- Error State -->
		<div v-else-if="error" class="text-center py-12">
			<FeatherIcon name="alert-circle" class="w-16 h-16 text-red-400 mx-auto mb-4" />
			<h3 class="text-lg font-medium text-gray-900 mb-2">Error loading products</h3>
			<p class="text-gray-600 mb-4">{{ error }}</p>
			<Button @click="loadProducts">Try Again</Button>
		</div>

		<!-- Products Grid -->
		<div v-else-if="filteredSarees.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			<div
				v-for="saree in filteredSarees"
				:key="saree.id"
				class="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
			>
				<div class="aspect-w-16 aspect-h-12 bg-gradient-to-br from-purple-100 to-pink-100 h-64 flex items-center justify-center relative">
					<!-- Product Image -->
					<img
						v-if="saree.image"
						:src="saree.image"
						:alt="saree.product_name"
						class="w-full h-full object-cover"
					/>
					<!-- Placeholder if no image -->
					<FeatherIcon v-else name="image" class="w-16 h-16 text-purple-400" />

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
					<p class="text-sm text-gray-600 mb-3 line-clamp-2">
						{{ saree.description }}
					</p>

					<div class="flex items-center justify-between mb-3">
						<div>
							<span class="text-lg font-bold text-purple-600">₹{{ saree.price.toLocaleString() }}</span>
							<span
								v-if="saree.originalPrice"
								class="text-sm text-gray-500 line-through ml-2"
							>
								₹{{ saree.originalPrice.toLocaleString() }}
							</span>
						</div>
						<div class="flex items-center">
							<div class="flex text-yellow-400">
								<FeatherIcon
									v-for="i in 5"
									:key="i"
									name="star"
									class="w-3 h-3 fill-current"
								/>
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
							<FeatherIcon
								name="heart"
								:class="
									isInWishlist(saree.id)
										? 'text-red-500 fill-current'
										: 'text-gray-400'
								"
							/>
						</Button>
					</div>
				</div>
			</div>
		</div>

		<!-- No Results -->
		<div v-else class="text-center py-12">
			<FeatherIcon name="search" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
			<h3 class="text-lg font-medium text-gray-900 mb-2">No sarees found</h3>
			<p class="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
			<Button @click="clearFilters">Clear Filters</Button>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import productsAPI from "../api/products.js";
import Banner from "@/components/Banner.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import FeatherIcon from "../components/FeatherIcon.vue";
import Badge from "../components/Badge.vue";
import { useCartStore } from "@/stores/cart";
import { sessionStore } from "@/stores/session";

const router = useRouter();
const cartStore = useCartStore();
const session = sessionStore();

// State
const allSarees = ref([]);
const categories = ref([]);
const loading = ref(false);
const error = ref(null);
const searchQuery = ref("");
const selectedCategory = ref("");
const priceRange = ref("");
const sortBy = ref("featured");
const wishlistItems = ref([]);

// Computed
const filteredSarees = computed(() => {
	let filtered = [...allSarees.value];

	// Search filter
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase();
		filtered = filtered.filter(
			(saree) =>
				saree.name.toLowerCase().includes(query) ||
				saree.description.toLowerCase().includes(query) ||
				saree.category.toLowerCase().includes(query)
		);
	}

	// Category filter
	if (selectedCategory.value) {
		filtered = filtered.filter((saree) => saree.category === selectedCategory.value);
	}

	// Price filter
	if (priceRange.value) {
		filtered = filtered.filter((saree) => {
			const price = saree.price;
			switch (priceRange.value) {
				case "0-5000":
					return price <= 5000;
				case "5000-15000":
					return price > 5000 && price <= 15000;
				case "15000-30000":
					return price > 15000 && price <= 30000;
				case "30000+":
					return price > 30000;
				default:
					return true;
			}
		});
	}

	// Sort
	switch (sortBy.value) {
		case "price-low":
			filtered.sort((a, b) => a.price - b.price);
			break;
		case "price-high":
			filtered.sort((a, b) => b.price - a.price);
			break;
		case "newest":
			filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
			break;
		case "popular":
			filtered.sort((a, b) => b.rating - a.rating);
			break;
		default:
			// Keep original order for featured
			break;
	}

	return filtered;
});

// Methods
const loadProducts = async () => {
	loading.value = true;
	error.value = null;
	try {
		const response = await productsAPI.getProducts();
		// Fix: Check for message property in response which contains the actual data
		if (response.message && response.message.products) {
			allSarees.value = response.message.products;
		} else if (response.data) {
			allSarees.value = response.data;
		} else {
			allSarees.value = [];
		}
		console.log("Products loaded:", allSarees.value.length, allSarees.value);
	} catch (err) {
		console.error("Error loading products:", err);
		error.value = "Failed to load products. Please try again.";
	} finally {
		loading.value = false;
	}
};

const loadCategories = async () => {
	try {
		const response = await productsAPI.getCategories();
		categories.value = response.data || [];
		console.log("Categories loaded:", categories.value.length);
	} catch (err) {
		console.error("Error loading categories:", err);
	}
};

const filterProducts = () => {
	console.log("Filtering products with:", {
		searchQuery: searchQuery.value,
		selectedCategory: selectedCategory.value,
		priceRange: priceRange.value,
		sortBy: sortBy.value,
	});
};

const clearFilters = () => {
	searchQuery.value = "";
	selectedCategory.value = "";
	priceRange.value = "";
	sortBy.value = "featured";
};

const addToCart = (saree) => {
	cartStore.addItem(saree);
	console.log("Added to cart:", saree.name);
};

const toggleWishlist = (saree) => {
	const index = wishlistItems.value.findIndex((item) => item.id === saree.id);
	if (index > -1) {
		wishlistItems.value.splice(index, 1);
	} else {
		wishlistItems.value.push(saree);
	}
	localStorage.setItem("wishlist", JSON.stringify(wishlistItems.value));
};

const isInWishlist = (sareeId) => {
	return wishlistItems.value.some((item) => item.id === sareeId);
};

const getStockVariant = (stock) => {
	if (stock === 0) return "danger";
	if (stock < 5) return "warning";
	return "success";
};

const handleSidebarFiltersChanged = (event) => {
	const filterData = event.detail;
	searchQuery.value = filterData.searchQuery;
	selectedCategory.value = filterData.selectedCategory;
	priceRange.value = filterData.priceRange;
	sortBy.value = filterData.sortBy;
	
	console.log("Filters updated from sidebar:", filterData);
};

const refreshProducts = async () => {
	console.log("Refreshing products data...");
	await loadProducts();
	console.log("Products refreshed. Current count:", allSarees.value.length);
};

const handleVisibilityChange = () => {
	if (!document.hidden) {
		console.log("Page became visible, refreshing products...");
		refreshProducts();
	}
};

onMounted(async () => {
	console.log("Products page mounted, initializing...");

	// Load cart and wishlist from localStorage
	const savedWishlist = localStorage.getItem("wishlist");
	if (savedWishlist) {
		wishlistItems.value = JSON.parse(savedWishlist);
	}

	console.log("Initial state:", {
		selectedCategory: selectedCategory.value,
		searchQuery: searchQuery.value,
		priceRange: priceRange.value,
		sortBy: sortBy.value,
	});

	// Load products and categories from backend
	await Promise.all([loadProducts(), loadCategories()]);

	console.log("Initialization complete. Products loaded:", allSarees.value.length);

	// Add event listener for visibility change
	document.addEventListener('visibilitychange', handleVisibilityChange);
	
	// Listen for filter changes from sidebar
	window.addEventListener('sidebar-filters-changed', handleSidebarFiltersChanged);
});

onUnmounted(() => {
	document.removeEventListener('visibilitychange', handleVisibilityChange);
	window.removeEventListener('sidebar-filters-changed', handleSidebarFiltersChanged);
});
</script>