import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import path from 'path';

// Date for reports
const dateStamp = new Date().toISOString().split('T')[0];

// Create results directory if it doesn't exist
import fs from 'fs';
const resultsDir = path.resolve('./src/test/results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'], // Make sure this is an array for multiple setup files
    include: ['**/*.{test,spec}.{ts,tsx}'],
    reporters: ['default', 'json'],
    outputFile: {
      json: `./src/test/results/${dateStamp}-test-results.json`,
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: `./src/test/results/coverage-${dateStamp}`,
      // Keep coverage history
      all: true,
      // Ensure comprehensive coverage reporting
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    // Store test runtime history
    benchmark: {
      outputFile: './src/test/results/benchmark.json',
    },
    // For snapshot testing
    snapshotFormat: {
      printBasicPrototype: false,
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
