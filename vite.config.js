import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any path aliases if needed
    },
  },
  build: {
    rollupOptions: {
      external: [
        // Add any external dependencies that should not be bundled
      ],
      output: {
        manualChunks: {
          // Split vendor and app code
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Increase the build chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
