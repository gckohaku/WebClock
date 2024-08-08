import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	base: '/WebClock/',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	appType: "mpa",
	build: {
		outDir: 'docs',
		target: "esnext",
		rollupOptions: {
			input: {
				index: "./pages/index.html",
				edit: "./pages/edit/edit.html",
				display: "./pages/display/display.html",
				404: "./pages/404.html",
			},
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
			}
		},
	},
	server: {
		open: "/WebClock/pages/"
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData:
					`@import "@/common/styles/mixins.scss";`
			}
		}
	}
})
