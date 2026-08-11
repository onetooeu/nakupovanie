# ADR 0007: GitHub Autonomy and Legacy Main Preservation

Status: **ACCEPTED**
Date: **2026-08-11**

## Context

The selected canonical GitHub repository is `onetooeu/nakupovanie`.

That repository already contains a legacy implementation and an established
`main` history. The new AI-native Nakupovanie platform has an independent local
history.

Blindly pushing the new local `main` to remote `main` would require replacing or
combining unrelated histories and would create unnecessary migration risk.

## Decision

The GitHub repository remains canonical, but migration is staged.

Remote roles:

- `origin/main` — legacy branch; read/fetch only during the platform-v3 build.
- `origin/platform-v3` — autonomous development publication branch for the new platform.

The controller may automatically push approved local commits to
`origin/platform-v3`.

The controller must not:

- force-push;
- delete remote refs;
- push the new platform to `origin/main`;
- change the GitHub default branch;
- rewrite legacy remote history;
- create another origin URL.

A future explicit cutover work item may promote the new platform after its own
migration, CI, recovery, deployment and rollback gates.

## Consequences

The old implementation remains recoverable and inspectable while the new
platform gains continuous GitHub backup/collaboration.

The local branch may remain named `main` while tracking/publishing to the remote
`platform-v3` lane.

This asymmetry is intentional during migration.
