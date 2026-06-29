# Project Cards Specification

## Purpose

Define the M3 selected-work presentation backed by `src/content/projects.ts`.

## Responsibilities

- `ProjectCard` renders one typed project’s status, category, role, summary, stack, and links.
- `ProjectLinkList` renders only available links and applies safe external-link attributes.
- `ProjectGrid` provides featured/standard responsive layouts and an empty state.
- Featured treatment uses text and tokenized border/surface changes rather than color alone.

## Inputs and outputs

- Input: readonly `Project` or `ProjectLink` records passed through props.
- Output: semantic article, heading, list, badge, and link markup.

## Accessibility notes

- Project titles use level-three headings under `/work` section headings.
- Statuses and featured state are rendered as text.
- Stack tags are exposed as labeled lists.
- Every configured link has a meaningful visible label and keyboard focus state.

## Content boundaries

- Components do not import project records.
- Empty link arrays render no empty container.
- No project card depends on optional long summary or links.

M7 reuses these cards in a bounded two-project homepage preview selected by adapters.

M12 adds consistent highlight, lift, border, and shadow treatment. Featured records retain
textual labels without adding metrics or content.
