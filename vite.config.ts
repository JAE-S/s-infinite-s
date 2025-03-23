import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

// Get the current directory equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    define: {
      // Make environment variables available to the client-side code
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      target: 'esnext',
      sourcemap: true,
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor code for better caching
            react: ['react', 'react-dom'],
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      hmr: true,
    },
    // Optimize performance
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  };
});
