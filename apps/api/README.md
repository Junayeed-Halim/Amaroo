# API App (NestJS scaffold)

Phase 1 backend for the Amaroo Bangladesh ecommerce platform.

## Modules

| Module | Description |
|---|---|
| `auth` | Phone-based registration & login, OTP (rate-limited, 5-min TTL), JWT access + refresh tokens |
| `products` | Product catalogue with search, filter, sort, soft-delete, featured & category endpoints |
| `orders` | Checkout, order detail + shipment, cancel, address management, payment status mark |
| `courier` | Steadfast-first shipment creation, single + bulk tracking, delivery-fee calculation |
| `payments` | COD confirmation, SSL Commerz initiate / success / fail / IPN handlers |
| `seller` | Seller registration (KYC pending), dashboard stats, public shop page by slug |

## Endpoint catalogue (`/api/v1`)

### Auth
| Method | Path | Description |
|---|---|---|
| `POST` | `/auth/register` | Register buyer (phone + password) |
| `POST` | `/auth/login` | Login with phone + password |
| `POST` | `/auth/otp/send` | Send OTP (rate-limited: 3/hour/phone) |
| `POST` | `/auth/otp/verify` | Verify OTP and mark user as verified |
| `POST` | `/auth/refresh` | Refresh access token |
| `POST` | `/auth/logout` | Logout (stateless; invalidate client-side) |
| `GET`  | `/auth/me` | Get current user from Bearer token |

### Products
| Method | Path | Description |
|---|---|---|
| `GET`   | `/products` | List products (filter, sort, paginate) |
| `GET`   | `/products/search?q=` | Full-text search |
| `GET`   | `/products/featured` | Featured/promoted products |
| `GET`   | `/products/category/:slug` | Products by category slug |
| `GET`   | `/products/:slug` | Get single product |
| `POST`  | `/products` | Create product (seller auth in prod) |
| `PATCH` | `/products/:id` | Update product |
| `DELETE`| `/products/:id` | Soft-delete product |

### Orders
| Method | Path | Description |
|---|---|---|
| `GET`   | `/orders?buyer_id=` | List buyer's orders |
| `POST`  | `/orders` | Create order (checkout) |
| `GET`   | `/orders/:id` | Order detail + items + shipment |
| `PATCH` | `/orders/:id/cancel` | Cancel order (before shipped) |
| `PATCH` | `/orders/:id/payment` | Mark payment status |
| `POST`  | `/orders/addresses` | Create delivery address |
| `GET`   | `/orders/addresses?user_id=` | List user addresses |

### Payments
| Method | Path | Description |
|---|---|---|
| `GET`  | `/payments/:orderId` | Get payment record for an order |
| `POST` | `/payments/cod/confirm` | Confirm COD collection |
| `POST` | `/payments/sslcommerz/initiate` | Start SSL Commerz session |
| `POST` | `/payments/sslcommerz/success` | Success redirect from SSL Commerz |
| `POST` | `/payments/sslcommerz/fail` | Fail redirect from SSL Commerz |
| `POST` | `/payments/sslcommerz/ipn` | IPN webhook from SSL Commerz |

### Courier
| Method | Path | Description |
|---|---|---|
| `GET`  | `/courier/shipments/:consignmentId` | Track single shipment |
| `POST` | `/courier/shipments/track` | Bulk track shipments |

### Seller
| Method | Path | Description |
|---|---|---|
| `POST` | `/seller/register` | Apply as seller (KYC pending) |
| `GET`  | `/seller/:id/dashboard` | Seller dashboard headline stats |
| `GET`  | `/seller/:id` | Seller detail |
| `GET`  | `/seller/shop/:slug` | Public shop page by slug |

## Environment

Copy `.env.example` at the repo root to `.env` and fill in values before starting.

Required at startup:
- `JWT_SECRET` — minimum 32 characters, random.
- `PORT` — defaults to `4000`.

## Running locally

```bash
# from repo root
npm install
npm --prefix apps/api run start:dev
```

API will be available at `http://localhost:4000/api/v1`.
