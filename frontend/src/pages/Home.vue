<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Header -->
		<header class="bg-white shadow-sm border-b">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center py-4">
					<div class="flex items-center">
						<div
							class="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3"
						>
							<span class="text-white text-lg">🛍️</span>
						</div>
						<h1 class="text-2xl font-bold text-gray-900">Draped Dreams</h1>
					</div>
					<div class="flex items-center space-x-4">
						<button
							@click="goToCart"
							class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
						>
							🛒 Cart ({{ cartItems.length }})
						</button>
						<button
							@click="goToRegister"
							class="px-4 py-2 text-sm font-medium text-purple-600 bg-white border border-purple-600 rounded-md hover:bg-purple-50"
						>
							👤 Register
						</button>
						<button
							@click="goToLogin"
							class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
						>
							🔑 Login
						</button>
					</div>
				</div>
			</div>
		</header>

		<!-- Hero Section -->
		<section class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 class="text-4xl font-bold mb-4">Elegant Sarees for Every Occasion</h2>
				<p class="text-xl mb-8">
					Discover our exquisite collection of traditional and contemporary sarees
				</p>
				<button
					@click="goToProducts"
					class="px-6 py-3 bg-white text-purple-600 rounded-md font-medium hover:bg-gray-100"
				>
					Shop Now
				</button>
			</div>
		</section>

		<!-- Featured Products -->
		<section class="py-12 bg-white">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h3 class="text-2xl font-bold text-gray-900 mb-8">Featured Sarees</h3>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div
						v-for="saree in featuredSarees"
						:key="saree.id"
						class="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
					>
						<div
							class="aspect-w-16 aspect-h-12 bg-gradient-to-br from-purple-100 to-pink-100 h-64 flex items-center justify-center"
						>
							<span class="text-6xl">👗</span>
						</div>
						<div class="p-4">
							<h4 class="font-semibold text-gray-900 mb-2">{{ saree.name }}</h4>
							<p class="text-sm text-gray-600 mb-3">{{ saree.description }}</p>
							<div class="flex items-center justify-between">
								<div>
									<span class="text-lg font-bold text-purple-600"
										>₹{{ saree.price }}</span
									>
									<span
										v-if="saree.originalPrice"
										class="text-sm text-gray-500 line-through ml-2"
									>
										₹{{ saree.originalPrice }}
									</span>
								</div>
								<button
									@click="addToCart(saree)"
									class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
								>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const cartItems = ref([]);

const featuredSarees = ref([
	{
		id: 1,
		name: "Elegant Silk Saree",
		description: "Beautiful silk saree with intricate work",
		price: "15,000",
		originalPrice: "18,000",
		category: "Silk",
	},
	{
		id: 2,
		name: "Comfortable Cotton Saree",
		description: "Light and breathable cotton saree",
		price: "3,500",
		category: "Cotton",
	},
	{
		id: 3,
		name: "Modern Designer Saree",
		description: "Contemporary designer saree",
		price: "8,000",
		originalPrice: "10,000",
		category: "Designer",
	},
	{
		id: 4,
		name: "Wedding Silk Saree",
		description: "Heavy silk saree for special occasions",
		price: "25,000",
		category: "Wedding",
	},
]);

const addToCart = (saree) => {
	cartItems.value.push(saree);
	localStorage.setItem("cart", JSON.stringify(cartItems.value));
	alert(`Added "${saree.name}" to cart!`);
};

const goToCart = () => {
	router.push("/cart");
};

const goToRegister = () => {
	router.push("/register");
};

const goToLogin = () => {
	router.push("/login");
};

const goToProducts = () => {
	router.push("/products");
};

onMounted(() => {
	// Load cart from localStorage
	const savedCart = localStorage.getItem("cart");
	if (savedCart) {
		cartItems.value = JSON.parse(savedCart);
	}
});
</script>
