import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('recharts') || id.includes('d3')) {
              return 'charts';
            }
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            if (id.includes('lucide-react') || id.includes('@radix-ui')) {
              return 'icons-ui';
            }
            return 'vendor';
          }
        },
      },
    },
    sourcemap: false,
    reportCompressedSize: false,
  },
  plugins: [
    tsconfigPaths(),
    react({
      jsxRuntime: 'automatic',
    }),
    tagger(),
  ],
  server: {
    port: "3000",
    host: "0.0.0.0",
    strictPort: false,
    hmr: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@dhiwise/component-tagger'],
  },
});