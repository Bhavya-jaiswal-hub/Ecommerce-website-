# Progress Tracker

Last updated: 2026-06-01.

## Current Phase

Baseline stabilization.

## Current Goal

Fix remaining baseline issues before expanding features.

## Completed

Current baseline:

- Repository has three separate apps: `frontend`, `admin`, and `backend`.
- Customer app has implemented catalog, product details, cart, checkout, orders, auth, and password reset pages.
- Admin app has implemented login, product add, product list/remove, and order status management.
- Backend has implemented user, product, cart, order, payment, Cloudinary, MongoDB, and Brevo email flows.
- Customer and admin production builds pass.
- Customer and admin lint scripts fail on the current baseline.
- Automated tests are not configured.
- Issue 01 closed: admin JWT creation and admin middleware verification now use a matching admin payload.
- Issue 02 closed: `frontend/src/pages/PlaceOrder.jsx` imports `toast`.
- Issue 03 closed: admin order catch blocks now read messages from the caught error object.
- Issue 11 closed: `.gitignore` now ignores `admin/dist/`.

Spec context created:

- `AGENTS.md`
- `context/feature-specs/project-overview.md`
- `context/feature-specs/architecture-context.md`
- `context/feature-specs/code-standards.md`
- `context/feature-specs/ui-context.md`
- `context/feature-specs/current-issues.md`
- `context/feature-specs/progress-tracker.md`

## In Progress

No active implementation in this session.

## Next Up

Clean lint baseline:

- Remove unused imports and variables.
- Replace empty catch blocks with minimal handling.
- Add braces around lexical declarations in `switch` cases.
- Review hook dependencies and memoization where needed.
- Move exported constants/context out of component files if keeping fast refresh lint rules.

Normalize configuration and encoding:

- Confirm rupee symbol handling across admin and frontend.
- Document expected `.env` values in sample files if this repo is shared.

Strengthen API contracts:

- Decide whether to keep the custom `token` header or migrate to `Authorization`.
- Move authenticated user id from `req.body.userId` to a request auth property.
- Decide whether customer product detail should use a public single-product endpoint.

Add tests after the baseline is stable:

- Backend controller/API tests for auth, cart, products, and orders.
- Frontend smoke tests for login, cart, checkout, and order history.
- Admin smoke tests for login, product creation/removal, and status update.

## Feature Spec Workflow

For new features:

1. Read `project-overview.md` to understand product scope.
2. Read `architecture-context.md` for ownership boundaries and API contracts.
3. Read `code-standards.md` before editing.
4. Read `ui-context.md` before changing screens.
5. Check `current-issues.md` so new work does not hide known baseline problems.
6. Update this tracker when a feature or baseline issue is completed.

## Open Questions

- Decide whether to keep the custom `token` header or migrate to `Authorization`.
- Move authenticated user id from `req.body.userId` to a request auth property.
- Decide whether customer product detail should use a public single-product endpoint.

## Architecture Decisions

- Customer auth uses JWTs issued by register/login.
- Admin auth uses a JWT issued by admin login.
- Clients send tokens in the custom `token` request header.
- Cart data uses the shape `{ [productId]: { [size]: quantity } }`.
- Data persistence uses Mongoose models for `user`, `product`, and `order`.
- Payments use Stripe Checkout, Razorpay Checkout, and cash on delivery.

## Session Notes

- The project has three separate apps: customer `frontend`, admin `admin`, and Express/MongoDB `backend`.
- Customer and admin production builds pass, but both lint scripts fail on the current baseline.
- Automated tests are not configured.
- Admin auth, checkout error handling, admin order catch blocks, and admin build output ignores were fixed on 2026-06-01.
- Some source files contain mojibake for the intended rupee symbol and check/cross console text. Currency display should be normalized deliberately rather than copied blindly.
- `PlaceOrder.jsx` uses `toast` without importing it, so payment/order error paths can break at runtime.
- `Collection.jsx` imports `use` from React even though it is unused.
- Several effects have incomplete dependency arrays; changing state logic may surface stale values.
- Large image assets are bundled into the frontend build, including logo/about/contact images over 1 MB each.
