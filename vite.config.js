import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow serving files from the parent directory (for Assites/)
    fs: {
      allow: ['..'],
    },
  },
})
