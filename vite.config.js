import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // Enable minification with terser for smaller bundles
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    },
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunk for Vue
          'vue-vendor': ['vue']
        },
        // Use content hashes for cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Warn on large chunks
    chunkSizeWarningLimit: 500,
    // Enable source maps for debugging (optional)
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true
  },
  // Preview server configuration for SPA routing
  preview: {
    port: 4173,
    strictPort: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue']
  }
})
