# Branching

Local branch conventions for `my-website-2026`. See `docs/DIAGRAMS.md` for the visual workflow.

## `main`

- Represents the last known-good, release-ready state.
- Nothing is pushed or merged to `main` without explicit instruction.
- `main` should always pass `npm run check:release`.

## Branch naming patterns

| Pattern | Purpose | Example |
|---|---|---|
| `feature/*` | New user-facing functionality or structural additions | `feature/m13-responsive-accessibility-hardening` |
| `fix/*` | Bug fixes, corrections to existing behavior | `fix/contact-form-validation-message` |
| `docs/*` | Documentation, diagrams, repository hygiene — no user-facing feature change | `docs/release-readiness-and-diagrams` |
| `release/*` | Release-preparation branches (version bump, changelog, final QA) — not used to perform the release itself | `release/v1` |

If a preferred branch name is already taken, append `-2`, `-3`, etc. (e.g.
`docs/release-readiness-and-diagrams-2`).

## Creating a branch

```
git branch --show-current
git status --short --untracked-files=all
git switch -c <branch-name>
```

Always inspect the current branch and working tree first. If the working tree has uncommitted
changes, `git switch -c` preserves them on the new branch — it does not discard or stash
anything. Never run a destructive command (`reset --hard`, `checkout -- .`, `clean -f`) to "clear
the way" for a new branch without explicit instruction.

## Commit and push discipline

- **Do not commit unless explicitly instructed**, even after finishing a task.
- **Do not push unless explicitly instructed.**
- **Do not merge, tag, or delete branches unless explicitly instructed.**
- When a commit is explicitly requested, stage specific files (not `git add -A`), write a commit
  message describing *why*, and never commit `.env`, `.env.local`, or any file containing
  secrets.

## Deployment is a separate workflow

No branch pattern here implies deployment. Deployment (Vercel) only happens after an explicit,
separate instruction — see `docs/WORKFLOWS.md` and `docs/RELEASE_READINESS.md`.
