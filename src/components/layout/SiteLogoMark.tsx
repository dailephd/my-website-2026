import { useId } from 'react';

export default function SiteLogoMark({
  size = 36,
  className,
  title = 'dailephd LLC',
  decorative = false,
}: {
  size?: number;
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const titleId = useId();

  return (
    <svg
      aria-hidden={decorative ? 'true' : undefined}
      aria-labelledby={decorative ? undefined : titleId}
      className={className}
      fill="none"
      height={size}
      role={decorative ? undefined : 'img'}
      viewBox="0 0 256 256"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {decorative ? null : <title id={titleId}>{title}</title>}
      <rect
        fill="var(--color-surface, #F5F6F8)"
        height="208"
        rx="46"
        stroke="var(--color-border, #D1D5DB)"
        strokeWidth="4"
        width="208"
        x="24"
        y="24"
      />
      <path
        d="M88 56V198H176"
        stroke="var(--color-text-secondary, #4B5563)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="22"
      />
      <path
        d="M88 78H124C155 78 176 95 176 118C176 141 155 158 124 158H88"
        stroke="var(--color-logo-accent, var(--color-accent-primary, #0F716A))"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="22"
      />
    </svg>
  );
}
