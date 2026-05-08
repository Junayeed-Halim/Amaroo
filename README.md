# Amaroo

Bangladesh-first trust-building eCommerce platform scaffold.

## Monorepo structure

- `apps/`
  - `buyer-web/` (Next.js)
  - `seller-dashboard/` (planned)
  - `admin-panel/` (planned)
- `services/`
  - `auth/`
  - `product-catalog/`
  - `orders/`
  - `inventory/`
  - `payments/`
  - `shipping/`
  - `search/`
  - `notifications/`
- `packages/`
  - `ui/` shared UI kit placeholder
- `infrastructure/`
  - `docker-compose.yml` local dependencies (PostgreSQL, Redis, Meilisearch)

## Quick start

### 1) Run local infrastructure

```bash
docker compose -f infrastructure/docker-compose.yml up -d
```

Services:
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- Meilisearch: `localhost:7700`

### 2) Run buyer web app

```bash
cd apps/buyer-web
npm install
npm run dev
```

Open `http://localhost:3000`.

## Bangladesh-focused integration direction

- **Payments**: bKash, Nagad, Rocket, SSLCommerz, AmarPay, Visa/Mastercard, COD
- **Shipping**: Pathao, Steadfast, REDX, Paperfly, Sundarban
- **Platform**: Firebase push, Cloudflare CDN, S3/Wasabi storage

See `ARCHITECTURE.md`, `PRODUCT_VISION.md`, and `ROADMAP.md`.
