<template>
	<div class="p-4 md:p-6">
		<!-- Page Title -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Orders</h1>
			<p class="text-gray-600 mt-2">Manage and track your orders</p>
		</div>

		<!-- Orders Content -->
		<div class="bg-white rounded-lg shadow p-6">
			<div class="text-center py-12">
				<div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<FeatherIcon name="package" class="w-8 h-8 text-purple-600" />
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">Orders Management</h3>
				<p class="text-gray-600 mb-6">This page will show all your orders and their status.</p>
				<div class="flex space-x-4 justify-center">
					<Button 
						@click="$router.push('/products')"
						class="bg-purple-600 hover:bg-purple-700 text-white"
					>
						<FeatherIcon name="shopping-bag" class="w-4 h-4 mr-2" />
						Start Shopping
					</Button>
					<Button 
						@click="$router.push('/cart')"
						variant="outline"
						class="border-purple-600 text-purple-600 hover:bg-purple-50"
					>
						<FeatherIcon name="shopping-cart" class="w-4 h-4 mr-2" />
						View Cart
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import FeatherIcon from '@/components/FeatherIcon.vue'

const router = useRouter()
</script>
