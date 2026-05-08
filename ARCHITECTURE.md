# ARCHITECTURE

## System components

- **Buyer Web App (Next.js)**: bilingual storefront (Bangla/English), trust-first product discovery and checkout UX.
- **Seller Dashboard**: catalog, inventory, order, payout, and support tooling for merchants.
- **Admin Panel**: KYC, moderation, fraud/risk, disputes, and operations monitoring.
- **Core services**:
  - Auth
  - Product Catalog
  - Orders
  - Inventory
  - Payments
  - Shipping
  - Search
  - Notifications

## Data flow (high level)

1. Buyer discovers products through `buyer-web` -> `search` and `product-catalog`.
2. Checkout creates order through `orders`; stock reserved via `inventory`.
3. `payments` initiates bKash/Nagad/Rocket/SSLCommerz/AmarPay/card/COD flow.
4. On payment confirmation, `orders` state advances and `shipping` books courier.
5. `shipping` returns tracking updates (Pathao/Steadfast/REDX/Paperfly/Sundarban).
6. `notifications` sends updates via Firebase push and future SMS/email channels.

## Trust features

- Clear order timeline and payment status transparency
- Idempotent APIs and auditable event history
- Fraud/risk checks in admin workflows
- Courier-tracking visibility and delivery proof hooks
- Escrow-holdback capable payment domain model
- Cloudflare edge protection and object-storage policy controls (S3/Wasabi)

## Infrastructure baseline

- PostgreSQL (transactional system of record)
- Redis (cache/session/queue support)
- Meilisearch (fast Bengali/English search)
- Containerized local development via Docker Compose
