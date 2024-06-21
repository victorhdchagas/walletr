import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8844,
  },
  resolve: {
    alias: [
      { find: '@core', replacement: '/src/@core' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@components', replacement: '/src/components' },
      { find: '@contexts', replacement: '/src/context' },
      { find: '@templates', replacement: '/src/templates' },
    ],
  },
})
