# ADR 0001: Modular Monolith and Hard Dependency Boundaries

Status: **ACCEPTED**
Date: **2026-08-11**

## Context

Nakupovanie is intended to become a sophisticated digital-commerce and agent-operated platform, but the first release must remain understandable, reproducible, and operable on a modest development environment.

Premature distribution would increase operational, testing, deployment, and observability complexity before real scaling constraints are known.

## Decision

Use a modular monolith as the default architecture.

Dependency direction:

`kernel <- domain <- application <- adapters/apps`

The domain core must not depend on database frameworks, web frameworks, AI-provider SDKs, or deployment infrastructure.

Database access is isolated behind database adapters.

API and worker entry points invoke application use cases rather than bypassing them.

The web layer is presentation and interaction; it does not own pricing, trust, eligibility, or ranking rules.

AI-provider integrations sit behind provider-neutral runtime interfaces.

Logical PostgreSQL schemas may separate domains while remaining in one physical database initially.

## Consequences

Benefits:

- simpler local operation;
- fewer distributed failure modes;
- easier transactional consistency;
- stronger architecture testing;
- lower infrastructure cost;
- clearer extraction points if future scale requires services.

Costs:

- boundaries require discipline even though modules share one process/repository;
- poorly designed imports could turn the monolith into a coupled codebase;
- future extraction may require migration work.

## Not Chosen Now

Not part of the initial baseline without a new ADR and measured need:

- microservice decomposition;
- Kafka/NATS;
- Kubernetes;
- Redis as mandatory infrastructure;
- vector database;
- graph database;
- separate policy service.

These technologies are not forbidden forever. They require evidence that the simpler baseline is insufficient.
