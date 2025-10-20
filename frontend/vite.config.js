import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { VitePWA } from 'vite-plugin-pwa';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			script: {
				propsDestructure: true,
			},
		}),
		vueJsx(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'pwa-192x192.png', 'pwa-512x512.png'],
			manifest: {
				name: 'Draped Dreams',
				short_name: 'DrapedDreams',
				description: 'Elegant Sarees for Every Occasion',
				theme_color: '#8B5CF6',
				background_color: '#FFFFFF',
				display: 'standalone',
				orientation: 'portrait',
				scope: '/',
				start_url: '/',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css}'],
				runtimeCaching: [
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'images-cache',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 7
							}
						}
					}
				]
			}
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	build: {
		outDir: "dist",
		assetsDir: "assets",
		base: "/files/",
		rollupOptions: {
			output: {
				manualChunks: undefined,
				// Ensure dynamic imports work with relative paths
				chunkFileNames: 'assets/[name]-[hash].js',
				entryFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash].[ext]'
			},
		},
	},
	server: {
		port: 3001,
		host: true,
		proxy: {
			"/api": {
				target: "http://localhost:8000",
				changeOrigin: true,
			},
		},
	},
});
