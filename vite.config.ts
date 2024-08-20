import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
				index: "index.html",
				edit: "edit.html",
				display: "display.html",
				"404": "404.html",
			},
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
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
