# AI Workflow Rules

## Approach

- Use spec-driven incremental development for ZeeStyle.
- Read `AGENTS.md` first, then read the context files listed there before implementing.
- Implement against the current context files only: `project-overview.md`, `architecture-context.md`, `code-standards.md`, `ui-context.md`, `current-issues.md`, and `progress-tracker.md`.
- Treat the three apps as separate systems: `frontend/`, `admin/`, and `backend/`.
- Keep changes small enough to verify with the affected app's existing commands.

## Scoping Rules

- Work on one feature unit at a time.
- Keep each change as a small verifiable increment.
- Do not combine unrelated system boundaries in one unit.
- Keep customer storefront work inside `frontend/` unless the context requires an API change.
- Keep admin dashboard work inside `admin/` unless the context requires an API change.
- Keep API, model, middleware, payment, email, and integration work inside `backend/`.
- Preserve existing API response style with a `success` boolean unless the context is updated first.

## When to Split Work

Split if the step combines:

- UI changes in frontend/admin AND backend API changes together
- Changes across multiple unrelated API route groups
- frontend AND admin changes for the same feature
- Behavior not clearly defined in context files
- Payment provider changes (Stripe, Razorpay, COD) combined with unrelated order logic

## Handling Missing Requirements

- Do not invent product behavior not in context files.
- If ambiguous, resolve in relevant context file first.
- If missing, add as open question in `progress-tracker.md`.

## Protected Files

Do not modify unless explicitly instructed:

- `frontend/src/assets/assets.js` — asset registry
- `backend/config/` — database and cloudinary config
- Any `node_modules` internals

## Keeping Docs in Sync

Update relevant context file when implementation changes:

- API contracts or response shapes
- Data model changes
- New environment variables added
- Payment or auth flow changes

## Before Moving to the Next Unit

- Current unit works end to end
- No invariant in `architecture-context.md` was violated
- `progress-tracker.md` reflects completed work
- `npm.cmd run build` passes in affected app (`frontend/` or `admin/`)
