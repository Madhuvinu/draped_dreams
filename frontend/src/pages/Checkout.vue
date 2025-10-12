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
						<Button variant="ghost" size="sm" @click="$router.push('/cart')">
							<FeatherIcon name="arrow-left" class="w-5 h-5 mr-2" />
							Back to Cart
						</Button>
					</div>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h2 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h2>

			<div v-if="cartItems.length === 0" class="text-center py-12">
				<FeatherIcon name="shopping-cart" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
				<h3 class="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
				<p class="text-gray-600 mb-4">Add some items to your cart first</p>
				<Button @click="$router.push('/products')">Start Shopping</Button>
			</div>

			<div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Checkout Form -->
				<div class="lg:col-span-2 space-y-8">
					<!-- Shipping Information -->
					<div class="bg-white rounded-lg shadow p-6">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">
							Shipping Information
						</h3>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>First Name *</label
								>
								<TextInput
									v-model="shippingInfo.firstName"
									placeholder="Enter first name"
									required
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>Last Name *</label
								>
								<TextInput
									v-model="shippingInfo.lastName"
									placeholder="Enter last name"
									required
								/>
							</div>
							<div class="md:col-span-2">
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>Email *</label
								>
								<TextInput
									v-model="shippingInfo.email"
									type="email"
									placeholder="Enter email address"
									required
								/>
							</div>
							<div class="md:col-span-2">
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>Phone Number *</label
								>
								<TextInput
									v-model="shippingInfo.phone"
									placeholder="Enter phone number"
									required
								/>
							</div>
							<div class="md:col-span-2">
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>Address *</label
								>
								<TextInput
									v-model="shippingInfo.address"
									placeholder="Enter full address"
									required
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>City *</label
								>
								<TextInput
									v-model="shippingInfo.city"
									placeholder="Enter city"
									required
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>Pincode *</label
								>
								<TextInput
									v-model="shippingInfo.pincode"
									placeholder="Enter pincode"
									required
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>State *</label
								>
								<select
									v-model="shippingInfo.state"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
								>
									<option value="">Select State</option>
									<option value="Maharashtra">Maharashtra</option>
									<option value="Delhi">Delhi</option>
									<option value="Karnataka">Karnataka</option>
									<option value="Tamil Nadu">Tamil Nadu</option>
									<option value="Gujarat">Gujarat</option>
									<option value="West Bengal">West Bengal</option>
								</select>
							</div>
						</div>
					</div>

					<!-- Payment Method -->
					<div class="bg-white rounded-lg shadow p-6">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>

						<div class="space-y-4">
							<div
								v-for="method in paymentMethods"
								:key="method.id"
								class="flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-300"
								:class="{
									'border-purple-500 bg-purple-50':
										selectedPayment === method.id,
								}"
								@click="selectedPayment = method.id"
							>
								<input
									type="radio"
									:id="method.id"
									:value="method.id"
									v-model="selectedPayment"
									class="mr-3"
								/>
								<label :for="method.id" class="flex items-center cursor-pointer">
									<div
										class="w-8 h-8 mr-3 flex items-center justify-center rounded"
										:class="method.bgColor"
									>
										<span
											class="text-xs font-bold"
											:class="method.textColor"
											>{{ method.shortName }}</span
										>
									</div>
									<div>
										<div class="font-medium text-gray-900">
											{{ method.name }}
										</div>
										<div class="text-sm text-gray-500">
											{{ method.description }}
										</div>
									</div>
								</label>
							</div>
						</div>
					</div>

					<!-- Order Notes -->
					<div class="bg-white rounded-lg shadow p-6">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">
							Order Notes (Optional)
						</h3>
						<textarea
							v-model="orderNotes"
							rows="3"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
							placeholder="Any special instructions for your order..."
						></textarea>
					</div>
				</div>

				<!-- Order Summary -->
				<div class="lg:col-span-1">
					<div class="bg-white rounded-lg shadow p-6 sticky top-8">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

						<!-- Cart Items -->
						<div class="space-y-3 mb-6">
							<div
								v-for="item in cartItems"
								:key="item.id"
								class="flex items-center space-x-3"
							>
								<div
									class="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0"
								>
									<FeatherIcon name="image" class="w-6 h-6 text-purple-400" />
								</div>
								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium text-gray-900 truncate">
										{{ item.name }}
									</p>
									<p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
								</div>
								<div class="text-sm font-medium text-gray-900">
									₹{{ calculateItemTotal(item) }}
								</div>
							</div>
						</div>

						<!-- Price Breakdown -->
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

						<!-- Place Order Button -->
						<Button
							class="w-full mb-4"
							@click="placeOrder"
							:loading="isPlacingOrder"
							:disabled="!isFormValid"
						>
							{{ isPlacingOrder ? "Placing Order..." : "Place Order" }}
						</Button>

						<!-- Security Notice -->
						<div class="text-center">
							<div
								class="flex items-center justify-center text-xs text-gray-500 mb-2"
							>
								<FeatherIcon name="shield" class="w-4 h-4 mr-1" />
								Secure SSL Encrypted
							</div>
							<p class="text-xs text-gray-500">
								Your payment information is secure and encrypted
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const cartItems = ref([]);
const shippingCost = ref(100);
const isPlacingOrder = ref(false);
const orderNotes = ref("");

