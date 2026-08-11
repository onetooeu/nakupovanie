# M0 Autonomous Build Roadmap

Status: **ACTIVE**

The autonomous controller should select the first unchecked item that can be completed safely as one bounded work item.

Do not work on multiple major milestones in one controller iteration.

## M0

- [x] NAK-M0-007 — Toolchain and TypeScript baseline
- [ ] NAK-M0-008 — Application skeleton: web, api, worker
- [ ] NAK-M0-009 — PostgreSQL local baseline and database adapter
- [ ] NAK-M0-010 — Kernel primitives
- [ ] NAK-M0-011 — Gaming domain reference model
- [ ] NAK-M0-012 — Commerce offer model
- [ ] NAK-M0-013 — Pricing Engine v0.1
- [ ] NAK-M0-014 — Trust and Quarantine v0.1
- [ ] NAK-M0-015 — Eligibility and deterministic ranking v0.1
- [ ] NAK-M0-016 — Event/outbox baseline
- [ ] NAK-M0-017 — Audit/evidence model
- [ ] NAK-M0-018 — NAOS core identities/governance baseline
- [ ] NAK-M0-019 — Capability Gateway baseline
- [ ] NAK-M0-020 — API surface for synthetic M0
- [ ] NAK-M0-021 — SK/CZ web presentation for synthetic M0
- [ ] NAK-M0-022 — End-to-end synthetic scenario
- [ ] NAK-M0-023 — Recovery/restore drill
- [ ] NAK-M0-024 — M0 architecture/security closure audit

## M0 synthetic scenario

Use synthetic data only.

Reference scenario:

- `TEST RPG 2077`
- one unknown cheapest offer is quarantined/unverified
- one authorized offer is eligible for Recommended
- affiliate economics are absent from organic ranking
- deterministic reason codes explain the decision

## Promotion rule

A checkbox may be marked complete only when the bounded work item has:

- implementation complete;
- required tests/gates passing;
- independent reviewer approval;
- controller safety gate approval;
- evidence written;
- local commit successfully created.

If a work item is blocked, preserve state and attempt bounded diagnosis/repair. Do not skip the item merely to make the roadmap appear complete.
