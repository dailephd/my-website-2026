import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import DiagramArrowMarker from '@/components/diagrams/DiagramArrowMarker';
import DiagramConnectorPath from '@/components/diagrams/DiagramConnectorPath';
import DiagramNode from '@/components/diagrams/DiagramNode';
import RoadmapTimeline from '@/components/projects/RoadmapTimeline';

const css = readFileSync('src/styles/diagrams.css', 'utf8');
const globals = readFileSync('src/app/globals.css', 'utf8');
const visual = readFileSync('src/components/projects/ProductArchitectureVisual.tsx', 'utf8');

describe('central diagram style authority', () => {
  it('is imported once, globally, after the token and utility layers', () => {
    expect(globals.match(/diagrams\.css/g)).toHaveLength(1);
    expect(globals.indexOf('utilities.css')).toBeLessThan(globals.indexOf('diagrams.css'));
    expect(globals.indexOf('diagrams.css')).toBeLessThan(globals.indexOf('@tailwind base'));
  });

  it('defines the semantic roles and defaults', () => {
    for (const declaration of [
      '--diagram-canvas-bg: var(--color-surface)',
      '--diagram-primary-node-bg: var(--color-elevated)',
      '--diagram-flow-data: var(--color-accent-cyan)',
      '--diagram-flow-control: var(--color-accent-violet)',
      '--diagram-focus: var(--color-focus)',
      '--diagram-primary-node-radius: 1.25rem',
      '--diagram-artifact-radius: 1rem',
      '--diagram-primary-stroke: 3px',
      '--diagram-secondary-stroke: 2.5px',
      '--diagram-feedback-dash: 8 8',
    ]) {
      expect(css).toContain(declaration);
    }
    for (const cls of [
      '.diagram-canvas', '.diagram-node', '.diagram-node--primary', '.diagram-node--secondary',
      '.diagram-node--artifact', '.diagram-connector', '.diagram-connector--primary',
      '.diagram-connector--secondary', '.diagram-connector--data', '.diagram-connector--control',
      '.diagram-connector--feedback', '.diagram-connector-label', '.diagram-summary',
      '.diagram-timeline', '.diagram-timeline-entry', '.diagram-timeline-marker', '.diagram-timeline-divider',
    ]) {
      expect(css).toContain(cls + ' {');
    }
  });

  it('adds no literal colors or route-specific selectors', () => {
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(css).not.toMatch(/\.(my-dev-kit|orchestrator|lab)-/);
  });
});

describe('shared diagram primitives', () => {
  it('maps node variants to central role classes', () => {
    for (const variant of ['primary', 'secondary', 'artifact'] as const) {
      const html = renderToStaticMarkup(<DiagramNode className="local" variant={variant}>x</DiagramNode>);
      expect(html).toContain('diagram-node diagram-node--' + variant + ' local');
    }
  });

  it('renders connectors with semantic classes and no inline stroke values', () => {
    const html = renderToStaticMarkup(
      <svg><DiagramConnectorPath d="M0 0 V1" markerEnd="url(#m)" tone="control" variant="primary" /></svg>,
    );
    expect(html).toContain('diagram-connector diagram-connector--primary diagram-connector--control');
    expect(html).toContain('marker-end="url(#m)"');
    expect(html).not.toMatch(/stroke/);

    const feedback = renderToStaticMarkup(<svg><DiagramConnectorPath d="M0 0" variant="feedback" /></svg>);
    expect(feedback).toContain('diagram-connector--feedback');
    expect(feedback).not.toContain('diagram-connector--data');
  });

  it('owns marker semantics in the shared arrow marker only', () => {
    const html = renderToStaticMarkup(<svg><DiagramArrowMarker id="m" tone="data" /></svg>);
    expect(html).toContain('markerUnits="strokeWidth"');
    expect(html).toContain('orient="auto"');
    expect(html).toContain('diagram-arrow-marker--data');
    expect(visual).not.toContain('<marker');
  });
});

describe('live adopters', () => {
  it('ProductArchitectureVisual consumes the shared primitives instead of local styling', () => {
    for (const name of ['DiagramCanvas', 'DiagramNode', 'DiagramConnectorPath', 'DiagramArrowMarker', 'DiagramLabel', 'DiagramSummary']) {
      expect(visual).toContain('@/components/diagrams/' + name);
    }
    expect(visual).not.toMatch(/strokeDasharray|vectorEffect|markerUnits|--diagram-|premium-card/);
    expect(visual).not.toMatch(/rounded-\[(1\.5|1\.25|1|0\.875)rem\]/);
  });

  it('keeps the stable diagram selectors', () => {
    for (const attr of ['data-diagram=', 'data-diagram-node', 'data-diagram-connector', 'data-diagram-mini']) {
      expect(visual).toContain(attr);
    }
  });

  it('RoadmapTimeline stays an ordered list using the shared timeline classes', () => {
    const html = renderToStaticMarkup(
      <RoadmapTimeline entries={[{ state: 'recent', version: '1.0.0', description: 'a' }, { state: 'current', version: '2.0.0', description: 'b' }]} />,
    );
    expect(html).toMatch(/^<ol class="diagram-timeline" data-diagram-timeline="true">/);
    expect(html.match(/<li /g)).toHaveLength(2);
    expect(html.match(/class="diagram-timeline-entry/g)).toHaveLength(2);
    expect(html.match(/diagram-timeline-divider/g)).toHaveLength(1);
    expect(html.match(/diagram-timeline-marker/g)).toHaveLength(2);
    expect(html.indexOf('1.0.0')).toBeLessThan(html.indexOf('2.0.0'));
    expect(html).toContain('data-release-state="recent"');
    expect(html).toContain('data-release-state="current"');
    expect(html).toContain('>Recent</span>');
    expect(html).toContain('>Current</span>');
  });
});