const shippingInfo = ref({
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	address: "",
	city: "",
	pincode: "",
	state: "",
});

const selectedPayment = ref("");

const paymentMethods = ref([
	{
		id: "upi",
		name: "UPI Payment",
		description: "Pay using UPI apps like GPay, PhonePe",
		shortName: "UPI",
		bgColor: "bg-green-100",
		textColor: "text-green-600",
	},
	{
		id: "card",
		name: "Credit/Debit Card",
		description: "Visa, Mastercard, RuPay",
		shortName: "CARD",
		bgColor: "bg-blue-100",
		textColor: "text-blue-600",
	},
	{
		id: "netbanking",
		name: "Net Banking",
		description: "Pay using your bank account",
		shortName: "NET",
		bgColor: "bg-purple-100",
		textColor: "text-purple-600",
	},
	{
		id: "cod",
		name: "Cash on Delivery",
		description: "Pay when you receive the order",
		shortName: "COD",
		bgColor: "bg-orange-100",
		textColor: "text-orange-600",
	},
]);

const isFormValid = computed(() => {
	return (
		shippingInfo.value.firstName &&
		shippingInfo.value.lastName &&
		shippingInfo.value.email &&
		shippingInfo.value.phone &&
		shippingInfo.value.address &&
		shippingInfo.value.city &&
		shippingInfo.value.pincode &&
		shippingInfo.value.state &&
		selectedPayment.value
	);
});

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

const placeOrder = async () => {
	if (!isFormValid.value) return;

	isPlacingOrder.value = true;

	try {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Create order object
		const order = {
			id: "DD-" + Date.now(),
			items: cartItems.value,
			shippingInfo: shippingInfo.value,
			paymentMethod: selectedPayment.value,
			orderNotes: orderNotes.value,
			total: calculateGrandTotal(),
			status: "confirmed",
			date: new Date().toISOString(),
		};

		// Save order to localStorage (in real app, this would be sent to backend)
		const orders = JSON.parse(localStorage.getItem("orders") || "[]");
		orders.push(order);
		localStorage.setItem("orders", JSON.stringify(orders));

		// Clear cart
		localStorage.removeItem("cart");
		cartItems.value = [];

		// Redirect to order confirmation
		router.push(`/order-confirmation/${order.id}`);
	} catch (error) {
		console.error("Order placement failed:", error);
		// TODO: Show error message
	} finally {
		isPlacingOrder.value = false;
	}
};

onMounted(() => {
	// Load cart from localStorage
	const savedCart = localStorage.getItem("cart");
	if (savedCart) {
		const parsedCart = JSON.parse(savedCart);
		cartItems.value = parsedCart.map((item) => ({
			...item,
			quantity: item.quantity || 1,
		}));
	}

	// Redirect if cart is empty
	if (cartItems.value.length === 0) {
		router.push("/cart");
	}
});
</script>
