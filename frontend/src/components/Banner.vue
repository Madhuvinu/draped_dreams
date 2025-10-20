<template>
	<div class="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg">
		<!-- Banner Images -->
		<div 
			v-for="(banner, index) in banners" 
			:key="banner.id"
			:class="[
				'absolute inset-0 transition-opacity duration-1000 ease-in-out',
				currentIndex === index ? 'opacity-100' : 'opacity-0'
			]"
		>
			<img 
				:src="banner.image" 
				:alt="banner.title"
				class="w-full h-full object-cover"
			/>
			<!-- Overlay -->
			<div class="absolute inset-0 bg-black bg-opacity-30"></div>
			
			<!-- Banner Content -->
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="text-center text-white px-4">
					<h2 class="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
						{{ banner.title }}
					</h2>
					<p class="text-lg md:text-xl lg:text-2xl mb-6 max-w-2xl">
						{{ banner.subtitle }}
					</p>
					<Button 
						v-if="banner.button_text"
						variant="primary" 
						size="lg"
						@click="handleBannerClick(banner)"
						class="bg-white text-purple-600 hover:bg-gray-100"
					>
						{{ banner.button_text }}
					</Button>
				</div>
			</div>
		</div>

		<!-- Loading State -->
		<div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-200">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
		</div>

		<!-- Error State -->
		<div v-if="error && !loading" class="absolute inset-0 flex items-center justify-center bg-gray-200">
			<div class="text-center">
				<FeatherIcon name="image" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
				<p class="text-gray-600">Failed to load banners</p>
			</div>
		</div>

		<!-- Navigation Dots -->
		<div v-if="banners.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
			<button
				v-for="(banner, index) in banners"
				:key="`dot-${banner.id}`"
				@click="currentIndex = index"
				:class="[
					'w-3 h-3 rounded-full transition-colors duration-300',
					currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
				]"
			></button>
		</div>

		<!-- Navigation Arrows -->
		<div v-if="banners.length > 1" class="absolute inset-y-0 left-0 flex items-center">
			<button
				@click="previousBanner"
				class="ml-4 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all"
			>
				<FeatherIcon name="chevron-left" class="w-6 h-6" />
			</button>
		</div>
		<div v-if="banners.length > 1" class="absolute inset-y-0 right-0 flex items-center">
			<button
				@click="nextBanner"
				class="mr-4 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all"
			>
				<FeatherIcon name="chevron-right" class="w-6 h-6" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/Button.vue';
import FeatherIcon from '@/components/FeatherIcon.vue';
import bannersAPI from '@/api/banners.js';

const router = useRouter();

// Reactive data
const banners = ref([]);
const currentIndex = ref(0);
const loading = ref(true);
const error = ref('');
let autoSlideInterval = null;

// Methods
const loadBanners = async () => {
	loading.value = true;
	error.value = '';

	try {
		const result = await bannersAPI.getBanners();
		if (result.success) {
			banners.value = result.data.filter(banner => banner.is_active);
			console.log('Loaded banners:', banners.value);
		} else {
			error.value = result.message || 'Failed to load banners';
		}
	} catch (err) {
		error.value = 'Failed to load banners';
		console.error('Load banners error:', err);
	} finally {
		loading.value = false;
	}
};

const nextBanner = () => {
	if (banners.value.length > 1) {
		currentIndex.value = (currentIndex.value + 1) % banners.value.length;
	}
};

const previousBanner = () => {
	if (banners.value.length > 1) {
		currentIndex.value = currentIndex.value === 0 
			? banners.value.length - 1 
			: currentIndex.value - 1;
	}
};

const startAutoSlide = () => {
	if (banners.value.length > 1) {
		autoSlideInterval = setInterval(nextBanner, 5000); // Change every 5 seconds
	}
};

const stopAutoSlide = () => {
	if (autoSlideInterval) {
		clearInterval(autoSlideInterval);
		autoSlideInterval = null;
	}
};

const handleBannerClick = (banner) => {
	if (banner.link) {
		if (banner.link.startsWith('http')) {
			window.open(banner.link, '_blank');
		} else {
			router.push(banner.link);
		}
	}
};

// Lifecycle
onMounted(async () => {
	await loadBanners();
	if (banners.value.length > 1) {
		startAutoSlide();
	}
});

onUnmounted(() => {
	stopAutoSlide();
});
</script>
