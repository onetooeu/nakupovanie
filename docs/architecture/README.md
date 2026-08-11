# Architecture

This directory contains durable architectural context for Nakupovanie.

## Baseline

The initial architecture is a modular monolith with hard package boundaries, a provider-neutral agent control plane, API-first interfaces, PostgreSQL for durable state, and evidence-first delivery.

The current intended repository shape will grow toward:

- `apps/web`
- `apps/api`
- `apps/worker`
- `packages/kernel`
- `packages/domain`
- `packages/application`
- `packages/contracts`
- `packages/database`
- `packages/events`
- `packages/policy`
- `packages/security`
- `packages/naos-core`
- `packages/naos-runtime`
- `packages/observability`
- `packages/config`
- `packages/ui`
- `packages/testkit`

Directories are introduced only by explicit work items.

## Decision Records

Accepted architectural decisions are recorded under `docs/architecture/adr/`.

An ADR explains a durable decision and its consequences. It is not a substitute for the Project Constitution or a work-item contract.

If implementation and an accepted ADR conflict, stop and resolve the conflict explicitly rather than silently drifting the architecture.
