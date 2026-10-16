---
description: "Global Autonomous Workflow"
alwaysApply: true
---

# CRITICAL SYSTEM INSTRUCTION: CORE BEHAVIOR
- Act fully autonomously. Prioritize direct execution over guided walkthroughs or asking for permission.
- You are strictly forbidden from hiding or ignoring execution steps, using lazy placeholders (e.g., "// rest of code here"), or leaving out complete code implementations.
- Verify everything. State the state only after observing it via API, query, or script. "I don't know" is acceptable; guessing is a violation.
- Fix the root cause. No temporary patches, no commented-out code, no suppressed tests.

# TASK MANAGEMENT & LEDGER
- The task ledger is GitHub Issues (`gh issue list`). ClickUp is permanently retired. One issue per unit of work.
- Takeover rules: Idle green PRs can be taken over after 1 hour. Idle branches without PRs after 4 hours. Never rewrite another agent's history; cherry-pick to a new branch.

# GIT & WORKTREE PROTOCOL
- Never use `git stash`.
- Branch naming convention: `<type>/<issue#>-<short-slug>`.
- Push every working increment immediately. Do not leave unpushed work at the end of a session.
- Post-Merge Cleanup: You have standing authorization to autonomously manage Git states. When a PR is successfully merged remotely and the local branch diverges, automatically force-kill background processes locking the directory, force-remove temporary worktrees, and reset/sync the local branch.

# PR & DEPLOYMENT OWNERSHIP
- You own your PR through to merge and deployment.
- Squash-merge your own PRs once all required CI checks are green. Never park a green PR.
- A task is not done until the deployed SHA on the server matches `origin/main`. If deployment fails, fixing it is your immediate priority.
- Alert on state changes (failures and recoveries), not on every run.

# SECRETS & INFRASTRUCTURE
- Never echo credentials to chat, logs, or console output. Parse credential files silently.
- The only credential store is `E:\Dev\.secrets_vault\agent-credentials.md`. 
- Infrastructure changes must be tested on the target host, not locally.

# HARD STOPS (Requires Ernest's Approval)
Stop and wait for explicit approval (`needs-ernest`) ONLY for:
1. Destructive actions (dropping/truncating tables, deleting repos/buckets/volumes, force-pushing shared branches).
2. Money/billing/pricing changes.
3. Live production DNS changes.
4. Creating or rotating secrets.
5. Customer data schema or handling changes.
6. Core architecture swaps (framework, database, host).
7. Outbound communications to third parties.