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
						<Button variant="ghost" size="sm">
							<FeatherIcon name="bell" class="w-5 h-5" />
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
			<!-- Welcome Section -->
			<div
				class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white mb-8"
			>
				<h2 class="text-3xl font-bold mb-2">Welcome to Draped Dreams Admin</h2>
				<p class="text-lg opacity-90">Manage your saree e-commerce business</p>
			</div>

			<!-- Stats Cards -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-3 rounded-full bg-blue-100 text-blue-600">
							<FeatherIcon name="shopping-bag" class="w-6 h-6" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">Total Sarees</p>
							<p class="text-2xl font-bold text-gray-900">1,247</p>
							<p class="text-xs text-green-600">+12% from last month</p>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-3 rounded-full bg-green-100 text-green-600">
							<FeatherIcon name="users" class="w-6 h-6" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">Total Customers</p>
							<p class="text-2xl font-bold text-gray-900">892</p>
							<p class="text-xs text-green-600">+8% from last month</p>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
							<FeatherIcon name="shopping-cart" class="w-6 h-6" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">Total Orders</p>
							<p class="text-2xl font-bold text-gray-900">2,156</p>
							<p class="text-xs text-green-600">+15% from last month</p>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-3 rounded-full bg-purple-100 text-purple-600">
							<FeatherIcon name="dollar-sign" class="w-6 h-6" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">Total Revenue</p>
							<p class="text-2xl font-bold text-gray-900">₹45,67,890</p>
							<p class="text-xs text-green-600">+18% from last month</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Quick Actions -->
			<div class="bg-white rounded-lg shadow p-6 mb-8">
				<h3 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<Button
						variant="outline"
						class="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-300"
					>
						<FeatherIcon name="plus" class="w-6 h-6 text-purple-600" />
						<span class="text-purple-600 font-medium">Add New Saree</span>
					</Button>

					<Button
						variant="outline"
						class="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-300"
					>
						<FeatherIcon name="shopping-cart" class="w-6 h-6 text-green-600" />
						<span class="text-green-600 font-medium">Manage Orders</span>
					</Button>

					<Button
						variant="outline"
						class="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
					>
						<FeatherIcon name="users" class="w-6 h-6 text-blue-600" />
						<span class="text-blue-600 font-medium">View Customers</span>
					</Button>

					<Button
						variant="outline"
						class="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-300"
					>
						<FeatherIcon name="bar-chart-2" class="w-6 h-6 text-orange-600" />
						<span class="text-orange-600 font-medium">Sales Reports</span>
					</Button>
				</div>
			</div>

			<!-- Recent Orders -->
			<div class="bg-white rounded-lg shadow p-6">
				<h3 class="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h3>
				<div class="space-y-3">
					<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
						<div class="flex items-center space-x-3">
							<div class="p-2 rounded-full bg-purple-100">
								<FeatherIcon
									name="shopping-cart"
									class="w-4 h-4 text-purple-600"
								/>
							</div>
							<div>
								<p class="text-sm font-medium text-gray-900">Order #DD-2024-001</p>
								<p class="text-xs text-gray-500">Priya Sharma • 2 hours ago</p>
							</div>
						</div>
						<div class="text-right">
							<p class="text-sm font-medium text-gray-900">₹18,500</p>
							<Badge variant="info">Processing</Badge>
						</div>
					</div>

					<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
						<div class="flex items-center space-x-3">
							<div class="p-2 rounded-full bg-purple-100">
								<FeatherIcon
									name="shopping-cart"
									class="w-4 h-4 text-purple-600"
								/>
							</div>
							<div>
								<p class="text-sm font-medium text-gray-900">Order #DD-2024-002</p>
								<p class="text-xs text-gray-500">Anita Patel • 4 hours ago</p>
							</div>
						</div>
						<div class="text-right">
							<p class="text-sm font-medium text-gray-900">₹25,000</p>
							<Badge variant="success">Completed</Badge>
						</div>
					</div>

					<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
						<div class="flex items-center space-x-3">
							<div class="p-2 rounded-full bg-purple-100">
								<FeatherIcon
									name="shopping-cart"
									class="w-4 h-4 text-purple-600"
								/>
							</div>
							<div>
								<p class="text-sm font-medium text-gray-900">Order #DD-2024-003</p>
								<p class="text-xs text-gray-500">Sunita Reddy • 6 hours ago</p>
							</div>
						</div>
						<div class="text-right">
							<p class="text-sm font-medium text-gray-900">₹12,000</p>
							<Badge variant="warning">Pending</Badge>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
// Dashboard component
</script>
