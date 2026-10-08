import { Fragment } from 'react';

import Card from '@/components/ui/Card';
import type { ProductModule } from '@/types/product';

export default function EcosystemDiagram({ modules }: { modules: readonly ProductModule[] }) {
  const flowText = modules.map((productModule) => productModule.roleLabel).join(' to ');

  return (
    <section aria-labelledby="ecosystem-flow-heading">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight" id="ecosystem-flow-heading">
          One connected development loop
        </h2>
        <p className="mt-2 max-w-3xl text-[var(--color-text-secondary)]" id="ecosystem-flow-text">
          {flowText}. Each layer feeds the next while validation informs the following cycle.
        </p>
      </div>

      <Card className="bg-[var(--color-surface)]">
        <ol
          aria-describedby="ecosystem-flow-text"
          aria-label="my-dev-kit Ecosystem flow"
          className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]"
        >
          {modules.map((productModule, index) => (
            <Fragment key={productModule.id}>
              <li className="premium-card-interactive rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-elevated)] p-5 shadow-[var(--shadow-control)]">
                <p className="eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-secondary-text)]">
                  Step {index + 1}
                </p>
                <p className="mt-3 font-semibold">{productModule.roleLabel}</p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  {productModule.title}
                </p>
              </li>
              {index < modules.length - 1 ? (
                <li
                  aria-hidden="true"
                  className="flex items-center justify-center text-2xl text-[var(--color-accent-primary)]"
                >
                  <span className="rotate-90 md:rotate-0">→</span>
                </li>
              ) : null}
            </Fragment>
          ))}
        </ol>
      </Card>
    </section>
  );
}
