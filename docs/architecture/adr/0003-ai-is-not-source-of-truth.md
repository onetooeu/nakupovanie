# ADR 0003: AI Is Not the Source of Truth

Status: **ACCEPTED**
Date: **2026-08-11**

## Context

Nakupovanie will use AI extensively for intent parsing, matching, explanations, operational workflows, agent collaboration, and future autonomous company functions.

Commerce decisions also depend on facts that must be deterministic, evidenced, time-aware, and legally/operationally defensible.

Treating model output as authoritative state would blur inference and fact, weaken reproducibility, and create unsafe automation paths.

## Decision

AI output is advisory or governed derived data unless explicitly verified through an authoritative process.

Canonical state is based on:

- deterministic domain data;
- evidence;
- verified claims;
- policy versions;
- effective-dated business rules;
- audited decisions.

AI may:

- parse intent;
- generate candidate matches;
- classify;
- summarize;
- explain;
- propose changes;
- operate approved workflows through capabilities.

AI may not silently replace a verified fact with an inference.

AI claims carry provenance/state such as inferred, disputed, expired, rejected, historical, or verified.

Model provider/runtime is an adapter, not a domain authority.

## Consequences

Benefits:

- deterministic replay and explanation;
- provider portability;
- safer model upgrades;
- stronger trust and compliance;
- clearer incident diagnosis.

Costs:

- extra claim/evidence modeling;
- verification workflows;
- some AI outputs cannot be applied immediately.

The tradeoff is intentional.
