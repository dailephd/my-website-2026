import { expect, test } from '@playwright/test';

import { DEFAULT_PALETTE, PALETTE_STORAGE_KEY, THEME_STORAGE_KEY } from '../../src/lib/constants';

// The optional performance configuration owns the production server and URL.
// Development compilation is not a reproducible page-load measurement.
for (const width of [390, 1440]) {
  for (const route of ['/', '/projects/my-dev-kit']) {
    test(`appearance performance budget ${width}px ${route}`, async ({ browser, baseURL }, testInfo) => {
      const samples: { lcp: number; cls: number }[] = [];
      for (let run = 0; run < 3; run += 1) {
        const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 } });
        try {
          const page = await context.newPage();
          await page.addInitScript(({ palette, paletteKey, themeKey }) => {
            localStorage.setItem(paletteKey, palette);
            localStorage.setItem(themeKey, 'light');
            const metrics = { lcp: 0, cls: 0 };
            Object.assign(window, { appearanceMetrics: metrics });
            new PerformanceObserver(list => {
              for (const entry of list.getEntries()) metrics.lcp = entry.startTime;
            }).observe({ type: 'largest-contentful-paint', buffered: true });
            new PerformanceObserver(list => {
              for (const entry of list.getEntries()) {
                const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
                if (!shift.hadRecentInput) metrics.cls += shift.value;
              }
            }).observe({ type: 'layout-shift', buffered: true });
          }, { palette: DEFAULT_PALETTE, paletteKey: PALETTE_STORAGE_KEY, themeKey: THEME_STORAGE_KEY });
          const cdp = await context.newCDPSession(page);
          await cdp.send('Network.enable');
          await cdp.send('Network.emulateNetworkConditions', {
            offline: false, latency: 40, downloadThroughput: 1250000, uploadThroughput: 625000,
          });
          await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
          await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(1000);
          samples.push(await page.evaluate(() => (window as unknown as {
            appearanceMetrics: { lcp: number; cls: number };
          }).appearanceMetrics));
        } finally {
          await context.close();
        }
      }
      await testInfo.attach('performance-samples', { body: JSON.stringify(samples), contentType: 'application/json' });
      const median = (key: 'lcp' | 'cls') => samples.map(sample => sample[key]).sort((a, b) => a - b)[1];
      expect(median('lcp')).toBeGreaterThan(0);
      expect(median('lcp')).toBeLessThan(2500);
      expect(median('cls')).toBeLessThan(0.1);
    });
  }
}
