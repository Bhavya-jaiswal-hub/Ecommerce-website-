# Spec 01 — Product Size Guard and Order Cancellation

Last updated: 2026-06-09.

## Goal

Fix two broken customer-facing flows visible in production:
1. Product page allows Add to Cart without a size selected.
2. Orders page has no way to cancel an order.

## Scope

- `frontend/src/pages/Product.jsx`
- `backend/controllers/orderController.js`
- `backend/routes/orderRoute.js`
- `frontend/src/pages/Orders.jsx`

Out of scope: payment refund logic, admin cancel view, email notifications.

## Invariants

- Protected customer routes pass through `authUser`; controllers read `req.userId`.
- API responses include a `success` boolean.
- Clients send `Authorization: Bearer <token>`.

---

## Part A — Product page size guard

### Problem

User can click ADD TO CART without selecting a size.
Selected size button styling exists in the codebase but
may not be enforced before cart addition.

### Acceptance criteria

- [ ] Clicking ADD TO CART with no size selected shows a toast
      error and does not add to cart.
- [ ] Selected size button is visually distinct using
      `border-orange-500` per ui-context.md.
- [ ] `npm.cmd run build` passes in `frontend/`.

---

## Part B — Backend cancel route

### Problem

No endpoint exists for customers to cancel their own orders.

### Acceptance criteria

- [ ] `POST /api/order/cancel` accepts `{ orderId }` in the
      request body.
- [ ] Route is protected by `authUser` middleware.
- [ ] Controller reads the authenticated user from `req.userId`,
      not from the request body.
- [ ] Cancellation is blocked if order status is `Shipped`,
      `Out for Delivery`, or `Delivered`.
- [ ] On success, order status is updated to `Cancelled` and
      response is `{ success: true }`.
- [ ] On failure (not found, unauthorized, blocked status),
      response is `{ success: false, message: '...' }` with
      no unhandled throw.

---

## Part C — Orders page cancel button and status tracker

### Problem

- No cancel button exists on the Orders page.
- Track Order button is a dead UI element with no functionality.

### Acceptance criteria

- [ ] Orders with status `Order Placed` or `Packing` show a
      Cancel Order button.
- [ ] Clicking Cancel calls the new backend route, shows a
      toast on success or failure, and refreshes the order list.
- [ ] Orders with status `Cancelled` show a red Cancelled label
      instead of the Cancel button.
- [ ] Track Order button toggles an inline step indicator.
- [ ] Step indicator shows these stages in order: Order Placed →
      Packing → Shipped → Out for Delivery → Delivered.
- [ ] Completed stages are visually distinct from pending stages.
- [ ] `npm.cmd run build` passes in `frontend/`.

---

## Manual testing checklist

- [ ] Add to cart with no size selected → error toast, cart unchanged.
- [ ] Select a size → orange border appears → add to cart succeeds.
- [ ] Cancel an Order Placed order → status becomes Cancelled.
- [ ] Cancel a Shipped order → error toast, status unchanged.
- [ ] Track Order expands step dots correctly for each status value.
- [ ] Cancelled order shows label only, no Cancel button.

## Safe change notes

- Do not change the `order` Mongoose model schema.
- Do not change any other order controller exports.
- Keep `success` boolean in all cancel responses.
- Match the existing `Authorization: Bearer` header pattern
  used in other axios calls in `Orders.jsx`.