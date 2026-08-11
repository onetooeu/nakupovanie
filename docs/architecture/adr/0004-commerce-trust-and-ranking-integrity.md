# ADR 0004: Commerce, Trust, and Ranking Integrity

Status: **ACCEPTED**
Date: **2026-08-11**

## Context

A comparison platform can destroy user trust if ranking is secretly influenced by commissions, if cheap but unverified offers are presented as recommendations, or if authorization/region/ownership semantics are flattened into simplistic labels.

Nakupovanie must support price competition without turning low price into a substitute for provenance and compatibility.

## Decision

Organic ranking is independent of affiliate compensation.

Trust is multidimensional and includes hard eligibility gates that cannot be averaged away.

Separate:

- source class;
- operational state;
- authorization evidence;
- provenance;
- regional/activation compatibility;
- price/economic terms.

Unknown sources default to unverified/quarantine treatment.

A low price may appear in a Cheapest view with an appropriate warning, but it does not automatically qualify for Recommended or Trusted Cheapest.

Authorization is scoped relationship evidence, not a universal merchant flag.

Price observations are append-only historical observations. Effective price, TCO, deal score, and recommendations are derived decisions with policy/version provenance.

Explicit user constraints are applied before ranking.

## Consequences

Benefits:

- defensible customer trust;
- less incentive corruption;
- clear treatment of unknown merchants;
- better auditability of recommendation decisions;
- compatibility with multiple ranking profiles.

Costs:

- more data/evidence requirements;
- some apparently cheap offers will be excluded from trusted recommendation paths;
- merchant onboarding requires evidence rather than a single trust score.
