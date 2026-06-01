# Current Issues

Last checked: 2026-05-31.

Verification baseline:

- `frontend` build passes.
- `admin` build passes.
- `frontend` lint fails with 22 errors and 10 warnings.
- `admin` lint fails with 7 errors and 1 warning.

Commands run:

```bash
cd frontend
npm.cmd run lint
npm.cmd run build
```

```bash
cd admin
npm.cmd run lint
npm.cmd run build
```

| Issue | Title | Priority | Status |
|-------|-------|----------|--------|
| 01 | Admin JWT creation and verification mismatch | Critical | Closed |
| 02 | Missing toast import in PlaceOrder.jsx | High | Closed |
| 03 | Admin Orders catch block references undefined response variable | High | Closed |
| 04 | Frontend lint fails with 22 errors and 10 warnings | High | Open |
| 05 | Admin lint fails with 7 errors and 1 warning | High | Open |
| 06 | Custom token header used instead of Authorization header | Medium | Open |
| 07 | Auth middleware writes userId into req.body | Medium | Open |
| 08 | Single product endpoint is admin protected | Medium | Open |
| 09 | Currency symbol mojibake in source files | Medium | Open |
| 10 | No automated tests configured | Medium | Open |
| 11 | admin/dist not in gitignore | Low | Closed |
| 12 | Unused backend dependencies in package.json | Low | Open |
| 13 | Large image assets bundled in frontend build | Low | Open |

## Issue 01 — Admin JWT creation and verification mismatch

### Description

Protected admin routes such as product add/remove and order list/status are likely blocked after login.

### Affected Files

- `backend/controllers/userController.js`
- `backend/middleware/adminAuth.js`

### Root Cause

`adminLogin` signs a JWT containing `{ email }`, but `adminAuth` verifies the token and compares the decoded token object to `process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD`. That comparison cannot pass as written.

### Fix Direction

Align the admin JWT payload and `adminAuth` verification logic so the token issued by admin login is accepted by protected admin routes.

### Priority

Critical

### Acceptance Criteria

- [ ] Admin login token can access protected product add/remove routes.
- [ ] Admin login token can access protected order list/status routes.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 02 — Missing toast import in PlaceOrder.jsx

### Description

Checkout and payment error paths can throw at runtime because `toast.error(...)` is called without importing `toast`.

### Affected Files

- `frontend/src/pages/PlaceOrder.jsx`

### Root Cause

`PlaceOrder.jsx` calls `toast.error(...)` in several catch/error branches but does not import `toast` from `react-toastify`.

### Fix Direction

Import `toast` from `react-toastify` and keep error handling consistent with other frontend pages.

### Priority

High

### Acceptance Criteria

- [ ] `PlaceOrder.jsx` imports `toast` from `react-toastify`.
- [ ] Checkout error paths show toast errors instead of throwing `toast is not defined`.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 03 — Admin Orders catch block references undefined response variable

### Description

Admin order error handling can throw a second error while handling failed requests.

### Affected Files

- `admin/src/pages/Orders.jsx`

### Root Cause

Catch blocks reference `response.data.message` where `response` is not defined in catch scope.

### Fix Direction

Use the caught error object or a safe fallback message in admin order catch blocks.

### Priority

High

### Acceptance Criteria

- [ ] Admin order list request failures do not reference an undefined `response`.
- [ ] Admin order status update failures do not reference an undefined `response`.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 04 — Frontend lint fails with 22 errors and 10 warnings

### Description

The customer app lint baseline is failing.

### Affected Files

- `frontend/src/App.jsx`
- `frontend/src/context/ShopContext.jsx`
- `frontend/src/pages/Collection.jsx`
- `frontend/src/pages/Orders.jsx`
- `frontend/src/pages/PlaceOrder.jsx`
- Other frontend components/pages with hook dependency warnings

### Root Cause

Observed examples include unused imports and variables, empty catch blocks, `toast` used without being defined, lexical declarations directly in `switch` cases, fast refresh warnings, and missing hook dependency warnings.

### Fix Direction

Remove unused imports/variables, handle or intentionally ignore catch errors, import `toast`, wrap `switch` case declarations, and review hook dependencies and fast refresh exports.

### Priority

High

### Acceptance Criteria

- [ ] `npm.cmd run lint` in `frontend/` no longer reports the current 22 errors.
- [ ] Hook dependency warnings are reviewed and resolved or intentionally addressed.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 05 — Admin lint fails with 7 errors and 1 warning

### Description

The admin app lint baseline is failing.

### Affected Files

- `admin/src/App.jsx`
- `admin/src/pages/Orders.jsx`
- `admin/src/pages/List.jsx`

### Root Cause

Observed examples include an unused `toast` import, fast refresh warning because constants are exported from the component file, catch blocks referencing undefined `response`, and React hook lint warnings around direct state-triggering calls inside effects.

### Fix Direction

Remove unused imports, move shared constants out of component files if keeping fast refresh lint rules, fix catch block error handling, and review effect patterns.

### Priority

High

### Acceptance Criteria

- [ ] `npm.cmd run lint` in `admin/` no longer reports the current 7 errors.
- [ ] The remaining hook warning is resolved or intentionally addressed.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 06 — Custom token header used instead of Authorization header

### Description

