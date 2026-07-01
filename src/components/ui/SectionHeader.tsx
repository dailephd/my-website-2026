export default function SectionHeader({
  title,
  description,
  level = 2,
  headingId,
}: {
  title: string;
  description?: string;
  level?: 1 | 2;
  headingId?: string;
}) {
  const Heading = level === 1 ? 'h1' : 'h2';

  return (
    <header className="mb-7">
      <Heading className="max-w-3xl text-3xl font-semibold tracking-[-0.025em] sm:text-4xl" id={headingId}>
        {title}
      </Heading>
      {description ? (
        <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">{description}</p>
      ) : null}
    </header>
  );
}
