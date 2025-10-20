import "./index.css";

import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";

// PWA functionality
import { registerSW } from 'virtual:pwa-register';

// Register service worker
if ('serviceWorker' in navigator) {
  registerSW({
    onNeedRefresh() {
      console.log('New content available, refresh needed');
      // Show update notification to user
      if (confirm('New version available! Refresh to update?')) {
        window.location.reload();
      }
    },
    onOfflineReady() {
      console.log('App ready to work offline');
    },
    onRegistered(registration) {
      console.log('Service worker registered:', registration);
    },
    onRegisterError(error) {
      console.log('Service worker registration failed:', error);
    }
  });
}

// Simple components for basic functionality
const Button = {
	name: "Button",
	props: {
		variant: { type: String, default: "primary" },
		size: { type: String, default: "md" },
		loading: { type: Boolean, default: false },
	},
	template: `
    <button
      :class="buttonClasses"
      :disabled="loading"
      @click="$emit('click')"
    >
      <span v-if="loading">Loading...</span>
      <slot v-else></slot>
    </button>
  `,
	computed: {
		buttonClasses() {
			const base = "px-4 py-2 rounded font-medium transition-colors";
			const variants = {
				primary: "bg-purple-600 text-white hover:bg-purple-700",
				secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
				ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
				outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
			};
			const sizes = {
				sm: "px-3 py-1 text-sm",
				md: "px-4 py-2",
				lg: "px-6 py-3 text-lg",
			};
			return `${base} ${variants[this.variant]} ${sizes[this.size]}`;
		},
	},
};

const TextInput = {
	name: "TextInput",
	props: {
		modelValue: String,
		type: { type: String, default: "text" },
		placeholder: String,
		required: Boolean,
	},
	emits: ["update:modelValue"],
	template: `
    <input
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
    />
  `,
};

const Badge = {
	name: "Badge",
	props: {
		variant: { type: String, default: "secondary" },
	},
	template: `
    <span :class="badgeClasses">
      <slot></slot>
    </span>
  `,
	computed: {
		badgeClasses() {
			const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
			const variants = {
				success: "bg-green-100 text-green-800",
				warning: "bg-yellow-100 text-yellow-800",
				danger: "bg-red-100 text-red-800",
				info: "bg-blue-100 text-blue-800",
				secondary: "bg-gray-100 text-gray-800",
			};
			return `${base} ${variants[this.variant]}`;
		},
	},
};

const FeatherIcon = {
	name: "FeatherIcon",
	props: {
		name: String,
	},
	template: `
    <i :data-feather="name" class="w-4 h-4"></i>
  `,
	mounted() {
		if (window.feather) {
			window.feather.replace();
		}
	},
};

let globalComponents = {
	Button,
	TextInput,
	Badge,
	FeatherIcon,
};

// create a pinia instance
let pinia = createPinia();

let app = createApp(App);

app.use(pinia);
app.use(router);

for (let key in globalComponents) {
	app.component(key, globalComponents[key]);
}

app.mount("#app");
