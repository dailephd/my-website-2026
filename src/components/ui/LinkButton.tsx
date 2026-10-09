import Link from 'next/link';

import { cn } from '@/lib/utils';

interface LinkButtonProps {
  href: string;
  label: string;
  external?: boolean;
  emphasis?: 'primary' | 'secondary';
}

export default function LinkButton({
  href,
  label,
  external = false,
  emphasis = 'secondary',
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        'theme-transition inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border px-5 py-2.5 font-semibold shadow-[var(--shadow-control)]',
        emphasis === 'primary'
          ? 'border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-surface)] hover:border-[var(--color-action-hover)] hover:bg-[var(--color-action-hover)] hover:text-[var(--color-on-accent)]'
          : 'border-[var(--color-border-strong)] bg-[var(--color-elevated)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)] hover:shadow-[var(--shadow-card)]',
      )}
      href={href}
      rel={external ? 'noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      {label}
    </Link>
  );
}
