# ADR 0005: NAOS Provider-Neutral Agent Governance

Status: **ACCEPTED**
Date: **2026-08-11**

## Context

The long-term project goal includes a highly autonomous AI-native company whose agents can improve, share skills, create successors, retire, preserve institutional memory, and operate domains with progressively less routine human intervention.

If the agent organization is tied to one model vendor, or if agents can self-escalate, self-approve, erase failures, or modify production versions directly, autonomy becomes fragile and unsafe.

## Decision

NAOS (Nakupovanie Agent Operating System) is provider/runtime-neutral.

Stable agent identity is distinct from the model/provider configuration serving the agent.

Agent authority is decomposed into identity, capability, and autonomy.

No agent may:

- increase its own capabilities;
- increase its own budget;
- grant itself production rights;
- self-approve a materially conflicting change;
- rewrite the Constitution autonomously;
- delete its evaluations, incidents, lineage, or audit history.

Self-improvement creates a candidate version that passes independent evaluation and staged promotion before becoming active.

Skill sharing, mentoring, succession readiness, and critical-skill redundancy are organizational duties.

Retirement preserves identity, lineage, verified snapshots, skills, and history. Retired agents may perform bounded advisory roles without silently recovering production authority.

Sentinel is a safety mechanism outside ordinary business voting/execution and has a limited intervention capability set.

## Consequences

Benefits:

- model/provider portability;
- auditable autonomy;
- safer self-improvement;
- preserved institutional memory;
- lower key-person/agent risk;
- clearer separation of powers.

Costs:

- more governance models and evaluation infrastructure;
- slower promotion of agent changes;
- explicit capability and lineage management.

These costs are accepted as necessary foundations for durable autonomous operation.
