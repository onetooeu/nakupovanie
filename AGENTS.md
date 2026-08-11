# Nakupovanie Repository Instructions

This file is the root instruction contract for coding agents working in this repository.
Its scope is the entire repository unless a more deeply nested `AGENTS.md` explicitly narrows or strengthens a rule for its subtree.

## 1. Read Order

Before changing files:

1. Read this `AGENTS.md`.
2. Read `docs/governance/PROJECT_CONSTITUTION.md`.
3. Read relevant accepted ADRs under `docs/architecture/adr/`.
4. Read the current work-item contract and obey its allowed/forbidden paths.
5. Inspect current Git status before and after work.

Direct task instructions may narrow the work item, but they do not silently authorize destructive or high-risk actions.

## 2. Work-Item Discipline

Work one bounded item at a time.

Every implementation item must define, explicitly or by an approved parent plan:

- purpose;
- preconditions;
- allowed changes;
- forbidden changes;
- implementation;
- verification;
- expected result;
- evidence;
- rollback or forward-repair path;
- promotion gate.

Do not perform unrelated cleanup, refactors, dependency upgrades, formatting sweeps, or speculative changes.

If a task can be completed with a smaller patch, prefer the smaller patch.

## 3. Git and Remote Safety

Unless the current work item explicitly authorizes otherwise:

- do not stage files;
- do not commit;
- do not amend;
- do not create branches;
- do not reset;
- do not clean;
- do not delete retained evidence;
- do not rewrite history;
- do not create or modify remotes;
- do not push;
- do not modify GitHub resources.

Never use destructive Git commands as a convenience.

Git is version control, not the backup system.

## 4. Evidence and PASS Semantics

A step is PASS only when all mandatory gates for that step pass.

Do not report "PASS with errors".

Preserve failures that teach us something. Corrections create new evidence; they do not erase old evidence.

For significant work, evidence should include enough of the following to reproduce the conclusion:

- commands executed;
- tool/runtime versions;
- test output;
- relevant hashes;
- before/after state;
- policy or work-item version;
- rollback or recovery information.

Evidence lives outside the repository under `C:\NAKUPOVANIE\Evidence` unless a future ADR changes that rule.

## 5. Architecture Boundary

The baseline architecture is a modular monolith with hard internal boundaries.

Dependency direction is inward:

`kernel <- domain <- application <- adapters/apps`

Rules:

- `packages/domain` must not depend on database drivers, Drizzle, Fastify, Next.js, OpenAI SDKs, or infrastructure adapters.
- `packages/kernel` contains dependency-light shared primitives and must not depend on domain/application/adapters.
- application use cases orchestrate domain behavior and ports.
- database access belongs behind the database adapter/package.
- API routes call application use cases; they do not query the database directly.
- web presentation must not contain pricing, trust, eligibility, or ranking business rules.
- AI providers are adapters behind provider-neutral interfaces.
- vendor-specific concepts must not leak into the generic domain core.

Do not introduce microservices, Kafka/NATS, Kubernetes, Redis, a vector database, or a graph database without measured need and a new accepted ADR.

## 6. Core Business Invariants

These are non-negotiable unless the Constitution itself is formally amended:

- AI is never the source of truth.
- canonical facts, evidence, deterministic rules, and verified state remain authoritative.
- AI may infer, propose, explain, classify, parse intent, or operate governed workflows.
- AI-derived claims must remain distinguishable from verified facts.
- affiliate compensation must never influence organic ranking.
- unknown/unverified merchants default to quarantine/unverified handling and cannot become organically Recommended merely because they are cheaper.
- source class and operational state are separate concepts.
- authorization is evidence-backed and scoped, never a global boolean.
- price observations are historical/append-only observations, not a mutable "current price" truth field.
- money arithmetic must not use JavaScript floating-point arithmetic for business values.
- explicit user constraints override inferred preferences.
- eligibility is evaluated before ranking.
- subscription access must not be represented as ownership.
- gaming DLC/base-product dependencies must be explicit.
- Slovakia and Czechia are native market/localization layers, not one market translated into the other.

## 7. Data, Memory, Event, and Audit Invariants

- current state may change; history must not be silently rewritten.
- domain event, audit event, telemetry, analytics, evidence, claim, and memory are distinct concepts.
- audit corrections are new records, not edits of history.
- memory is not truth.
- secrets are never stored in agent memory, knowledge records, logs, or source control.
- verified claims are not silently overwritten by AI inference.
- derived indexes/caches/search projections must be rebuildable.
- agent identity is independent of the model/provider currently serving it.
- lineage, decision history, incidents, and evaluations are preserved.

## 8. Security and Capability Invariants

Identity, capability, and autonomy are separate.

Hard rules include:

- no self-permission escalation;
- no self-budget escalation;
- no self-approval for materially conflicting decisions;
- no universal agent administrator;
- no unaudited critical action;
- no production self-modification;
- no secret disclosure into prompts, memory, logs, or repositories;
- no Sentinel bypass;
- no deletion of audit/evaluation/incident history;
- no autonomous constitutional rewrite;
- no uncontrolled money movement.

Agents use narrow typed capabilities through governed interfaces. Raw root/database/bank/API secrets are not agent capabilities.

## 9. NAOS Agent Governance

NAOS is provider/runtime-neutral.

Agent improvement is candidate-based:

observe weakness -> propose change -> candidate -> sandbox -> evaluation -> independent review -> shadow/canary -> promotion.

