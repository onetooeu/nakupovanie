# ADR 0002: Evidence-First, Reversible Delivery

Status: **ACCEPTED**
Date: **2026-08-11**

## Context

The project is expected to become highly automated and eventually agent-operated. Higher autonomy is safe only if changes remain observable, testable, auditable, and recoverable.

A successful command is not sufficient evidence that a change is correct.

Git history alone is not a backup or a complete operational audit trail.

## Decision

Build and promotion follow bounded work items with explicit verification and evidence.

Every material step should define:

- purpose;
- preconditions;
- allowed and forbidden changes;
- verification;
- expected result;
- evidence;
- rollback or forward repair;
- promotion gate.

PASS means all mandatory gates passed.

Failures are retained when they provide diagnostic or historical value.

Risky changes use snapshots/known-good states where appropriate.

No significant cleanup deletes the evidence needed to understand what happened.

Backups are considered operationally proven only after restore testing.

## Consequences

Benefits:

- reproducible decision history;
- safer automation;
- easier incident analysis;
- clearer release gates;
- better company/IP due diligence;
- reduced dependence on undocumented human memory.

Costs:

- more evidence files;
- slower early steps;
- deliberate closure audits before promotion.

This overhead is accepted because it is part of the product's long-term autonomy and recoverability strategy.
