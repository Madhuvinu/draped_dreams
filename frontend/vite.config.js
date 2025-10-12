import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
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
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	build: {
		outDir: "dist",
		assetsDir: "assets",
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
		},
	},
	server: {
		port: 3001,
		proxy: {
			"/api": {
				target: "http://localhost:8002",
				changeOrigin: true,
			},
		},
	},
});
