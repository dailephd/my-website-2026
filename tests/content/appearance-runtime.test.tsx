// @vitest-environment jsdom
import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import AppearanceControl from '@/components/theme/AppearanceControl';
import ThemeProvider from '@/components/theme/ThemeProvider';
import { themeInitializationScript } from '@/components/theme/theme-script';
import {
  PALETTE_IDS,
  PALETTE_STORAGE_KEY,
  THEME_PREFERENCES,
  THEME_STORAGE_KEY,
} from '@/lib/constants';
import { applyAppearance } from '@/lib/theme';

type MediaListener = (event: { matches: boolean }) => void;

let systemDark = false;
let mediaListeners: MediaListener[] = [];

function stubMatchMedia() {
  const matchMedia = (query: string) => ({
    matches: query.includes('dark') ? systemDark : false,
    media: query,
    addEventListener: (_: string, listener: MediaListener) => {
      mediaListeners.push(listener);
    },
    removeEventListener: (_: string, listener: MediaListener) => {
      mediaListeners = mediaListeners.filter((item) => item !== listener);
    },
  });
  vi.stubGlobal('matchMedia', matchMedia);
  window.matchMedia = matchMedia as unknown as typeof window.matchMedia;
}

function rootState() {
  const root = document.documentElement;
  return {
    dark: root.classList.contains('dark'),
    theme: root.dataset.theme,
    preference: root.dataset.themePreference,
    palette: root.dataset.palette,
  };
}

function resetRoot() {
  const root = document.documentElement;
  root.className = '';
  for (const key of ['theme', 'themePreference', 'palette']) delete root.dataset[key];
}

beforeEach(() => {
  systemDark = false;
  mediaListeners = [];
  window.localStorage.clear();
  resetRoot();
  stubMatchMedia();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('pre-hydration script', () => {
  const run = () => new Function(themeInitializationScript)();

  it('applies mineral / system before React hydrates when nothing is stored', () => {
    run();
    expect(rootState()).toEqual({
      dark: false,
      theme: 'light',
      preference: 'system',
      palette: 'mineral',
    });
  });

  it('ignores the obsolete effects storage key', () => {
    window.localStorage.setItem('my-website-2026-fx', 'expressive');
    const getItem = vi.spyOn(Storage.prototype, 'getItem');
    run();
    expect(getItem).not.toHaveBeenCalledWith('my-website-2026-fx');
    expect(rootState()).toMatchObject({ palette: 'mineral', theme: 'light' });
    expect(document.documentElement.hasAttribute('data-fx')).toBe(false);
  });

  it('follows the system preference and keeps the dark class', () => {
    systemDark = true;
    run();
    expect(rootState()).toMatchObject({ dark: true, theme: 'dark', preference: 'system' });
  });

  it('restores valid persisted selections', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    window.localStorage.setItem(PALETTE_STORAGE_KEY, 'amber');
    window.localStorage.setItem('my-website-2026-fx', 'expressive');
    run();
    expect(rootState()).toEqual({
      dark: true,
      theme: 'dark',
      preference: 'dark',
      palette: 'amber',
    });
    expect(document.documentElement.hasAttribute('data-fx')).toBe(false);
  });

  it('restores the original palette independently of color mode', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
    window.localStorage.setItem(PALETTE_STORAGE_KEY, 'original');
    run();
    expect(rootState()).toEqual({
      dark: false,
      theme: 'light',
      preference: 'light',
      palette: 'original',
    });
  });

  it('rejects invalid persisted values', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
    window.localStorage.setItem(PALETTE_STORAGE_KEY, 'violet');
    run();
    expect(rootState()).toEqual({
      dark: false,
      theme: 'light',
      preference: 'system',
      palette: 'mineral',
    });
  });

  it('agrees with applyAppearance for every palette, mode and system preference', () => {
    for (const dark of [false, true]) {
      for (const palette of PALETTE_IDS) {
        for (const theme of THEME_PREFERENCES) {
          systemDark = dark;
          window.localStorage.setItem(THEME_STORAGE_KEY, theme);
          window.localStorage.setItem(PALETTE_STORAGE_KEY, palette);
          resetRoot();
          run();
          const fromScript = rootState();
          resetRoot();
          applyAppearance(document.documentElement, { palette, theme }, dark);
          expect(fromScript).toEqual(rootState());
        }
      }
    }
  });
});

function renderControl() {
  return render(
    <ThemeProvider>
      <AppearanceControl />
    </ThemeProvider>,
  );
}

const radio = (name: string) => screen.getByRole('radio', { name }) as HTMLInputElement;
const trigger = () => screen.getByRole('button', { name: /^Appearance/ });

describe('ThemeProvider + AppearanceControl', () => {
  it('opens a labelled dialog with palette and color mode groups', () => {
    renderControl();
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Appearance settings' })).toBeInTheDocument();
    for (const legend of ['Palette', 'Color mode']) {
      expect(screen.getByRole('group', { name: legend })).toBeInTheDocument();
    }
    expect(screen.getAllByRole('radio')).toHaveLength(6 + 3);
  });

  it('moves focus into the dialog on open and back to the trigger on Escape', () => {
    renderControl();
    fireEvent.click(trigger());
    expect(document.activeElement).toBe(radio('Mineral Research'));

    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger());
  });

  it('closes on the Close button and restores focus', () => {
    renderControl();
    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger());
  });

  it('closes on outside pointer down', () => {
    renderControl();
    fireEvent.click(trigger());
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('changes each setting independently and persists it', () => {
    renderControl();
    fireEvent.click(trigger());

    fireEvent.click(radio('Signal Green'));
    expect(rootState()).toMatchObject({ palette: 'signal', preference: 'system' });
    expect(window.localStorage.getItem(PALETTE_STORAGE_KEY)).toBe('signal');

    fireEvent.click(radio('Dark'));
    expect(rootState()).toMatchObject({ palette: 'signal', theme: 'dark', preference: 'dark', dark: true });
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.hasAttribute('data-fx')).toBe(false);
    expect(window.localStorage.getItem('my-website-2026-fx')).toBeNull();


    fireEvent.click(radio('Cobalt & Terracotta'));
    expect(rootState()).toMatchObject({ palette: 'cobalt', preference: 'dark', dark: true });
    expect(radio('Dark').checked).toBe(true);
  });

  it('restores persisted selections on mount', () => {
    window.localStorage.setItem(PALETTE_STORAGE_KEY, 'oxblood');
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    renderControl();
    fireEvent.click(trigger());
    expect(radio('Oxblood Atelier').checked).toBe(true);
    expect(radio('Dark').checked).toBe(true);
    expect(rootState()).toMatchObject({ palette: 'oxblood', dark: true });
  });

  it('falls back to defaults for invalid stored values', () => {
    window.localStorage.setItem(PALETTE_STORAGE_KEY, 'nope');
    renderControl();
    expect(rootState().palette).toBe('mineral');
  });

  it('follows system preference changes only in system mode', () => {
    renderControl();
    expect(rootState().dark).toBe(false);
    act(() => mediaListeners.forEach((listener) => listener({ matches: true })));
    expect(rootState()).toMatchObject({ dark: true, theme: 'dark', preference: 'system' });

    fireEvent.click(trigger());
    fireEvent.click(radio('Light'));
    act(() => mediaListeners.forEach((listener) => listener({ matches: true })));
    expect(rootState()).toMatchObject({ dark: false, theme: 'light', preference: 'light' });
  });

  it('stays usable when localStorage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    renderControl();
    fireEvent.click(trigger());
    fireEvent.click(radio('Amber & Graphite'));
    expect(rootState().palette).toBe('amber');
  });
});
