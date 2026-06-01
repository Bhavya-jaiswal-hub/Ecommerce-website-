# Code Standards

## General

- Use JavaScript and JSX.
- Use ES modules everywhere; backend `package.json` has `"type": "module"`.

## React Conventions

- Components are function components.
- State uses React hooks.
- Routing uses `react-router-dom`.
- API calls use Axios.
- User feedback uses React Toastify.
- Styling is mostly Tailwind utility classes in JSX plus small global CSS files.
- Existing components use single quotes in many files and double quotes in newer password reset/admin files. When editing a file, match that file's local style.

## Backend Conventions

- Controllers should return JSON with a `success` boolean.
- Existing code often returns HTTP 200 for validation failures and operation failures. Preserve that contract unless a feature intentionally standardizes status codes and the clients are updated.
- Use `try/catch` in async controllers.
- Keep controller exports named and route imports explicit.
- Mongoose models use lowercase collection model names: `user`, `product`, and `order`.
- Authenticated customer controllers expect `authUser` to write `userId` into `req.userId`.
- Protected customer and admin routes expect `Authorization: Bearer <token>`.

## Environment and Secrets

- Backend secrets must stay in `backend/.env`, which is gitignored.
- Frontend/admin runtime URLs and public keys must use Vite env names beginning with `VITE_`.
- Do not hardcode service secrets, database URIs, JWT secrets, email API keys, or payment secret keys.

## Validation and Error Handling

- User registration validates email with `validator.isEmail` and requires passwords of at least 8 characters.
- Password reset also requires at least 8 characters and uses a SHA-256 hashed reset token with a 15 minute expiry.
- Product add expects `sizes` to be a JSON string in multipart form data.
- Product image uploads are optional per image slot but the product schema requires the final image array.
- Cart shape is `{ [productId]: { [size]: quantity } }`.

## File Organization

- Prefer existing file organization:
  - Backend routes in `backend/routes/`
  - Backend controllers in `backend/controllers/`
  - Backend Mongoose models in `backend/models/`
  - Backend middleware in `backend/middleware/`
  - React pages in `src/pages/`
  - React shared UI in `src/components/`
  - Frontend global context in `frontend/src/context/`

## Lint and Build

Use these checks after relevant changes:

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

Current baseline:

- `frontend` build passes.
- `admin` build passes.
- `frontend` lint passes.
- `admin` lint passes.

See `current-issues.md` for the observed lint failures.

## Safe Change Guidance

- Keep API response shapes backward compatible with both clients.
- When changing auth, update backend middleware and both clients together.
- When changing product data shape, update admin product creation, frontend product grid/detail/cart/order views, and backend model/controller logic.
- When changing checkout or payment behavior, verify COD, Stripe, Razorpay, cart clearing, and order history.
- Do not remove existing image assets unless every import from `assets.js` and UI reference is updated.

## Testing

- There are no automated tests in the backend, frontend, or admin packages.
- Backend `npm test` is the default placeholder and exits with an error.
- For feature work, add tests only after choosing or introducing a test runner intentionally. Until then, verify with builds, lint where possible, and manual API/UI checks.
