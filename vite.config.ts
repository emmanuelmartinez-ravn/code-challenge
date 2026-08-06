import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(import.meta.dirname, './src/app'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
      '@core': path.resolve(import.meta.dirname, './src/core'),
      '@features': path.resolve(import.meta.dirname, './src/features'),
      '@shared': path.resolve(import.meta.dirname, './src/shared'),
      '@constants': path.resolve(import.meta.dirname, './src/constants'),
      '@graphql': path.resolve(import.meta.dirname, './src/graphql'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
