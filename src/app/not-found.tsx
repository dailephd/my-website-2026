import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">The page you requested does not exist.</p>
      <Link className="mt-6 inline-block font-medium text-[var(--color-accent-primary-text)]" href="/">
        Return home
      </Link>
    </main>
  );
}
