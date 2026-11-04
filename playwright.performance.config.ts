import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:3101';

// Optional production measurements; the ordinary suite keeps its dev server.
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/appearance-performance.spec.ts',
  outputDir: './.my-dev-kit-workflow/tmp/performance-tests',
  workers: 1,
  webServer: {
    command: 'npm run build && npm run start -- --hostname 127.0.0.1 --port 3101',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  use: {
    baseURL,
    browserName: 'chromium',
  },
});
