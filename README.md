## Farm-to-Table Backend (Node.js + TypeScript)

This is the backend service for the Farm-to-Table subscription platform. It exposes secure REST APIs for customers, farmers, and admins, built with **Node.js**, **TypeScript**, **Express**, **Prisma**, **Zod**, and **PostgreSQL**, following a clean architecture layout.

---

## Project architecture

**Tech stack**
- **Runtime**: Node.js, TypeScript
- **HTTP**: Express
- **ORM**: Prisma (PostgreSQL + `@prisma/adapter-pg`)
- **Validation**: Zod
- **Auth**: JWT access & refresh tokens (argon2 password hashing)

**High-level structure**

- `src/bootstrap/`
  - `index.ts` – application entrypoint (loads env, starts HTTP server).
- `src/config/`
  - `env.ts` – Zod-validated environment configuration (DB + JWT + refresh tokens).
- `src/core/`
  - `logging/` – centralized logger.
  - `security/` – password hashing + JWT helpers (access + refresh tokens).
- `src/domain/`
  - Pure domain models and repository interfaces (e.g. `users`, `customers`, `products`, `subscriptions`, `orders`).
- `src/application/`
  - Use cases (business logic) and DTOs – e.g. `auth` (register/login/refresh), `users`, `products`, etc.
- `src/infrastructure/`
  - `db/` – Prisma client + repository implementations (e.g. `PrismaUserRepository`).
  - `http/` – Express server, routes, middleware.
- `src/interface/`
  - `http/controllers` – controllers that adapt HTTP requests to use cases.
  - `http/validators` – Zod schemas per route.
- `prisma/`
  - `schema.prisma` – data model for all platform entities (users, customers, farmers, products, subscriptions, orders, payments, deliveries, referrals).

Clean architecture layering:

- **Domain**: business entities and contracts (no framework dependencies).
- **Application**: use cases orchestrating domain logic.
- **Interface**: controllers + validators.
- **Infrastructure**: frameworks/IO (Express, Prisma, DB, HTTP).

---

## Setting up and running the project

### 1. Prerequisites

- Node.js 20+
- PostgreSQL running locally or in the cloud

### 2. Install dependencies

From the `backend` directory:

```bash
npm install
```

### 3. Configure environment variables

Create `.env` in `backend/` (if not already present) and set:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"

JWT_SECRET="your-long-access-token-secret"
JWT_EXPIRES_IN="15m"

REFRESH_TOKEN_SECRET="your-long-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN="7d"
```

> **Note**: `JWT_SECRET` and `REFRESH_TOKEN_SECRET` must be long, random strings (32+ characters). Avoid special URL characters in `DATABASE_URL` password, or URL-encode them.

### 4. Database migrations

Generate and apply migrations based on `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name init
```

You can inspect the DB with:

```bash
npx prisma studio
```

### 5. Generate Prisma client

This is typically handled by `migrate dev`, but can be run manually:

```bash
npx prisma generate
```

### 6. Run the development server

```bash
npm run dev
```

By default the API listens on **port 4000**. You can change it via the `PORT` env variable.

Health check:

- `GET /` – basic API info
- `GET /health` – checks database connectivity

### 7. Build and run in production mode

```bash
npm run build
npm start
```

---

## Authentication overview

- **Roles**: `admin`, `customer`, `farmer`
- **Login identifier**: **phone number** (email is optional and only used for contact)
- **Security**:
  - Passwords hashed with `argon2`
  - Short-lived **access tokens** (JWT)
  - Long-lived **refresh tokens** (JWT, separate secret)

Key auth endpoints (all `POST`):

- `POST /auth/admin/login`
- `POST /auth/customer/register`
- `POST /auth/customer/login`
- `POST /auth/farmer/register`
- `POST /auth/farmer/login`
- `POST /auth/refresh` – exchange refresh token for new access + refresh tokens

On successful register/login, responses include:

```json
{
  "accessToken": "…",
  "refreshToken": "…",
  "user": {
    "id": "…",
    "name": "…",
    "email": null,
    "role": "customer"
  }
}
```

---

## Postman collection

A ready-to-use Postman collection is available at:

- `backend/postman.json`

It contains three folders:

- **Admin** – admin login
- **Customer** – customer register/login
- **Farmer** – farmer register/login

The collection defines a `baseUrl` variable (default `http://localhost:4000`) so you can easily switch environments.

---

## How to deploy

Below is a generic deployment approach; adapt to your target platform (Docker, VPS, cloud service).

### 1. Build the project

On your CI/CD or server:

```bash
npm install
npm run build
```

### 2. Provision PostgreSQL

- Create a managed Postgres instance (e.g. on Railway, Supabase, RDS, etc.), or run Postgres in a managed VM/container.
- Obtain a connection string and set it as `DATABASE_URL` in the production environment.

### 3. Configure production environment variables

Set, at minimum:

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `REFRESH_TOKEN_SECRET`
- `REFRESH_TOKEN_EXPIRES_IN`
- `NODE_ENV=production`
- `PORT` (e.g. `4000` or whatever your platform expects)

### 4. Run migrations on the server

From the deployed code:

```bash
npx prisma migrate deploy
```

This applies existing migrations without creating new ones.

### 5. Start the server

Typical examples:

- **Plain Node**:
  ```bash
  npm start
  ```

- **With a process manager (recommended)**:
  - Using PM2:
    ```bash
    pm2 start dist/bootstrap/index.js --name farm-backend
    pm2 save
    ```

Ensure your reverse proxy (Nginx/Traefik) or cloud platform is forwarding traffic to the correct `PORT`.

---


