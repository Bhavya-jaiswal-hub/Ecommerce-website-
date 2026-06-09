# Progress Tracker

Last updated: 2026-06-09.

## Current Phase

Spec-driven feature implementation.

## Current Goal

Implement Issue 15: prevent admins from overriding cancelled orders.

## Completed

Current baseline:

- Repository has three separate apps: `frontend`, `admin`, and `backend`.
- Customer app has implemented catalog, product details, cart, checkout, orders, auth, and password reset pages.
- Admin app has implemented login, product add, product list/remove, and order status management.
- Backend has implemented user, product, cart, order, payment, Cloudinary, MongoDB, and Brevo email flows.
- Customer and admin production builds pass.
- Customer and admin lint scripts pass.
- Automated tests are not configured.
- Issue 01 closed: admin JWT creation and admin middleware verification now use a matching admin payload.
- Issue 02 closed: `frontend/src/pages/PlaceOrder.jsx` imports `toast`.
- Issue 03 closed: admin order catch blocks now read messages from the caught error object.
- Issue 04 closed: frontend lint errors and hook warnings were cleaned up.
- Issue 05 closed: admin lint errors and hook warnings were cleaned up.
- Issue 06 closed: frontend, admin, and backend now use `Authorization: Bearer <token>`.
- Issue 07 closed: authenticated customer identity now lives on `req.userId`.
- Issue 08 closed: `/api/product/single` is public and customer product detail fetches it directly.
- Issue 09 closed: frontend and admin currency constants now use the correct rupee symbol.
- Issue 11 closed: `.gitignore` now ignores `admin/dist/`.
- Issue 12 closed: unused backend email SDK dependencies were removed.
- Issue 13 closed: hero/about/contact images now load from `frontend/public/` instead of the Vite asset bundle.
- Issue 14 closed: customer product links now route cleanly by removing the Collection render loop and making Product detail render immediately from ShopContext while re-fetching `/api/product/single` for the current `/product/:productId`. The product page treats that API refresh as non-blocking so stale admin/auth responses do not show unwanted toasts on public product details. Related-product clicks now scroll back to the top of the newly selected product, and the related list excludes the current product.
- Storefront product loading follows the admin catalog: customer product lists mirror `/api/product/list`, so an empty backend product collection intentionally renders no products.
- Admin local login CORS fixed: backend now allows `http://localhost:5174` so the admin Vite dev server can call `/api/user/admin` during local development.
- Spec 01 complete: Product detail now blocks Add to Cart without a selected size, `/api/order/cancel` lets authenticated customers cancel their own eligible orders, and the customer Orders page supports cancellation plus inline order tracking steps.
- Issue 15 closed: admin status updates now reject orders that are already `Cancelled`, and the admin Orders page renders cancelled orders as muted rows with a red non-interactive `Cancelled` label instead of a status dropdown.

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

Normalize configuration and encoding:

- Confirm rupee symbol handling across admin and frontend.
- Document expected `.env` values in sample files if this repo is shared.

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

## Architecture Decisions

- Customer auth uses JWTs issued by register/login.
- Admin auth uses a JWT issued by admin login.
- Clients send tokens in the standard `Authorization: Bearer <token>` request header.
- Authenticated customer identity is stored on `req.userId` by `authUser`.
- Cart data uses the shape `{ [productId]: { [size]: quantity } }`.
- Data persistence uses Mongoose models for `user`, `product`, and `order`.
- Payments use Stripe Checkout, Razorpay Checkout, and cash on delivery.

## Session Notes

- The project has three separate apps: customer `frontend`, admin `admin`, and Express/MongoDB `backend`.
- Customer and admin production builds pass, and both lint scripts pass.
- Automated tests are not configured.
- Admin auth, checkout error handling, admin order catch blocks, Authorization header migration, `req.userId` auth identity, public product detail, frontend/admin lint cleanup, rupee currency display, unused backend email SDK dependencies, large static frontend page images, admin build output ignores, product detail route-param re-fetching, and the Collection render loop blocking product navigation were fixed on 2026-06-01.
- On 2026-06-02, local `/api/product/list` was confirmed to return `success: true` with an empty `products` array because the admin removed all products. A temporary demo fallback was removed so the customer app shows only admin-created backend products.
- On 2026-06-02, admin login from `http://localhost:5174` was blocked by the backend CORS allowlist. Added the local admin origin to `backend/server.js`; `node --check backend/server.js` and `admin` build pass.
- On 2026-06-09, Spec 01 was implemented across `frontend/src/pages/Product.jsx`, `backend/controllers/orderController.js`, `backend/routes/orderRoute.js`, and `frontend/src/pages/Orders.jsx`. Cancellation is owner-checked through `req.userId`, blocked for shipped/out-for-delivery/delivered orders, and uses `Authorization: Bearer` from the customer Orders page.
- On 2026-06-09, Issue 15 was implemented across `backend/controllers/orderController.js` and `admin/src/pages/Orders.jsx`. `updateStatus` now loads the current order, returns `{ success: false, message: 'Cancelled orders cannot be updated' }` for cancelled orders, and the admin UI removes status controls from cancelled order rows.
- Some source files contain mojibake for the intended rupee symbol and check/cross console text. Currency display should be normalized deliberately rather than copied blindly.
- `PlaceOrder.jsx` uses `toast` without importing it, so payment/order error paths can break at runtime.
- `Collection.jsx` imports `use` from React even though it is unused.
- Several effects have incomplete dependency arrays; changing state logic may surface stale values.
- The frontend logo remains bundled by design; hero/about/contact page images are served from `frontend/public/`.
