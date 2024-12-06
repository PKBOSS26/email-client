import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',  // Make sure the root directory is properly set, this helps with file handling
  base: '/',   // Set the base path for the assets, especially in a Docker environment

  server: {
    host: '0.0.0.0', // Ensures the dev server binds to all interfaces (necessary for Docker)
    port: 3000,
  },

  build: {
    outDir: 'dist',  // The output directory for build artifacts
    assetsDir: 'assets',  // Specify asset directory for static files
  },
})
