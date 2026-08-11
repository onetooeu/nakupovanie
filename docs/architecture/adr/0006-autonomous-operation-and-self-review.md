# ADR 0006: Autonomous Operation and Independent Self-Review

Status: **ACCEPTED**
Date: **2026-08-11**

## Context

The project is intentionally experimental and is expected to evolve toward continuous autonomous operation.

Requiring the founder to approve every routine shell command or bounded engineering step adds latency without adding meaningful assurance when the founder is simply confirming an already-reviewed plan.

At the same time, allowing one implementing agent to write, review and approve its own work without independent gates would create an avoidable single-agent failure mode.

## Decision

Routine human approval is removed from the engineering loop.

The default autonomous engineering sequence is:

`planner/builder -> deterministic tests -> independent reviewer -> controller policy gate -> repair or automatic approval -> local commit`

Codex non-interactive runs use an approval policy that does not pause for user approval.

The normal implementation sandbox is project-scoped writable access plus the project Evidence/Autonomy roots and network access. Host-wide unrestricted execution is not the default because it does not improve ordinary repository work.

The controller may retry transient failures and usage-limit interruptions without human intervention.

Local commits are permitted after automatic gates pass.

Remote push, production promotion, financial authority, secrets, constitutional capability escalation, and similar higher-risk surfaces receive dedicated policy lanes as those capabilities are introduced.

## Consequences

Benefits:

- no routine click-to-approve bottleneck;
- continuous progress while unattended;
- preserved separation between implementation and review;
- deterministic evidence for automatic approvals;
- lower founder operational load;
- straightforward transition to multi-agent NAOS governance.

Costs:

- controller/reviewer logic becomes part of the trusted computing base;
- poorly designed automatic gates can approve weak work;
- autonomous loops require rate-limit, retry and incident handling;
- host-wide tasks require explicit isolated execution design rather than ad hoc elevation.

These costs are accepted.
