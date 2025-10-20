<template>
	<svg
		:class="iconClasses"
		:width="size"
		:height="size"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			v-if="iconPaths[name]"
			:d="iconPaths[name]"
			stroke-linecap="round"
			stroke-linejoin="round"
			:stroke-width="strokeWidth"
		/>
		<path
			v-else
			d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
			stroke-linecap="round"
			stroke-linejoin="round"
			:stroke-width="strokeWidth"
			opacity="0.3"
		/>
	</svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	size: {
		type: [String, Number],
		default: 24,
	},
	strokeWidth: {
		type: [String, Number],
		default: 2,
	},
	class: String,
});

const iconClasses = computed(() => {
	return props.class || "";
});

// Common Feather icons
const iconPaths = {
	"user-plus": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
	user: "M20 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
	mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
	phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
	lock: "M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z",
	"check-circle": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
	"alert-circle": "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
	home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	"shopping-bag": "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z",
	"shopping-cart": "M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8",
	plus: "M12 5v14m7-7H5",
	heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
	search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
	star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
	image: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
	package: "M12.89 1.45l8 4L20 11.24l-7.11 3.56L12 8.76l-7.11 6.04L4 11.24l-.89-5.79 8-4zM12 2.5L5.5 5.5L12 8.5L18.5 5.5L12 2.5z",
	"log-out": "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m-5 5h12",
    "chevron-left": "M15 18l-6-6 6-6",
    "chevron-right": "M9 18l6-6-6-6",
    settings: "M12 8a4 4 0 100 8 4 4 0 000-8zm8.94 4a7.94 7.94 0 00-.34-2l2.11-1.65-2-3.46-2.49 1A8.06 8.06 0 0016.9 2h-3.8l-.37 2.89a7.94 7.94 0 00-2 0L8.37 2H4.57a8.06 8.06 0 00-1.32 1.89l-2.49-1-2 3.46L.87 10a7.94 7.94 0 000 2l-2.11 1.65 2 3.46 2.49-1A8.06 8.06 0 004.57 22h3.8l.37-2.89a7.94 7.94 0 002 0L12.1 22h3.8a8.06 8.06 0 001.32-1.89l2.49 1 2-3.46L20.6 14a7.94 7.94 0 00.34-2z"
};

// Debug: Log missing icons
if (!iconPaths[props.name]) {
	console.warn(
		`FeatherIcon: Icon "${props.name}" not found. Available icons:`,
		Object.keys(iconPaths)
	);
}
</script>
