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
						<h1 class="text-2xl font-bold text-gray-900">Draped Dreams Admin</h1>
					</div>
					<div class="flex items-center space-x-4">
						<Button variant="ghost" size="sm" @click="$router.push('/home')">
							<FeatherIcon name="home" class="w-5 h-5 mr-2" />
							View Store
						</Button>
						<div class="flex items-center space-x-2">
							<div
								class="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 font-medium"
							>
								A
							</div>
							<span class="text-gray-700">Admin</span>
						</div>
					</div>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<!-- Page Header -->
			<div class="flex justify-between items-center mb-8">
				<div>
					<h2 class="text-3xl font-bold text-gray-900">Product Management</h2>
					<p class="text-gray-600">Manage your saree inventory</p>
				</div>
				<Button @click="showAddProductModal = true">
					<FeatherIcon name="plus" class="w-5 h-5 mr-2" />
					Add New Product
				</Button>
			</div>

			<!-- Stats Cards -->
			<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-3 rounded-full bg-blue-100 text-blue-600">
							<FeatherIcon name="shopping-bag" class="w-6 h-6" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">Total Products</p>
							<p class="text-2xl font-bold text-gray-900">{{ products.length }}</p>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-3 rounded-full bg-green-100 text-green-600">
							<FeatherIcon name="check-circle" class="w-6 h-6" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">In Stock</p>
							<p class="text-2xl font-bold text-gray-900">{{ inStockCount }}</p>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
							<FeatherIcon name="alert-triangle" class="w-6 h-6" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">Low Stock</p>
							<p class="text-2xl font-bold text-gray-900">{{ lowStockCount }}</p>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-3 rounded-full bg-red-100 text-red-600">
							<FeatherIcon name="x-circle" class="w-6 h-6" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">Out of Stock</p>
							<p class="text-2xl font-bold text-gray-900">{{ outOfStockCount }}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Error Message -->
			<div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
				<div class="flex">
					<div class="flex-shrink-0">
						<FeatherIcon name="alert-circle" class="h-5 w-5 text-red-400" />
					</div>
					<div class="ml-3">
						<h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
					</div>
				</div>
			</div>

			<!-- Products Table -->
			<div class="bg-white rounded-lg shadow">
				<div class="p-6">
					<div class="flex justify-between items-center mb-4">
						<h3 class="text-lg font-semibold text-gray-900">All Products</h3>
						<div class="flex items-center space-x-4">
							<TextInput
								v-model="searchQuery"
								placeholder="Search products..."
								class="w-64"
								@input="loadProducts"
							/>
							<select
								v-model="selectedCategory"
								@change="loadProducts"
								class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
					</div>

					<!-- Loading State -->
					<div v-if="loading" class="flex justify-center items-center py-12">
						<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
						<span class="ml-2 text-gray-600">Loading products...</span>
					</div>

					<!-- Products Table -->
					<div v-else class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Product
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Category
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Price
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Stock
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Status
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Actions
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr v-for="product in filteredProducts" :key="product.name">
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex items-center">
											<div
												class="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0"
											>
												<FeatherIcon
													name="image"
													class="w-6 h-6 text-purple-400"
												/>
											</div>
											<div class="ml-4">
												<div class="text-sm font-medium text-gray-900">
													{{ product.product_name }}
												</div>
												<div class="text-sm text-gray-500">
													{{ product.description }}
												</div>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<Badge variant="secondary">{{ product.category }}</Badge>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm text-gray-900">
											₹{{ product.price }}
										</div>
										<div
											v-if="product.originalPrice"
											class="text-xs text-gray-500 line-through"
										>
											₹{{ product.originalPrice }}
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{{ product.stock_quantity }}
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<Badge :variant="getStockVariant(product.stock_quantity)">
											{{ getStockStatus(product.stock_quantity) }}
										</Badge>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<div class="flex items-center space-x-2">
											<Button
												variant="ghost"
												size="sm"
												@click="editProduct(product)"
											>
												<FeatherIcon name="edit" class="w-4 h-4" />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												@click="deleteProduct(product.name)"
											>
												<FeatherIcon
													name="trash-2"
													class="w-4 h-4 text-red-600"
												/>
											</Button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main>

		<!-- Add Product Modal -->
		<div
			v-if="showAddProductModal"
			class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
		>
			<div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
				<div class="mt-3">
					<h3 class="text-lg font-medium text-gray-900 mb-4">Add New Product</h3>

					<form @submit.prevent="addProduct" class="space-y-4">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2"
								>Product Name *</label
							>
							<TextInput
								v-model="newProduct.name"
								placeholder="Enter product name"
								required
							/>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2"
								>Description *</label
							>
							<TextInput
								v-model="newProduct.description"
								placeholder="Enter product description"
								required
							/>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>Price *</label
								>
								<TextInput
									v-model="newProduct.price"
									placeholder="Enter price"
									required
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>Original Price</label
								>
								<TextInput
									v-model="newProduct.originalPrice"
									placeholder="Enter original price"
								/>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>Category *</label
								>
								<select
									v-model="newProduct.category"
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
									required
								>
									<option value="">Select Category</option>
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
								<label class="block text-sm font-medium text-gray-700 mb-2"
									>Stock *</label
								>
								<TextInput
									v-model="newProduct.stock"
									type="number"
									placeholder="Enter stock quantity"
									required
								/>
							</div>
						</div>

						<div class="flex justify-end space-x-3 pt-4">
							<Button variant="outline" @click="showAddProductModal = false">
								Cancel
							</Button>
							<Button type="submit"> Add Product </Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import dashboardAPI from "../api/dashboard.js";
