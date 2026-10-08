'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

import { useTheme } from '@/components/theme/ThemeProvider';
import { PALETTES, THEME_PREFERENCES } from '@/lib/constants';

const themeLabels = { light: 'Light', dark: 'Dark', system: 'System' } as const;

const optionLabel =
  'theme-transition flex min-h-10 cursor-pointer items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] peer-checked:border-[var(--color-accent-primary)] peer-checked:bg-[var(--color-elevated)] peer-checked:text-[var(--color-text-primary)] peer-checked:shadow-[inset_0_0_0_1px_var(--color-accent-primary)] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-focus-ring)]';

function RadioOption({
  checked,
  children,
  name,
  onSelect,
  value,
}: {
  checked: boolean;
  children: ReactNode;
  name: string;
  onSelect: () => void;
  value: string;
}) {
  return (
    <div className="relative">
      <input
        checked={checked}
        className="peer sr-only"
        id={`${name}-${value}`}
        name={name}
        onChange={onSelect}
        type="radio"
        value={value}
      />
      <label className={optionLabel} htmlFor={`${name}-${value}`}>
        {children}
      </label>
    </div>
  );
}

const legendClass =
  'text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]';

export default function AppearanceControl() {
  const { palette, setPalette, setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const titleId = useId();

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) {
      buttonRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    panelRef.current
      ?.querySelector<HTMLInputElement>('input[name="appearance-palette"]:checked')
      ?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && open) {
      event.stopPropagation();
      close(true);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (open && next && !rootRef.current?.contains(next)) {
      setOpen(false);
    }
  };

  const activePalette = PALETTES.find((item) => item.id === palette) ?? PALETTES[0];

  return (
    <div onBlur={handleBlur} onKeyDown={handleKeyDown} ref={rootRef}>
      <button
        aria-controls={open ? panelId : undefined}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="theme-transition inline-flex min-h-10 items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-elevated)] px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] shadow-[var(--shadow-control)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-text-primary)]"
        data-appearance-trigger=""
        onClick={() => setOpen((value) => !value)}
        ref={buttonRef}
        type="button"
      >
        <span aria-hidden="true" className="flex -space-x-1">
          <span className="h-3.5 w-3.5 rounded-full border border-[var(--color-background)] bg-[var(--color-accent-primary)]" />
          <span className="h-3.5 w-3.5 rounded-full border border-[var(--color-background)] bg-[var(--color-accent-secondary)]" />
        </span>
        Appearance
        <span className="sr-only">
          : {activePalette.label}, {themeLabels[theme]}
        </span>
      </button>

      {open ? (
        <div
          aria-labelledby={titleId}
          className="absolute inset-x-4 top-full z-50 mt-2 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-[var(--radius-card)] border border-[var(--color-border-strong)] bg-[var(--color-elevated)] p-5 text-[var(--color-text-primary)] shadow-[var(--shadow-card-hover)] sm:inset-x-auto sm:right-6 sm:w-[24rem]"
          data-appearance-panel=""
          id={panelId}
          ref={panelRef}
          role="dialog"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold" id={titleId}>
              Appearance settings
            </h2>
            <button
              className="rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-text-primary)]"
              onClick={() => close(true)}
              type="button"
            >
              Close
            </button>
          </div>

          <fieldset className="mt-4 min-w-0">
            <legend className={legendClass}>Palette</legend>
            <div className="mt-2 grid gap-2">
              {PALETTES.map((item) => (
                <RadioOption
                  checked={palette === item.id}
                  key={item.id}
                  name="appearance-palette"
                  onSelect={() => setPalette(item.id)}
                  value={item.id}
                >
                  <span aria-hidden="true" className="flex -space-x-1">
                    <span
                      className="h-4 w-4 rounded-full border border-[var(--color-border-strong)]"
                      style={{ background: item.swatch[0] }}
                    />
                    <span
                      className="h-4 w-4 rounded-full border border-[var(--color-border-strong)]"
                      style={{ background: item.swatch[1] }}
                    />
                  </span>
                  {item.label}
                </RadioOption>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-4 min-w-0">
            <legend className={legendClass}>Color mode</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {THEME_PREFERENCES.map((item) => (
                <RadioOption
                  checked={theme === item}
                  key={item}
                  name="appearance-mode"
                  onSelect={() => setTheme(item)}
                  value={item}
                >
                  {themeLabels[item]}
                </RadioOption>
              ))}
            </div>
          </fieldset>

        </div>
      ) : null}
    </div>
  );
}
