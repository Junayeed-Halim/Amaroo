# Testing Strategy

## Overview

We follow a three-layer testing strategy aligned with the Phase 1 scope: unit tests for services, integration tests for API endpoints, and end-to-end (E2E) smoke tests for the buyer checkout flow. No test runner is wired up yet — this document records the agreed approach so the first test PR has a clear target.

## Layer 1 — Unit tests (services)

| Module | Key scenarios to test |
|---|---|
| `AuthService` | register creates user + returns tokens; login fails on wrong password; OTP rate-limits after 3 sends; OTP expires after 5 min; refresh verifies token |
| `ProductsService` | list filters by category/price/stock; soft-delete hides product from list; featured returns only `isFeatured=true` |
| `OrdersService` | checkout throws on missing address; checkout throws on insufficient stock; stock is decremented on checkout; COD order gets `status=confirmed` immediately; cancel throws for shipped orders |
| `CourierService` | `calculateDeliveryFee` returns 110 for Dhaka, 150 elsewhere; `getShipmentByOrderId` returns correct shipment |
| `PaymentsService` | `handleSslCommerzSuccess` marks payment completed when status=VALID; `handleSslCommerzFail` marks payment failed |

**Tool:** Jest + `@nestjs/testing` (add with `npm install --save-dev jest @types/jest ts-jest @nestjs/testing`).

## Layer 2 — API integration tests

Spin up the NestJS app with `createNestApplication()` (no DB) and exercise full HTTP request → response cycles. Key flows:

1. `POST /api/v1/auth/register` → `POST /api/v1/auth/login` → `GET /api/v1/auth/me`
2. `POST /api/v1/products` → `GET /api/v1/products/:slug` → `GET /api/v1/products/featured`
3. `POST /api/v1/orders/addresses` → `POST /api/v1/orders` (COD) → `GET /api/v1/orders/:id`
4. `POST /api/v1/payments/sslcommerz/initiate` → `POST /api/v1/payments/sslcommerz/success`
5. `POST /api/v1/seller/register` → `GET /api/v1/seller/:id/dashboard`

**Tool:** Jest + Supertest (`npm install --save-dev supertest @types/supertest`).

## Layer 3 — Browser E2E smoke tests (buyer flow)

Target: homepage → product detail → cart → checkout → success page.

**Tool:** Playwright (`npm install --save-dev @playwright/test`).

Scenarios:
- Language toggle switches displayed text between EN and BN on every page.
- Product card links navigate to the correct product detail page.
- `/auth/login` renders with both Password and OTP mode tabs.
- `/auth/register` two-step form renders without errors.
- `/checkout/success` renders the order-placed confirmation with action buttons.
- `/track/SFD-TESTID` renders the shipment timeline.

## CI pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml (planned)
on: [push, pull_request]
jobs:
  api-unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm --prefix apps/api run test

  buyer-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run lint:buyer && npm run build:buyer
```

## Launch checklist items covered by tests

- [ ] All API endpoints exercised by integration tests before go-live.
- [ ] COD checkout flow verified in staging with a real Steadfast test order.
- [ ] SSL Commerz sandbox IPN verified end-to-end (use ngrok or a staging server).
- [ ] OTP rate limiting verified: 4th send within 1 h must return 401.
- [ ] Password hashing cost factor 12 verified (bcrypt rounds).
