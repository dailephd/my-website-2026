import { expect, test, type Page } from '@playwright/test';

const seed = async (page: Page, mode: 'light' | 'dark') => {
  await page.addInitScript((theme) => {
    localStorage.setItem('my-website-2026-palette', 'original');
    localStorage.setItem('my-website-2026-theme', theme);
  }, mode);
};

const contrast = (a: string, b: string) => {
  const luminance = (color: string) => {
    const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [];
    const [r, g, blue] = channels.map((value) => {
      const channel = value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * blue;
  };
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};

for (const mode of ['light', 'dark'] as const) {
  test(`Violet & Graphite ${mode} functional colors meet computed contrast`, async ({ page }) => {
    await seed(page, mode);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/projects');
    await expect(page.locator('html')).toHaveAttribute('data-palette', 'original');
    await expect(page.locator('html')).toHaveAttribute('data-theme', mode);

    const samples = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const find = (selector: string) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) throw new Error(`Missing contrast sample: ${selector}`);
        return element;
      };
      const background = (element: HTMLElement) => {
        let current: HTMLElement | null = element;
        while (current) {
          const color = getComputedStyle(current).backgroundColor;
          if (color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') return color;
          current = current.parentElement;
        }
        return getComputedStyle(document.body).backgroundColor;
      };
      const text = (selector: string) => {
        const element = find(selector);
        return { foreground: getComputedStyle(element).color, background: background(element) };
      };
      const mutedToken = (() => {
        const probe = document.createElement('span');
        probe.style.color = 'var(--color-text-muted)';
        document.body.append(probe);
        const value = getComputedStyle(probe).color;
        probe.remove();
        return value;
      })();
      const mutedElement = Array.from(document.querySelectorAll<HTMLElement>('main p')).find(
        (element) => getComputedStyle(element).color === mutedToken,
      );
      if (!mutedElement) throw new Error('No rendered muted text sample found');
      const mutedText = { foreground: getComputedStyle(mutedElement).color, background: background(mutedElement) };
      const boundary = (selector: string) => {
        const element = find(selector);
        return { foreground: getComputedStyle(element).borderTopColor, background: background(element) };
      };
      return {
        bodyText: text('main p'),
        mutedText,
        accentLink: text('main a'),
        appearanceBoundary: boundary('[data-appearance-trigger]'),
        focusToken: root.getPropertyValue('--color-focus-ring').trim(),
        functionalAccent: root.getPropertyValue('--color-accent-primary-text').trim(),
        historicalAccent: root.getPropertyValue('--color-accent-primary').trim(),
      };
    });

    for (const role of ['bodyText', 'mutedText', 'accentLink'] as const) {
      expect(contrast(samples[role].foreground, samples[role].background), role).toBeGreaterThanOrEqual(4.5);
    }
    for (const role of ['appearanceBoundary'] as const) {
      expect(contrast(samples[role].foreground, samples[role].background), role).toBeGreaterThanOrEqual(3);
    }
    expect(samples.functionalAccent).toBe(mode === 'light' ? '#006d82' : samples.historicalAccent);

    const trigger = page.getByRole('button', { name: /^Appearance/ });
    await page.keyboard.press('Tab');
    for (let i = 0; i < 20; i += 1) {
      if (await trigger.evaluate((element) => document.activeElement === element)) break;
      await page.keyboard.press('Tab');
    }
    const focus = await trigger.evaluate((element) => {
      const style = getComputedStyle(element);
      return { color: style.outlineColor, width: style.outlineWidth, style: style.outlineStyle };
    });
    expect(focus.style).not.toBe('none');
    expect(parseFloat(focus.width)).toBeGreaterThanOrEqual(2);
    expect(contrast(focus.color, samples.appearanceBoundary.background)).toBeGreaterThanOrEqual(3);

    await page.goto('/contact');
    const formSamples = await page.evaluate(() => {
      const field = document.querySelector<HTMLElement>('#senderEmail');
      const submit = document.querySelector<HTMLElement>('form button[type="submit"]');
      if (!field || !submit) throw new Error('Contact form controls are missing');
      const style = (element: HTMLElement) => {
        const computed = getComputedStyle(element);
        return {
          color: computed.color,
          background: computed.backgroundColor,
          border: computed.borderTopColor,
        };
      };
      return { field: style(field), submit: style(submit) };
    });
    expect(contrast(formSamples.field.color, formSamples.field.background)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(formSamples.field.border, formSamples.field.background)).toBeGreaterThanOrEqual(3);
    expect(contrast(formSamples.submit.color, formSamples.submit.background)).toBeGreaterThanOrEqual(4.5);

    await page.goto('/projects/my-dev-kit');
    const diagram = await page.evaluate(() => {
      const canvas = document.querySelector<HTMLElement>('[data-diagram="my-dev-kit-ecosystem"]');
      const label = canvas?.querySelector<HTMLElement>('[data-diagram-node]');
      const connector = canvas?.querySelector<SVGPathElement>('path[class*="diagram-connector"]');
      if (!canvas || !label || !connector) throw new Error('Ecosystem diagram contrast samples are missing');
      return {
        label: { color: getComputedStyle(label).color, background: getComputedStyle(label).backgroundColor },
        connector: { color: getComputedStyle(connector).stroke, background: getComputedStyle(canvas).backgroundColor },
      };
    });
    expect(contrast(diagram.label.color, diagram.label.background)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(diagram.connector.color, diagram.connector.background)).toBeGreaterThanOrEqual(3);
  });
}
