# Handoff Policy

The `#war-room` handoff is the operational bridge between AI strategy and human execution. This document defines when handoffs are mandatory, what a valid packet must contain, and how completion closes the loop.

## When a handoff is mandatory

Any task that hits one or more of these triggers MUST be packaged as a `#war-room` handoff before execution proceeds:

| Trigger | Why |
| --- | --- |
| Credentials, API keys, or admin-panel access | Agents must not handle secrets |
| Payment or billing action | Irreversible financial impact |
| Production change or live deployment | Requires rollback plan + human approval |
| Public publication (post, ad, press, outbound) | Brand and legal exposure |
| Client-facing message that commits Taptico | Final accountability is human |
| Cowork strategy that needs implementation | Strategy → execution boundary |
| Anything irreversible | "Are you sure?" gates only work for humans |

## Quality gates: a packet is invalid without these

The handoff generator (`bo-handoff-preparer` subagent or `/handoff` command) MUST refuse to emit a packet missing any of:

1. **Mission** — one paragraph naming client, project, outcome, deadline
2. **Commander's intent** — why this matters, what good looks like
3. **Files / systems** — paths and links to everything Bo needs to read
4. **Exact next steps** — numbered, testable, executable without interpretation
5. **Constraints + approvals** — client-facing, credentials, production, public, scope changes
6. **Acceptance criteria** — how Bo (and the system) confirms done

If any are missing, the packet is rejected back to the originating agent for clarification. **Vague handoffs are worse than no handoff** — they consume Bo's time and produce work nobody asked for.

## The packet format

The canonical template lives at `ops/handoffs/_template.md`. Every generated packet is named `ops/handoffs/YYYY-MM-DD-<client>-<slug>.md` and follows that template exactly.

## Completion report

Bo closes the loop by editing the **bottom** of the same packet file (Section 9 of the template). The completion report MUST include:

- What changed (short summary)
- Files touched (paths)
- Tests / checks run (commands)
- Client-visible output (what can be sent)
- Memory updated (yes/no + path)
- Remaining blockers
- Recommended next action

When Bo saves the completion report, the `memory-librarian` subagent (next slice) compiles the result into `memory/wiki/` and updates `ops/task-ledger/tasks.jsonl` to `completed`.

## What happens if Bo gets stuck

Bo replies with `BLOCKED:` at the top of the completion report and lists the missing piece. The orchestrator moves the task to `blocked` state and routes the unblock to whoever can resolve it (Nick for authority, Marcus for technical, the client for input). Bo doesn't sit on a blocker — surface it fast.

## What handoffs are NOT for

- Routine internal work an agent can finish (just do it)
- Research or drafting (use a subagent)
- Multi-perspective review (use a `csuite-debate` SOP)
- "Asking Nick what he thinks" (use a direct question, not a packet)

Handoffs are expensive — they require Bo's time and serialize execution. Reserve them for genuine human-required work.
