/* eslint-disable no-undef */
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8080
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@processes': path.resolve(__dirname, 'src/processes'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
});

