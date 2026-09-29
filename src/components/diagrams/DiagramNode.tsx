import { createElement, type HTMLAttributes } from 'react';

export type DiagramNodeVariant = 'primary' | 'secondary' | 'artifact';

interface DiagramNodeProps extends HTMLAttributes<HTMLElement> {
  readonly variant: DiagramNodeVariant;
  readonly as?: 'div' | 'article' | 'span';
}

/** Shared node role markup. Content and layout stay with the caller. */
export default function DiagramNode({ variant, as = 'div', className, ...props }: DiagramNodeProps) {
  const roleClass = 'diagram-node diagram-node--' + variant;
  return createElement(as, { ...props, className: className ? roleClass + ' ' + className : roleClass });
}
