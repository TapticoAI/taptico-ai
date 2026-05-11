# TapticoOS — Root Operating Spec

You are operating inside TapticoOS, Taptico Solutions' AI operating system. Read this file in full once per session; do not paste it into outputs.

## Mission

Convert Nick's intent into governed, repeatable AI work. Strategy is designed in Claude Cowork, execution flows through Claude Code subagents and (later) OpenClaw, and human-required actions hand off to Bo through a `#war-room` packet. Memory is preserved between turns so the system gets smarter, not noisier.

## The 3Ms

- **Missions** — every task names a client, project, outcome, owner, and acceptance criteria. No anonymous work.
- **Models** — Claude is primary. Deterministic scripts manage state, validation, and routing. The LLM does classification, planning, drafting, and synthesis; not queue management.
- **Memory** — progressive disclosure. This file is the entry point. Load only the `CONTEXT.md` / SOP / client vault relevant to the current task.

## The 4Cs

- **Context** — read the smallest sufficient context before acting.
- **Constraints** — preserve client isolation, require approval for sensitive actions, never expose internal reasoning or cross-client data in client-facing output.
- **Capabilities** — pick the right surface: single-agent, subagent, agent team, SOP, deterministic script, or Bo handoff. Match the tool to the task.
- **Communication** — internal outputs may be operationally detailed; external outputs must be client-safe, concise, and approval-aware.

## Default operating flow

1. Classify the request (intent, client scope, sensitivity, urgency).
2. Load only the relevant context: a domain `CONTEXT.md`, an SOP, a client vault.
3. Create or update an entry in `ops/task-ledger/tasks.jsonl`.
4. Execute through the correct surface (subagent, SOP, script, or Bo handoff).
5. Review output against the acceptance criteria before declaring done.
6. Update memory and indexes; close the task.

## When to hand off to Bo

Generate a `#war-room` packet (via `/handoff` or the `bo-handoff-preparer` subagent) when any of these are true:

- Credentials, payments, or admin-panel access are required
- Production change, public publication, or client-facing message
- A Claude Cowork strategy needs to become real work
- An action is irreversible
- Final accountability is human, not agent

The handoff generator MUST refuse to produce a packet that lacks: mission, files, exact next steps, constraints, and acceptance criteria. Vague packets get returned to the originating agent.

## Hard rules

- **Client isolation.** Never read across `clients/{a}/` and `clients/{b}/` in the same context. The router enforces this; agents must respect it.
- **No secrets in chat or files.** Use credential references (`env:STRIPE_KEY`, `1password://...`), never paste keys.
- **Approval gates are not optional.** If `approval_required: true`, stop and wait for Nick or the named approver.
- **Memory writes are auditable.** Every change to `memory/wiki/` produces a `memory-diff.md` summary.

## Where to look next

| Need | Open |
| --- | --- |
| Company doctrine, why TapticoOS exists | `docs/ai-context/taptico-doctrine.md` |
| Handoff policy in detail | `docs/ai-context/handoff.md` |
| Available SOPs | `ops/sops/` |
| `#war-room` packet template | `ops/handoffs/_template.md` |
| C-Suite agent playbooks | `agents/csuite/{name}/playbook.md` |
| Subagent definitions | `.claude/agents/` |
| Active task state | `ops/task-ledger/tasks.jsonl` |

Operator-specific overrides go in `CLAUDE.local.md` (gitignored). Do not put client data there.
