# TapticoOS

The operating system for how Taptico Solutions designs, routes, executes, remembers, and hands off AI work. Internal first, productized for clients second.

## Status: v0.1 — thin vertical slice

This directory is the seed of TapticoOS. It currently implements one end-to-end loop:

> **Cowork strategy → `#war-room` handoff packet → Bo executes → completion report → memory updated**

Everything else in Heidi's plan (Telegram intake, OpenClaw bridge, dashboard, graph memory, multi-tenant client packages, the full 73-agent SSS) is deliberately **not** built yet. Ship the loop, then scale.

## Important: this lives in the wrong repo (for now)

TapticoOS is currently nested inside `tapticoai/taptico-ai` (the marketing site repo) because the build agent's GitHub access is scoped to that repo. It is structured to be lifted into its own `taptico-os` repo without changes — no shared imports, its own README, its own `.gitignore`, no dependencies on the surrounding Next.js app.

When the new repo is ready:

```bash
git subtree split --prefix=tapticoos -b tapticoos-export
# then push tapticoos-export to the new repo's main branch
```

## Directory map

```
tapticoos/
├── CLAUDE.md                    # root doctrine — kept short, points to specifics
├── .claude/
│   ├── agents/                  # Claude Code subagents (C-Suite + Bo handoff preparer)
│   └── commands/                # /handoff and other slash commands
├── docs/ai-context/             # doctrine, handoff policy, governance
├── ops/
│   ├── sops/                    # versioned standard operating procedures
│   ├── handoffs/                # generated #war-room packets + template
│   └── task-ledger/             # tasks.jsonl, approvals.jsonl, blockers.jsonl
├── memory/                      # raw → wiki → outputs (added in next slice)
├── clients/                     # per-client vaults (added in next slice)
└── agents/                      # C-Suite playbooks beyond subagent definitions
```

## How to use it today

1. Drop a Claude Cowork strategy export into `ops/handoffs/inbox/` (create it if needed).
2. From Claude Code in this directory, run `/handoff` and follow the SOP.
3. The bo-handoff-preparer subagent generates a packet at `ops/handoffs/YYYY-MM-DD-<slug>.md`.
4. Bo executes, fills in the completion report at the bottom of the same file.
5. Memory librarian (next slice) compiles the result back into wiki + indexes.

## What's intentionally missing from v0.1

- OpenClaw bridge — deferred until the runtime integration phase
- Telegram intake — Phase 4
- Graph memory + MemoryMesh schemas — Phase 2
- Dashboard — Phase 6
- Client deployment template — Phase 7
- The full 73-agent SSS — agents are added when a real workflow needs them, not preemptively
