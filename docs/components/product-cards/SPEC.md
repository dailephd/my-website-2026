# Product Ecosystem Components Specification

## Purpose

Define the M4 presentation of the my-dev-kit Ecosystem as one connected product family.

## Responsibilities

- `ProductFamilyHero` renders family positioning, maturity, audience, and verified links.
- `EcosystemDiagram` renders the ordered Codebase Intelligence → Workflow Orchestration →
  Validation Lab flow with an equivalent text explanation.
- `EcosystemModuleCard` renders each module’s role, layer, maturity, stack, and optional links.

## Accessibility and responsive rules

- Status, stage, role, and flow order use visible text.
- Links remain keyboard accessible and external links use safe attributes.
- The flow stacks vertically at mobile widths without horizontal scrolling.
- Components receive typed content through props and use M2 semantic tokens.

## Boundary

M6 adds `ProductCard` and `ProductGrid` for the complete index. Cards receive
`ProductCardViewModel` props, render textual maturity and verified links, and reuse the M5
`RoadmapPreview` only when adapter-resolved preview data exists.

M7 reuses `ProductCard` with a level-three heading and leaves roadmap content to the dedicated
homepage roadmap section.

M12 applies shared premium-card interaction, layered featured surfaces, polished hero motifs,
and command-center treatment to the ecosystem flow.
