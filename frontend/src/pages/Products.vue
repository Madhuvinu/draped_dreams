<template>
	<div class="p-4 md:p-6">
		<!-- Banner Section -->
		<div class="mb-8">
			<Banner />
		</div>

		<!-- Hero Section -->
		<section class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 md:py-16 rounded-lg mb-8">
			<div class="text-center px-4">
				<h2 class="text-2xl md:text-4xl font-bold mb-4">Our Collection</h2>
			</div>
		</section>
		
		<!-- Breadcrumb -->
		<nav class="flex mb-8">
			<Button variant="ghost" size="sm" @click="$router.push('/')">
				<FeatherIcon name="home" class="w-4 h-4 mr-2" />
				Home
			</Button>
			<span class="mx-2 text-gray-400">/</span>
			<span class="text-gray-600">Products</span>
		</nav>

		<!-- Filters and Search -->
		<div class="bg-white rounded-lg shadow p-6 mb-8">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
					<TextInput
						v-model="searchQuery"
						placeholder="Search sarees..."
						@input="filterProducts"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
					<select
						v-model="selectedCategory"
						@change="filterProducts"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
					>
						<option value="">All Categories</option>
						<option
							v-for="category in categories"
							:key="category"
							:value="category"
						>
							{{ category }}
						</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
					<select
						v-model="priceRange"
						@change="filterProducts"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
					>
						<option value="">All Prices</option>
						<option value="0-5000">Under ₹5,000</option>
						<option value="5000-15000">₹5,000 - ₹15,000</option>
						<option value="15000-30000">₹15,000 - ₹30,000</option>
						<option value="30000+">Above ₹30,000</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
					<select
						v-model="sortBy"
						@change="filterProducts"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
					>
						<option value="featured">Featured</option>
						<option value="price-low">Price: Low to High</option>
						<option value="price-high">Price: High to Low</option>
						<option value="newest">Newest First</option>
						<option value="popular">Most Popular</option>
					</select>
				</div>
			</div>
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
		allSarees.value = response.data || [];
		console.log("Products loaded:", allSarees.value.length);
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
});

onUnmounted(() => {
	document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>