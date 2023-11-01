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
	build: {
		outDir: 'docs',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				404: resolve(__dirname, '404.html')
			},
			output: {
				assetFileNames: `assets/[name]-[hash].[ext]`,
			}
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
