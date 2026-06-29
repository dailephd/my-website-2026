import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['tests/content/**/*.test.{ts,tsx}', 'tests/accessibility/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
});