import productsAPI from "../api/products.js";

const products = ref([]);
const searchQuery = ref("");
const selectedCategory = ref("");
const showAddProductModal = ref(false);
const loading = ref(false);
const error = ref("");

const categories = ref(["Silk", "Cotton", "Designer", "Wedding", "Casual", "Party"]);

const newProduct = ref({
	name: "",
	description: "",
	price: "",
	originalPrice: "",
	category: "",
	stock: "",
});

const filteredProducts = computed(() => {
	let filtered = [...products.value];

	if (searchQuery.value) {
		filtered = filtered.filter(
			(product) =>
				product.product_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
		);
	}

	if (selectedCategory.value) {
		filtered = filtered.filter((product) => product.category === selectedCategory.value);
	}

	return filtered;
});

const inStockCount = computed(() => {
	return products.value.filter((p) => p.stock_quantity > 10).length;
});

const lowStockCount = computed(() => {
	return products.value.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= 10).length;
});

const outOfStockCount = computed(() => {
	return products.value.filter((p) => p.stock_quantity === 0).length;
});

const getStockVariant = (stock) => {
	if (stock === 0) return "danger";
	if (stock <= 10) return "warning";
	return "success";
};

const getStockStatus = (stock) => {
	if (stock === 0) return "Out of Stock";
	if (stock <= 10) return "Low Stock";
	return "In Stock";
};

const addProduct = async () => {
	loading.value = true;
	error.value = "";

	try {
		const result = await dashboardAPI.createProduct({
			product_name: newProduct.value.name,
			description: newProduct.value.description,
			category: newProduct.value.category,
			price: parseFloat(newProduct.value.price),
			original_price: newProduct.value.originalPrice ? parseFloat(newProduct.value.originalPrice) : null,
			stock_quantity: parseInt(newProduct.value.stock),
			featured: false,
		});

		if (result.success) {
			// Reset form
			newProduct.value = {
				name: "",
				description: "",
				price: "",
				originalPrice: "",
				category: "",
				stock: "",
			};

			showAddProductModal.value = false;
			
			// Reload products
			await loadProducts();
		} else {
			error.value = result.message;
		}
	} catch (err) {
		error.value = "Failed to create product. Please try again.";
		console.error("Add product error:", err);
	} finally {
		loading.value = false;
	}
};

const editProduct = (product) => {
	console.log("Edit product:", product.name);
	// TODO: Implement edit functionality
};

const deleteProduct = async (productId) => {
	if (confirm("Are you sure you want to delete this product?")) {
		loading.value = true;
		error.value = "";

		try {
			const result = await dashboardAPI.deleteProduct(productId);
			
			if (result.success) {
				// Reload products
				await loadProducts();
			} else {
				error.value = result.message;
			}
		} catch (err) {
			error.value = "Failed to delete product. Please try again.";
			console.error("Delete product error:", err);
		} finally {
			loading.value = false;
		}
	}
};

const loadProducts = async () => {
	loading.value = true;
	error.value = "";

	try {
		const result = await productsAPI.getProducts({
			category: selectedCategory.value,
			search: searchQuery.value,
			limit: 100,
		});

		if (result.success) {
			products.value = result.data || [];
		} else {
			error.value = result.message;
		}
	} catch (err) {
		error.value = "Failed to load products. Please try again.";
		console.error("Load products error:", err);
	} finally {
		loading.value = false;
	}
};

const loadCategories = async () => {
	try {
		const result = await productsAPI.getCategories();
		if (result.success) {
			categories.value = result.data || [];
		}
	} catch (err) {
		console.error("Load categories error:", err);
	}
};

onMounted(async () => {
	await loadCategories();
	await loadProducts();
});
</script>