JWT auth uses a custom `token` request header across backend middleware and both React apps.

### Affected Files

- `backend/middleware/auth.js`
- `backend/middleware/adminAuth.js`
- Multiple Axios callers in `frontend/`
- Multiple Axios callers in `admin/`
- `backend/server.js`

### Root Cause

The current clients send JWTs in `headers: { token }`, and CORS explicitly allows the `token` header.

### Fix Direction

Decide whether to keep the custom `token` header or migrate all clients and middleware to standard `Authorization: Bearer ...` at the same time.

### Priority

Medium

### Acceptance Criteria

- [ ] Auth token transport is documented and implemented consistently across frontend, admin, and backend.
- [ ] CORS allowed headers match the chosen token transport.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 07 — Auth middleware writes userId into req.body

### Description

Authenticated customer controllers depend on `authUser` mutating request body data.

### Affected Files

- `backend/middleware/auth.js`
- Customer cart/order controllers that read `userId` from `req.body`

### Root Cause

`authUser` verifies the JWT and writes `req.body.userId = token_decode.id`, mixing trusted auth data with user-supplied body data.

### Fix Direction

Move authenticated identity to a request auth property such as `req.userId` or `req.user`, then update dependent controllers together.

### Priority

Medium

### Acceptance Criteria

- [ ] Authenticated customer identity is read from middleware-owned request state.
- [ ] Cart and order controllers still use the authenticated user id correctly.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 08 — Single product endpoint is admin protected

### Description

The backend single-product endpoint is not usable by the customer product page.

### Affected Files

- `backend/routes/productRoute.js`
- `frontend/src/pages/Product.jsx`

### Root Cause

`/api/product/single` is protected by `adminAuth`, while the customer product page derives product details from the full product list in context instead of using a public single-product API.

### Fix Direction

Decide whether customer product detail should continue using the product list or whether `/api/product/single` should become public or get a separate public endpoint.

### Priority

Medium

### Acceptance Criteria

- [ ] Product detail data source is documented and consistent with route access.
- [ ] Customer product page can load product details through the chosen contract.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 09 — Currency symbol mojibake in source files

### Description

The intended Indian rupee symbol appears mojibaked in source output.

### Affected Files

- `frontend/src/context/ShopContext.jsx`
- `admin/src/App.jsx`

### Root Cause

Source output shows mojibake for the intended rupee symbol and some check/cross console text.

### Fix Direction

Normalize encoding and currency display deliberately across customer and admin UI.

### Priority

Medium

### Acceptance Criteria

- [ ] Currency display is readable and consistent in frontend.
- [ ] Currency display is readable and consistent in admin.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 10 — No automated tests configured

### Description

There are no automated tests for backend, frontend, or admin packages.

### Affected Files

- `backend/package.json`
- Frontend package/test configuration if tests are added
- Admin package/test configuration if tests are added

### Root Cause

`backend/package.json` still has the default test script: `"test": "echo \"Error: no test specified\" && exit 1"`. There are also no frontend/admin tests.

### Fix Direction

Add tests only after choosing or introducing a test runner intentionally, starting with backend controller/API tests and smoke tests for customer/admin flows.

### Priority

Medium

### Acceptance Criteria

- [ ] A test strategy is chosen for backend, frontend, or admin before adding test files.
- [ ] The default failing backend test placeholder is replaced when backend tests are introduced.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 11 — admin/dist not in gitignore

### Description

Generated admin build output is not fully ignored.

### Affected Files

- `.gitignore`
- `admin/dist/`

### Root Cause

Root `.gitignore` ignores `frontend/dist/` and `backend/dist/`, but not `admin/dist/`.

### Fix Direction

Add `admin/dist/` to `.gitignore` if admin build artifacts should stay untracked.

### Priority

Low

### Acceptance Criteria

- [ ] `.gitignore` includes `admin/dist/`.
- [ ] Running the admin build does not leave `admin/dist/` as untracked output.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 12 — Unused backend dependencies in package.json

### Description

The backend dependency list includes packages not used by the current email sender.

### Affected Files

- `backend/package.json`
- `backend/package-lock.json`
- `backend/utils/sendEmail.js`

### Root Cause

`backend/package.json` includes `nodemailer` and `sib-api-v3-sdk`, while the current email sender uses Axios directly against Brevo's SMTP API.

### Fix Direction

Confirm whether those packages are intentionally retained; remove unused dependencies only if no current or planned backend code needs them.

### Priority

Low

### Acceptance Criteria

- [ ] Backend dependencies match actual backend imports or documented planned use.
- [ ] Package lock is updated if dependencies are removed.
- [ ] `npm.cmd run build` passes in affected app.

---

## Issue 13 — Large image assets bundled in frontend build

### Description

The frontend build bundles several large image assets.

### Affected Files

- `frontend/src/assets/`
- `frontend/src/assets/assets.js`
- Frontend components/pages that import large assets

### Root Cause

Large local images, including logo/about/contact assets over 1 MB, are imported into the frontend bundle.

### Fix Direction

Optimize image assets or change how large media is delivered before performance work.

### Priority

Low

### Acceptance Criteria

- [ ] Large frontend image assets are reviewed for optimization.
- [ ] Asset imports continue to render correctly after any optimization.
- [ ] `npm.cmd run build` passes in affected app.
