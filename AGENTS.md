# AGENTS.md

## Application Building Context

Read these files in order before implementing anything:

- `context/project-overview.md`: product overview, goals, user flows, features, data models, integrations, scope, and success criteria.
- `context/architecture-context.md`: stack, system boundaries, storage model, auth/access model, and core invariants.
- `context/code-standards.md`: language, React, backend, environment, validation, file organization, lint/build, safe change, and testing conventions.
- `context/ui-context.md`: visual theme, colors, typography, layout, navigation, UI patterns, icons, assets, and UI risks.
- `context/current-issues.md`: known baseline failures, current risks, and prioritized issues.
- `context/progress-tracker.md`: current phase, current goal, completed work, in-progress work, next milestones, workflow, open questions, decisions, and session notes.

## Project

ZeeStyle is a three-part e-commerce application:

- `frontend/`: customer storefront built with React, Vite, React Router, Tailwind CSS, Axios, and React Toastify.
- `admin/`: admin dashboard built with React, Vite, React Router, Tailwind CSS, Axios, and React Toastify.
- `backend/`: Node.js Express API using ES modules, Mongoose, JWT auth, Cloudinary image uploads, Stripe, Razorpay, and Brevo email.

## Working Rules

- Read the relevant app before changing it. The three apps are separate packages with separate `package.json` files.
- Keep changes scoped to the app that owns the behavior. Shared business contracts live in the backend API shape, not in a shared package.
- Preserve the existing JavaScript/JSX style unless a change is intentionally cleaning it up.
- Do not commit secrets. Runtime configuration comes from `.env` files and Vite `VITE_*` variables.
- Use `npm.cmd run build` in `frontend/` or `admin/` to verify production builds.
- Use `npm.cmd run lint` in `frontend/` or `admin/` when touching React code, but note that the current baseline has lint failures documented in `context/feature-specs/current-issues.md`.
- There is no backend test suite. Backend verification is currently manual or by starting `backend/server.js` against configured services.

## Key Commands

Backend:

```bash
cd backend
npm.cmd run server
npm.cmd start
```

Customer frontend:

```bash
cd frontend
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

Admin:

```bash
cd admin
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

## Environment

Backend expects at least:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_SECRET_KEY`
- `STRIPE_SECRET_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `BREVO_API_KEY`
- `EMAIL_FROM`
- `FRONTEND_URL`

Frontend/admin expect:

- `VITE_BACKEND_URL`
- `VITE_RAZORPAY_KEY_ID` in `frontend/` for Razorpay checkout.

## After Every Implementation

- Do not commit secrets. Runtime configuration comes from `.env` files and Vite `VITE_*` variables.
- Use `npm.cmd run build` in `frontend/` or `admin/` to verify production builds.
- Use `npm.cmd run lint` in `frontend/` or `admin/` when touching React code, but note that the current baseline has lint failures documented in `context/feature-specs/current-issues.md`.
- Update `context/progress-tracker.md`.
- If architecture changes, update `context/architecture-context.md`.
- If scope changes, update `context/project-overview.md`.
