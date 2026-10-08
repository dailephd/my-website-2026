import Link from 'next/link';

import type { ProductLink } from '@/types/product';

export default function ProductLinks({ links }: { links: readonly ProductLink[] }) {
  const github = links.find((link) => link.kind === 'repository');
  const npm = links.find((link) => link.kind === 'package');

  if (!github && !npm) return null;

  return (
    <ul aria-label="Product links" className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
      {github ? (
        <li>
          <Link
            className="premium-link rounded-sm text-sm font-medium text-[var(--color-accent-primary)] underline decoration-transparent underline-offset-4 hover:decoration-current"
            href={github.href}
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
        </li>
      ) : null}
      {npm ? (
        <li>
          <Link
            className="premium-link rounded-sm text-sm font-medium text-[var(--color-accent-primary)] underline decoration-transparent underline-offset-4 hover:decoration-current"
            href={npm.href}
            rel="noreferrer"
            target="_blank"
          >
            npm
          </Link>
        </li>
      ) : null}
    </ul>
  );
}
