<template>
	<div class="p-4 md:p-6">
		<!-- Welcome Section -->
		<section class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 md:py-16 rounded-lg mb-8">
			<div class="text-center px-4">
				<h1 class="text-3xl md:text-5xl font-bold mb-4">Welcome to Draped Dreams</h1>
				<p class="text-lg md:text-xl mb-8">
					Elegant Sarees for Every Occasion
				</p>
				<Button @click="goToProducts" size="lg">
					<FeatherIcon name="shopping-bag" class="w-5 h-5 mr-2" />
					Shop Now
				</Button>
			</div>
		</section>

		<!-- Featured Products -->
		<section class="bg-white rounded-lg shadow p-6 mb-8">
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
							<Button @click="addToCart(saree)" size="sm">
								Add to Cart
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Quick Actions -->
		<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-white rounded-lg shadow p-6 text-center">
				<FeatherIcon name="star" class="w-12 h-12 text-purple-600 mx-auto mb-4" />
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Browse Products</h3>
				<p class="text-gray-600 mb-4">Explore our complete collection</p>
				<Button @click="goToProducts" variant="outline">
					View All Products
				</Button>
			</div>
			
			<div class="bg-white rounded-lg shadow p-6 text-center">
				<FeatherIcon name="shopping-cart" class="w-12 h-12 text-purple-600 mx-auto mb-4" />
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Your Cart</h3>
				<p class="text-gray-600 mb-4">{{ cartStore.itemCount }} items in cart</p>
				<Button @click="goToCart" variant="outline">
					View Cart
				</Button>
			</div>
			
			<div class="bg-white rounded-lg shadow p-6 text-center">
				<FeatherIcon name="star" class="w-12 h-12 text-purple-600 mx-auto mb-4" />
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Order History</h3>
				<p class="text-gray-600 mb-4">Track your previous orders</p>
				<Button @click="goToOrders" variant="outline">
					View Orders
				</Button>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from '@/stores/cart';
import Button from '@/components/Button.vue';
import FeatherIcon from '@/components/FeatherIcon.vue';

const router = useRouter();
const cartStore = useCartStore();

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
	cartStore.addItem(saree);
	alert(`Added "${saree.name}" to cart!`);
};

const goToCart = () => {
	router.push("/cart");
};

const goToProducts = () => {
	router.push("/products");
};

const goToOrders = () => {
	router.push("/orders");
};

onMounted(() => {
	// Cart store will handle loading from localStorage
});
</script>