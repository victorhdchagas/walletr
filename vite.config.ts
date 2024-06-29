import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]],
      },
    }),
  ],
  server: {
    port: 8844,
  },
  resolve: {
    alias: [
      { find: '@core', replacement: '/src/@core' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@components', replacement: '/src/components' },
      { find: '@contexts', replacement: '/src/context' },
      { find: '@lib', replacement: '/src/lib' },
      { find: '@templates', replacement: '/src/templates' },
    ],
  },
})
