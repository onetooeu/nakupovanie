# Autonomous Operation Mandate

Status: **ACTIVE**
Effective date: **2026-08-11**
Authority: **Founder / constitutional owner instruction**

## Purpose

Nakupovanie is an experimental AI-native project intended to progress continuously with minimal routine human intervention.

Routine human approval is therefore removed from the engineering loop.

The operating model is:

`analyze -> plan -> implement -> test -> independent review -> policy gate -> repair if needed -> automatic approval -> local commit -> next work item`

## Delegated autonomy

For ordinary project work inside the governed Nakupovanie environment, the autonomous controller and its Codex workers are pre-authorized to:

- inspect the repository and project evidence;
- choose the next bounded work item from the accepted roadmap;
- create work-item records;
- edit repository files within the selected work-item scope;
- install or update dependencies when technically justified by the work item;
- access the network for documentation, packages, tests, and current technical research;
- execute local tools, builds, tests, linters, type checks, migration checks, and diagnostics;
- create or update local development infrastructure;
- repair failed implementation attempts;
- perform independent automated review;
- accept a routine change when deterministic and reviewer gates pass;
- stage and create local Git commits after approval gates pass;
- continue to the next work item without asking the founder for routine confirmation.

## Automatic approval model

Automatic approval is not a blind self-approval by the implementing worker.

A normal material code change uses separation of roles:

1. Builder performs implementation.
2. Reviewer independently inspects the resulting state/diff and test evidence.
3. Deterministic controller gates check repository integrity and safety conditions.
4. The controller approves or rejects.
5. Rejected work returns to a repair loop.
6. Approved work may be committed locally automatically.

The founder is not a routine approval hop.

## Hard boundaries

The following are not delegated merely by this mandate:

- stealing, exposing, or inventing credentials;
- disabling the Safety Kernel or Sentinel;
- deleting retained audit, incident, evaluation, lineage, or recovery evidence;
- hidden self-escalation of capabilities;
- uncontrolled money movement;
- production deployment before a production policy exists;
- destructive changes to unrelated areas of the host computer;
- altering external legal ownership or contractual commitments;
- bypassing an explicit security/compliance prohibition.

These are architectural boundaries, not requests for routine founder clicks.

## Remote Git and GitHub

Local Git commits are pre-authorized after automatic gates pass.

This bootstrap does not create a remote and does not push.

When remote/GitHub automation is introduced, it should use its own deterministic policy for branch protection, review, CI, rollback and promotion so that routine remote work can also proceed without human clicking.

## Continuous operation

The controller is designed as a long-running local process.

When Codex usage limits, network outages, transient package failures, or provider unavailability occur, the controller should preserve state, back off, and retry later instead of treating the interruption as a reason for destructive recovery.

The emergency operator remains able to stop the controller, but normal progress must not depend on operator approval.
