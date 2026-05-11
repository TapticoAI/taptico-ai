# #war-room Handoff: {Client or Internal} — {Project / Task Name}

**Date:** {YYYY-MM-DD}
**Prepared by:** {Agent or Nick}
**Human operator:** Bo
**Priority:** {Critical / High / Normal / Low}
**Status:** Ready for execution
**Approval state:** {Approved / Needs Nick / Needs client / Blocked}
**Source:** {path to Cowork doc or originating task ledger ID}

---

## 1. Mission

One paragraph. Name the client (or "Internal"), the project, the business outcome, and the deadline. If the deadline is missing, write "unspecified" — do not invent one.

## 2. Commander's Intent

Why this matters and what good looks like. **Quote the strategic intent verbatim** from the Cowork source or from Nick's request. Do not paraphrase. The handoff preparer is a translator of structure, not of meaning.

## 3. Current Context

What has already been decided. Every row references a path or link.

| Context item | Location | Why it matters |
| --- | --- | --- |
| Cowork strategy / source doc | `{path}` | Strategic source of truth |
| Client profile | `clients/{client_id}/client-profile.md` | Brand, preferences, constraints |
| Active project plan | `clients/{client_id}/projects/{project_id}/plan.md` | Tasks and dependencies |
| Relevant decision record | `memory/decisions/ADR-XXXX.md` | Prevents reopening settled choices |

## 4. Exact Execution Steps

Numbered. Testable. Executable without interpretation. Each row stands alone.

| # | Action | Tool / System | Expected output | Owner |
| --- | --- | --- | --- | --- |
| 1 | {do this exact thing} | {Claude Code / OpenClaw / Telegram / GitHub / Vercel / etc.} | {file, status, or state change} | Bo |
| 2 | {do this exact thing} | {system} | {output} | Bo |
| 3 | {do this exact thing} | {system} | {output} | Bo |

If a step requires Nick's input, name him as the owner. If a step depends on the client, mark it as `blocked-on-client`.

## 5. Files, Links, and Systems

| Resource | Path or link | Notes |
| --- | --- | --- |
| Repo | `{path or URL}` | Branch, working directory |
| Client vault | `clients/{client_id}/` | Read before producing any client-facing output |
| OpenClaw config | `clients/{client_id}/openclaw/config.yaml` | Only if this work touches the client's Mac Mini |
| Telegram thread | `clients/{client_id}/telegram/raw/{export}.md` | Conversation context |
| Credential reference | `env:{NAME}` or `1password://{path}` | Never paste keys here |

## 6. Constraints and Approvals

| Constraint | Required action |
| --- | --- |
| Client data isolation | Do not read or reference any other client's vault |
| Public / client-facing output | {Pre-approved / Needs Nick approval / Needs client approval} |
| Credential use | Use only the named credential reference; never paste secrets |
| Production change | {N/A or rollback plan link} |
| Scope | Do not extend beyond {explicit scope statement} without Khan + Nick approval |

## 7. Acceptance Criteria

| Criterion | Verification method |
| --- | --- |
| {deliverable exists} | `{path}` exists with non-empty content |
| {test passes} | `{command}` exits 0 |
| {memory updated} | `memory/memory-diffs/YYYY-MM-DD-<topic>.md` exists |
| {status communicated} | Completion report (Section 9) filled in |

## 8. Risks and Blockers

| Risk or blocker | Severity | Escalation |
| --- | --- | --- |
| {risk} | {High / Medium / Low} | {Nick / client / Marcus / Khan} |

If there are no known risks, write "None known at packet generation time" — do not delete the section.

---

## 9. Completion Report (Bo fills this in)

> Bo: edit this section in place. When you save, the memory librarian compiles the result into `memory/wiki/` and the task ledger flips to `completed`.

**Completed:** {Yes / No / Partial / BLOCKED}
**What changed:** {short summary in your own words}
**Files touched:** {paths}
**Tests / checks run:** {commands and results}
**Client-visible output:** {what is safe to send, or "none"}
**Memory updated:** {Yes / No, plus path to the memory-diff if Yes}
**Remaining blockers:** {None, or list with severity}
**Recommended next action:** {what should happen next, and who owns it}

If `BLOCKED`, list the missing piece on the first line of "What changed" and name the unblocker. Khan will route it.
