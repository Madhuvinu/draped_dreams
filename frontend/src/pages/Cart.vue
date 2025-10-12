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
							<FeatherIcon name="shopping-bag" class="text-white" />
						</div>
						<h1 class="text-2xl font-bold text-gray-900">Draped Dreams</h1>
					</div>
					<div class="flex items-center space-x-4">
						<Button variant="ghost" size="sm" @click="$router.push('/products')">
							<FeatherIcon name="arrow-left" class="w-5 h-5 mr-2" />
							Continue Shopping
						</Button>
					</div>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h2 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>

			<div v-if="cartItems.length === 0" class="text-center py-12">
				<FeatherIcon name="shopping-cart" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
				<h3 class="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
				<p class="text-gray-600 mb-4">Add some beautiful sarees to your cart</p>
				<Button @click="$router.push('/products')">Start Shopping</Button>
			</div>

			<div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Cart Items -->
				<div class="lg:col-span-2">
					<div class="bg-white rounded-lg shadow">
						<div class="p-6">
							<h3 class="text-lg font-semibold text-gray-900 mb-4">
								Cart Items ({{ cartItems.length }})
							</h3>

							<div class="space-y-4">
								<div
									v-for="(item, index) in cartItems"
									:key="item.id"
									class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
								>
									<!-- Product Image -->
									<div
										class="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0"
									>
										<FeatherIcon
											name="image"
											class="w-8 h-8 text-purple-400"
										/>
									</div>

									<!-- Product Details -->
									<div class="flex-1 min-w-0">
										<h4 class="text-sm font-medium text-gray-900 truncate">
											{{ item.name }}
										</h4>
										<p class="text-sm text-gray-500">{{ item.category }}</p>
										<div class="flex items-center mt-1">
											<span class="text-sm font-medium text-purple-600"
												>₹{{ item.price }}</span
											>
											<span
												v-if="item.originalPrice"
												class="text-xs text-gray-500 line-through ml-2"
											>
												₹{{ item.originalPrice }}
											</span>
										</div>
									</div>

									<!-- Quantity Controls -->
									<div class="flex items-center space-x-2">
										<Button
											variant="outline"
											size="sm"
											@click="updateQuantity(index, -1)"
											:disabled="item.quantity <= 1"
										>
											<FeatherIcon name="minus" class="w-4 h-4" />
										</Button>
										<span class="w-8 text-center text-sm font-medium">{{
											item.quantity
										}}</span>
										<Button
											variant="outline"
											size="sm"
											@click="updateQuantity(index, 1)"
											:disabled="item.quantity >= item.stock"
										>
											<FeatherIcon name="plus" class="w-4 h-4" />
										</Button>
									</div>

									<!-- Price -->
									<div class="text-right">
										<div class="text-sm font-medium text-gray-900">
											₹{{ calculateItemTotal(item) }}
										</div>
										<Button
											variant="ghost"
											size="sm"
											@click="removeItem(index)"
											class="text-red-600 hover:text-red-700 mt-1"
										>
											<FeatherIcon name="trash-2" class="w-4 h-4" />
										</Button>
									</div>
								</div>
							</div>

							<!-- Cart Actions -->
							<div
								class="flex justify-between items-center mt-6 pt-6 border-t border-gray-200"
							>
								<Button variant="outline" @click="clearCart">
									<FeatherIcon name="trash-2" class="w-4 h-4 mr-2" />
									Clear Cart
								</Button>
								<div class="text-sm text-gray-600">
									Total:
									<span class="font-medium text-gray-900"
										>₹{{ calculateCartTotal() }}</span
									>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Order Summary -->
				<div class="lg:col-span-1">
					<div class="bg-white rounded-lg shadow p-6 sticky top-8">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

						<div class="space-y-3 mb-6">
							<div class="flex justify-between text-sm">
								<span class="text-gray-600">Subtotal</span>
								<span class="text-gray-900">₹{{ calculateCartTotal() }}</span>
							</div>
							<div class="flex justify-between text-sm">
								<span class="text-gray-600">Shipping</span>
								<span class="text-gray-900">₹{{ shippingCost }}</span>
							</div>
							<div class="flex justify-between text-sm">
								<span class="text-gray-600">Tax (18%)</span>
								<span class="text-gray-900">₹{{ calculateTax() }}</span>
							</div>
							<div class="border-t border-gray-200 pt-3">
								<div class="flex justify-between text-base font-semibold">
									<span class="text-gray-900">Total</span>
									<span class="text-purple-600"
										>₹{{ calculateGrandTotal() }}</span
									>
								</div>
							</div>
						</div>

						<Button
							class="w-full mb-4"
							@click="$router.push('/checkout')"
							:disabled="cartItems.length === 0"
						>
							Proceed to Checkout
						</Button>

						<div class="text-center">
							<p class="text-xs text-gray-500 mb-2">Secure checkout with</p>
							<div class="flex justify-center space-x-2">
								<div
									class="w-8 h-5 bg-blue-100 rounded flex items-center justify-center"
								>
									<span class="text-xs font-bold text-blue-600">VISA</span>
								</div>
								<div
									class="w-8 h-5 bg-red-100 rounded flex items-center justify-center"
								>
									<span class="text-xs font-bold text-red-600">MC</span>
								</div>
								<div
									class="w-8 h-5 bg-green-100 rounded flex items-center justify-center"
								>
									<span class="text-xs font-bold text-green-600">UPI</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const cartItems = ref([]);
const shippingCost = ref(100);

const calculateItemTotal = (item) => {
	const price = parseInt(item.price.replace(/,/g, ""));
	return (price * item.quantity).toLocaleString();
};

const calculateCartTotal = () => {
	return cartItems.value
		.reduce((total, item) => {
			const price = parseInt(item.price.replace(/,/g, ""));
			return total + price * item.quantity;
		}, 0)
		.toLocaleString();
};

const calculateTax = () => {
	const subtotal = cartItems.value.reduce((total, item) => {
		const price = parseInt(item.price.replace(/,/g, ""));
		return total + price * item.quantity;
	}, 0);
	return Math.round(subtotal * 0.18).toLocaleString();
};

const calculateGrandTotal = () => {
	const subtotal = cartItems.value.reduce((total, item) => {
		const price = parseInt(item.price.replace(/,/g, ""));
		return total + price * item.quantity;
	}, 0);
	const tax = Math.round(subtotal * 0.18);
	const total = subtotal + shippingCost.value + tax;
	return total.toLocaleString();
};

const updateQuantity = (index, change) => {
	cartItems.value[index].quantity += change;
	if (cartItems.value[index].quantity <= 0) {
		cartItems.value.splice(index, 1);
	}
	saveCart();
};

const removeItem = (index) => {
	cartItems.value.splice(index, 1);
	saveCart();
};

const clearCart = () => {
	cartItems.value = [];
	saveCart();
};

const saveCart = () => {
	localStorage.setItem("cart", JSON.stringify(cartItems.value));
};

onMounted(() => {
	// Load cart from localStorage
	const savedCart = localStorage.getItem("cart");
	if (savedCart) {
		const parsedCart = JSON.parse(savedCart);
		// Add quantity property if not exists
		cartItems.value = parsedCart.map((item) => ({
			...item,
			quantity: item.quantity || 1,
		}));
	}
});
</script>
