## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Customer UI | React, Vite, React Router, Tailwind CSS | Storefront, catalog browsing, cart, checkout, auth, order history |
| Admin UI | React, Vite, React Router, Tailwind CSS | Product management and order status management |
| API | Node.js, Express | JSON API, route/controller orchestration, auth middleware |
| Database | MongoDB, Mongoose | Users, products, carts, orders, reset tokens |
| Media | Cloudinary, Multer | Product image upload and hosted image URLs |
| Payments | Stripe, Razorpay | Checkout session/order creation and payment verification |
| Email | Brevo SMTP API via Axios | Password reset email delivery |

## System Boundaries

- `admin/`: owns admin login, product CRUD UI, and order management UI.
- `backend/`: owns API routes, controllers, models, middleware, service configuration, and third-party integrations.
- `frontend/`: owns customer storefront, customer auth UI, cart UI, checkout UI, and order history UI.

## Storage Model

- MongoDB stores users, user cart data, password reset fields, products, and orders.
- Cloudinary stores uploaded product images.
- MongoDB product documents store Cloudinary image URLs, not image binaries.

## Auth and Access Model

- Customer auth uses JWTs issued by register/login and verified by `authUser`.
- Admin auth uses a JWT issued by admin login and verified by `adminAuth`.
- Clients send tokens in the standard `Authorization: Bearer <token>` request header.
- Product list and single-product detail endpoints are public catalog reads.
- Protected controllers must use the authenticated user/admin identity from middleware, not trust client-supplied identity.

## Invariants

- Protected customer routes must pass through `authUser` before reading or changing user cart or order data.
- Protected admin routes must pass through `adminAuth` before adding/removing products or reading/updating all orders.
- Authenticated customer controllers read `req.userId` set by `authUser`, not user-supplied body data.
- Customer product detail reads `/api/product/single` directly by product id.
- API responses must include a `success` boolean so both React clients can branch consistently.
- Product creation must save image URLs, category, subCategory, parsed sizes, numeric price, bestseller flag, and timestamp together.
- Order placement must persist the order before clearing cart data or starting payment verification.
