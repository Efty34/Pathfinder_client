import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/Pathfinder_client",
  resolve: {
    alias: {
      '@': path.resolve('src'),
    }
  }
})
