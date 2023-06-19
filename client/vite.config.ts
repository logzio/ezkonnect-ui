import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
	},
	server: {
		watch: {
			usePolling: true,
		},
		host: true, // Here
		strictPort: true,
	},
	plugins: [react(), svgr({
		svgrOptions: {
			// svgr options
		},
	}),],

})
