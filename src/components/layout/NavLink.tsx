'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
}

export default function NavLink({ href, label, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'premium-link rounded-sm py-2 hover:text-[var(--color-text-primary)] hover:underline',
        isActive && 'font-semibold text-[var(--color-text-primary)]',
        className,
      )}
      href={href}
    >
      {label}
    </Link>
  );
}
