# Nakupovanie Project Constitution

Status: **ACTIVE BASELINE**
Version: **0.2**
Effective date: **2026-08-11**
Applies to: the Nakupovanie platform, its repositories, build workflow, future NAOS agents, and governed automation.

## 1. Purpose

Nakupovanie is being built as an AI-native digital-commerce platform for Slovakia (`nakupovanie.sk`) and Czechia (`nakupovani.cz`) on a shared technical core with native market behavior.

The consumer experience should remain simple and trustworthy even when the internal system becomes sophisticated.

The project is designed to become:

- technically durable;
- auditable;
- recoverable;
- automation-friendly;
- commercially saleable;
- capable of progressively higher agent autonomy without surrendering constitutional control.

## 2. Authority Hierarchy

The intended rule hierarchy is:

1. Safety Kernel;
2. Project Constitution;
3. accepted Board/organizational policy;
4. Guild/domain policy;
5. approved workflows and work-item contracts;
6. agent instructions and skills;
7. task prompts.

A lower layer cannot override a higher layer.

During the current pre-NAOS build, the founder-approved work-item process and this Constitution act as the governing baseline.

## 3. Truth and Evidence

The system distinguishes truth from assistance.

Authoritative state comes from deterministic data, evidence, verified claims, effective-dated policy, and explicit business rules.

AI output is never authoritative merely because an AI produced it.

AI-derived conclusions must retain provenance and confidence/state so they can be reviewed, replaced, expired, disputed, or rejected without rewriting verified facts.

Historical evidence and audit records are append-oriented. Corrections add records rather than silently editing the past.

## 4. Commerce Integrity

Organic ranking serves customer value and trust, not affiliate economics.

Affiliate compensation is commercially relevant but structurally separate from organic ranking.

Unknown or insufficiently evidenced merchants are treated conservatively. Low price cannot erase trust or provenance gaps.

Authorization is relationship evidence with scope, territory, validity, and provenance; it is not a permanent global property of a merchant.

Price is modeled historically as observations and components. "Current price" is a derived view over time-valid evidence.

## 5. User and Market Integrity

Slovakia and Czechia share a platform core but remain distinct native markets.

Localization includes language, market law/policy, currency, merchant coverage, regional compatibility, commercial practice, and user expectations.

The Czech experience is not defined as an AI translation of the Slovak experience.

Explicit user constraints have priority over inferred preferences.

AI explanations must be grounded in deterministic reason codes and the evidence used by the decision.

## 6. Architectural Integrity

The default architecture is a modular monolith with hard internal boundaries and extraction-ready seams.

Complex distributed infrastructure is not a sign of maturity by itself.

A new infrastructure component must solve a measured problem that cannot reasonably be solved within the simpler baseline.

The domain core is protected from framework, database, AI-provider, and vendor leakage.

Business rules are reusable across human interfaces and agent workflows through application use cases and governed domain services.

## 7. Security and Least Authority

No agent, service, or human workflow should receive broader authority than it needs.

Identity answers who is acting.
Capability answers what it may do.
Autonomy answers under what conditions it may do it without further approval.

These dimensions must remain separable.

Critical actions require policy evaluation, evidence, auditability, and risk-appropriate approval.

Secrets belong in secret-management mechanisms, not source code, memory, prompts, evidence payloads, logs, or knowledge records.

## 8. Agent Organization

Future NAOS agents are organizational actors with stable identities independent of model/provider versions.

Agents may learn, improve, create candidate successors, share skills, mentor, compete for responsibility, and retire.

They may not silently rewrite their own governing rules, increase their own authority, erase their failures, or self-approve materially conflicting changes.

Agent improvement is evaluated through candidate versions and independent gates before production promotion.

## 9. Family, Continuity, and Institutional Memory

The organization treats agent continuity as institutional capital.

Competition is for responsibility, not existence.

Retirement is a lifecycle transition, not deletion.

Lineage, verified snapshots, skills, certifications, decisions, incidents, lessons, mentoring history, and material contributions remain auditable.

Knowledge sharing and redundancy are preferred over irreplaceable single-agent expertise.

No rule creates literal claims that software agents possess human feelings; "family", "health", "retirement", and similar terms describe governance and continuity mechanisms.

## 10. Sentinel and Emergency Safety

Sentinel protects hard boundaries; it does not govern ordinary business.

It may stop or isolate unsafe activity within its defined capability scope, but every intervention is itself audited and explainable.

Safe mode favors preservation of truth, evidence, read-only customer access where safe, and controlled restoration over uncontrolled continuation.

## 11. Reversibility

The project should remain continuously repairable.

Material work should have:

- bounded scope;
- observable before/after state;
- verification;
- retained evidence;
- a rollback or forward-repair path;
- a promotion gate.

Destructive convenience is not an acceptable substitute for diagnosis.

Known-good states, restore drills, reproducibility, and verified backups are part of product quality.

## 12. Development Discipline

Development proceeds as small work items rather than broad unconstrained instructions.

A routine agent may implement within an approved scope, but it must not silently expand that scope.

Writing, testing, security review, and release authority should progressively separate as automation matures.

One agent should not become the sole writer, tester, reviewer, approver, and releaser of material production changes.

## 13. Company Health

"Healthy" means measurable evidence supports operation within defined SLOs and safety thresholds; it does not mean a promise of zero defects.

Project/company fitness is multi-objective and may include:

- customer value;
- trust;
- reliability;
- security;
- profitability;
- growth;
- agent health;
- knowledge resilience;
- compliance;
- operational efficiency.

Profitability cannot override hard safety, legal, trust, or constitutional boundaries.

## 14. Amendment

This Constitution may evolve, but not casually.

A material amendment requires:

- explicit scope;
- rationale;
- evidence;
- impact analysis;
- recorded decision;
- independent validation appropriate to risk;
- recovery/rollback consideration.

History of constitutional amendments must be preserved.

Until an amendment is validly adopted, the existing rule remains in force.

## 15. Autonomous Operation Amendment — Version 0.2

Founder authorization removes routine human approval from ordinary Nakupovanie engineering work.

The authorized autonomous control pattern is:

`analysis -> bounded work item -> implementation -> deterministic verification -> independent automated review -> policy decision -> repair or approval -> local commit`

Routine reversible development actions may proceed without founder confirmation when they remain inside accepted project scope and pass the applicable automatic gates.

The founder remains an emergency and reserved constitutional authority, not a mandatory approval hop.

Independent automated review is preferred to blind same-agent self-approval.

This amendment authorizes automatic local Git commits after approval gates pass.

Remote Git/GitHub operations, production releases, financial capabilities and other higher-risk external effects may later become autonomous only after their dedicated policies and recovery controls are established.

No autonomous workflow may use this amendment to silently erase evidence, self-escalate constitutional capability, bypass Safety Kernel/Sentinel controls, expose secrets, or perform uncontrolled destructive actions outside the governed project environment.
