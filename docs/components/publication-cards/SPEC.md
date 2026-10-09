# Publication Cards Spec

> Historical M8 component plan. Current publication route and card behavior are specified in
> `docs/CONTRACT.md`; the current homepage composition does not imply a publication preview.

## Component purpose

Define reusable publication presentation components for credibility and research-history sections.

## Responsibilities

- Render publication summaries consistently.
- Support citation links and metadata display.
- Integrate with About and preview sections.
- Render only verified records supplied through props.
- Omit absent metadata and provide a transparent empty state.

## Inputs and outputs

- Inputs: typed `Publication` records from the adapter.
- Outputs: semantic article cards or a publication-list empty state.

## Accessibility notes

- Type and featured state use text labels.
- External links have descriptive labels and visible focus treatment.

The homepage uses a compact credibility summary; `/about` owns the complete list.
