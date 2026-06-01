# ZeeStyle

## Overview

ZeeStyle is an online clothing store for customers shopping fashion products and admins managing the catalog and orders. It solves the core e-commerce workflow by combining a customer storefront, a separate admin panel, and an Express/MongoDB backend for catalog browsing, cart management, checkout, payment verification, user authentication, password reset, product administration, and order management.

## Goals

- Let customers browse, search, filter, sort, and view clothing products.
- Let authenticated customers manage carts, place orders, and view order history.
- Support checkout through cash on delivery, Stripe, and Razorpay.
- Let admins add/remove products and update order statuses from a gated dashboard.

## Core User Flow

- Customer lands on `/` and views hero, latest collection, best sellers, policy, and newsletter sections.
- Customer browses `/collection`, searches, filters by category/type, sorts by price, and opens `/product/:productId`.
- Customer selects a size, adds a product to cart, signs in or signs up through `/login`, and reviews `/cart`.
- Customer checks out through `/place-order`, completes COD, Stripe, or Razorpay flow, verifies Stripe on `/verify`, and reviews `/orders`.
- Customer can request a reset email on `/forgot-password` and set a new password on `/reset-password/:token`.

## Features

### Customer Features

Implemented customer routes in `frontend/src/App.jsx`:

- `/`: home page with hero, latest collection, best sellers, policy, and newsletter sections.
- `/collection`: product grid with search, category filters, type filters, and price sorting.
- `/product/:productId`: product detail page with image gallery, size selection, add to cart, static reviews/description, and related products.
- `/cart`: authenticated cart page.
- `/place-order`: authenticated checkout page.
- `/orders`: authenticated order history page.
- `/login`: login and signup form.
- `/forgot-password`: password reset email form.
- `/reset-password/:token`: new password form.
- `/verify`: Stripe payment verification redirect handler.
- `/about` and `/contact`: static content pages.

### Admin Features

Implemented admin routes in `admin/src/App.jsx`:

- `/add`: product creation with up to four images, category, subcategory, sizes, price, and bestseller flag.
- `/list`: product list and product removal.
- `/orders`: all orders list, address details, payment status, and order status updates.
- The admin app gates all dashboard routes behind a token stored in `localStorage`.

### Backend Features

API route groups:

- `/api/user`: user registration, login, forgot password, reset password, and admin login.
- `/api/product`: product list, add, remove, and single product lookup.
- `/api/cart`: authenticated cart get, add, and update.
- `/api/order`: authenticated customer order placement, Stripe checkout, Razorpay order creation, payment verification, customer order history, admin order list, and admin status updates.

## Data Models

`user`:

- `name`, `email`, `password`
- `cartData` object keyed by product id and size
- `resetPasswordToken`, `resetPasswordExpire`
- timestamps enabled

`product`:

- `name`, `description`, `price`
- `image` array of Cloudinary URLs
- `category`, `subCategory`
- `sizes` array
- `bestseller`
- `date` timestamp number

`order`:

- `userId`
- `items` array
- `amount`
- `address`
- `status`
- `paymentMethod`
- `payment`
- `date` timestamp number

## Integrations

- MongoDB through Mongoose.
- Cloudinary for product image uploads.
- Stripe Checkout for card payments.
- Razorpay Checkout for Razorpay payments.
- Brevo SMTP API for password reset emails.
- React Toastify for user-visible status messages.

## Scope

### In Scope

- `frontend/`: customer app.
- `admin/`: admin app.
- `backend/`: API server, database models, route modules, controllers, middleware, config, and email utilities.
- `context/feature-specs/`: spec-driven development context.
- Catalog browsing, filtering, product detail pages, cart management, checkout, online payment verification, cash on delivery, user authentication, password reset, product administration, and admin order management.

### Out of Scope

- Automated tests are not present in the existing project overview or current packages.
- Customer-facing wishlist, reviews management, inventory management, coupons, shipping carrier tracking, and analytics are not represented by the existing routes or feature list.
- Shared package/workspace architecture is not present; each app is a separate folder.

## Success Criteria

- Customer routes support browsing, filtering, product detail, authenticated cart, authenticated checkout, authenticated orders, login/signup, and password reset flows.
- Admin routes support gated product creation, product removal, all-order viewing, and order status updates.
- Backend API route groups support user, product, cart, and order operations used by both React apps.
- MongoDB, Cloudinary, Stripe, Razorpay, Brevo, and React Toastify integrations remain connected to the features listed above.
