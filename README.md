# Nakupovanie Platform

Shared digital-commerce platform for:

- `nakupovanie.sk` — Slovakia
- `nakupovani.cz` — Czechia

This repository is being built step by step under the Nakupovanie M0 build plan.

## Current state

The repository has a Node.js 24, pnpm 11, and strict TypeScript toolchain baseline,
plus three application entry points:

- `apps/web` — Next.js presentation shell for the native SK and CZ markets;
- `apps/api` — Fastify HTTP adapter with a health endpoint;
- `apps/worker` — framework-light background worker entry point.

The PostgreSQL adapter is isolated in `packages/database`. Start its local service,
apply migrations, and run the live integration gate with:

```powershell
docker compose up -d --wait postgres
$env:DATABASE_URL = "postgresql://nakupovanie:local-development-only@localhost:5432/nakupovanie"
corepack pnpm --filter @nakupovanie/database db:migrate
corepack pnpm test:integration:database
```

Run the complete local gate with:

```powershell
corepack pnpm check
```

Production deployment, domain behavior, and merchant integrations are not part of this baseline.