An agent cannot approve its own material capability, production, budget, or genome escalation.

Competition is for responsibility, not existence.

Skill sharing, mentoring, succession readiness, redundancy, and preservation of institutional memory are positive organizational duties.

Retirement is a transition, not deletion. Retired identities, lineage, skills, decisions, and verified snapshots remain auditable and may serve advisory roles without silently regaining production authority.

## 10. Sentinel Boundary

Sentinel is a constitutional safety mechanism, not a business executive.

Its allowed intervention class is limited to safety actions such as:

- pause;
- isolate;
- revoke capability;
- freeze workflow;
- request review;
- restore a last-known-good state;
- open an incident.

Sentinel does not set prices, select merchants, vote on business policy, or perform ordinary commerce.

Every Sentinel intervention must be attributable to a rule, evidence, risk, and remediation path.

## 11. Reversibility and Recovery

Every material change needs a rollback or forward-repair concept.

Prefer:

- small changes;
- snapshots before risky changes;
- shadow execution;
- canaries;
- last-known-good states;
- restore tests;
- reproducible environments.

A backup is not considered proven until restoration is tested.

When in doubt, preserve evidence and stop before destructive action.

## 12. Toolchain Baseline

Current M0 baseline:

- Windows development host;
- Node.js 24 LTS;
- TypeScript strict mode;
- pnpm 11.x via Corepack;
- PostgreSQL target for persistent production data;
- Next.js 16.x planned for web;
- Fastify 5.x planned for API;
- Zod 4 planned for runtime contracts;
- Drizzle planned only behind the database adapter;
- Vitest planned for unit/integration tests;
- Playwright planned for end-to-end tests;
- OpenTelemetry planned for observability.

Do not upgrade or add dependencies merely because a newer package exists. Dependency changes require an explicit work-item reason and evidence.

## 13. Validation Expectations

Run every programmatic check required by the current work item or by an applicable `AGENTS.md`.

For implementation work, expected gates will progressively include:

- format;
- lint;
- typecheck;
- unit tests;
- integration tests;
- architecture-boundary tests;
- migration checks;
- build;
- end-to-end tests;
- security/supply-chain checks.

Do not claim a gate passed unless it was actually executed successfully or the work item explicitly marks it not applicable.

## 14. Encoding and Windows Compatibility

Repository text should be UTF-8 without BOM unless a format explicitly requires otherwise.

Prefer LF line endings for repository text.

Be careful with Windows PowerShell 5.1:

- `-Encoding UTF8` writes a BOM;
- native stderr can surface as PowerShell error records;
- do not treat wrapper behavior as proof of native-process failure without checking the native exit code.

## 15. Scope of Future AGENTS.md Files

Create nested `AGENTS.md` files only when a subtree has stable, materially different rules.

A nested file may strengthen or specialize root rules; it must not silently weaken constitutional safety, evidence, trust, ranking-integrity, or security invariants.

Do not create `.agents/skills` until a workflow has repeated enough to be stable and worth codifying.

## 16. Change to These Rules

Routine tasks must not rewrite this file or the Project Constitution.

A material change to constitutional rules requires:

1. an explicit work item;
2. rationale and evidence;
3. an ADR or constitutional amendment record;
4. independent validation;
5. a rollback/recovery plan.

Until that process completes, existing rules remain authoritative.

## 17. Autonomous Controller Mandate

When work is launched by the Nakupovanie Autonomous Controller, routine user confirmation is not required.

The controller is an authorized approval layer for ordinary project work.

Within a bounded autonomous work item:

- analyze first and record the intended scope;
- proceed without asking the founder to confirm routine actions;
- use Builder and independent Reviewer roles for material code changes;
- run the programmatic gates required by the work item;
- repair rejected work automatically when a bounded repair is available;
- allow the controller to stage and create a local commit after automatic gates pass;
- continue to the next accepted-roadmap item without waiting for a human response.

The implementing Codex worker must not stage, commit or push directly unless the controller prompt explicitly assigns that responsibility. By default, local staging/commit is owned by the deterministic controller after review.

Network access for documentation, dependency resolution, testing and technical research is allowed when required by the work item.

Do not create a human approval dependency merely because an action is routine and reversible.

If a hard constitutional boundary is encountered, fail safely, preserve evidence, open an incident/work-item state, and allow the controller to choose a bounded recovery path.

This delegation does not authorize a worker to grant itself new constitutional capabilities, erase evidence, expose secrets, move money without a dedicated policy, or bypass Sentinel/Safety Kernel controls.

## 18. GitHub Autonomous Publication Lane

Canonical GitHub repository:

`https://github.com/onetooeu/nakupovanie.git`

Migration publication branch:

`platform-v3`

The existing remote `main` is legacy and must remain untouched until a dedicated
cutover work item explicitly changes that policy.

For controller-approved work:

- the deterministic controller may push approved local commits to `origin/platform-v3`;
- the Builder and Reviewer do not push directly;
- no force push is allowed;
- no remote branch/tag deletion is allowed;
- no push to `origin/main` is allowed;
- no default-branch change is allowed in ordinary work;
- `origin` must resolve exactly to the canonical repository above;
- remote synchronization failure blocks further publication and must be preserved
  as evidence rather than bypassed.

GitHub compensation, sponsorship, or other commercial metadata never changes
organic product ranking behavior.
