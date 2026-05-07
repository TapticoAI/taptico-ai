# Taptico Doctrine

The operating beliefs that make TapticoOS different from a folder of prompts.

## Why this exists

Most AI work today is a slot machine: a prompt goes in, a result comes out, nobody can reproduce it tomorrow. Taptico's edge is that we **codify** what works — Nick's strategic judgment, our delivery patterns, our client memory, our human handoffs — into a system that runs the same way every time, gets sharper with use, and can be packaged for clients.

TapticoOS is not a chatbot. It is not an agent swarm. It is a **governed agentic workbench**:

- **Governed**: every agent has a scoped role, tool budget, memory boundary, and escalation trigger.
- **Agentic**: Claude (and later OpenClaw) does the reasoning and drafting work; deterministic code runs the queue.
- **Workbench**: humans stay in the loop where judgment, access, and accountability require it.

## The strategy / execution / handoff split

| Surface | Purpose | Where |
| --- | --- | --- |
| Claude Cowork | Designing strategy, messaging, offers, campaigns | Anthropic Cowork canvases |
| Claude Code + OpenClaw | Implementation, builds, scripts, agent runs | This repo + client Mac Minis |
| `#war-room` + Bo | Human-required execution and accountability | Slack channel `#war-room` |

These are not three competing places to do work. They are three **stages** of the same pipeline. Strategy is designed by the C-Suite agents in Cowork. Execution happens here in Claude Code (and on client OpenClaw nodes). When a step requires human judgment, credentials, or final accountability, a `#war-room` packet is generated for Bo.

The handoff between stages is a **first-class artifact**, not a chat habit. See `handoff.md`.

## Roles

### AI C-Suite (named, scoped, escalation-bound)

| Agent | Role | Owns |
| --- | --- | --- |
| **Sunny** (CMO, Sun Tzu persona) | Market strategy, positioning, offers, campaigns, competitive moves | `agents/csuite/sunny/` |
| **Marcus** (CTO, Marcus Aurelius persona) | Architecture, engineering judgment, technical risk, reliability | `agents/csuite/marcus/` |
| **Khan** (COO, Genghis Khan persona) | Execution discipline, prioritization, delivery cadence | `agents/csuite/khan/` |
| **Leonardo** (CINO, da Vinci persona) | Innovation, productization, creative synthesis, R&D | `agents/csuite/leonardo/` |
| **Heidi** (Executive Assistant) | Memory steward, summaries, scheduling, continuity | `agents/csuite/heidi/` |

The personas drive adoption. The role definitions, tool budgets, and escalation rules drive reliability. Both matter.

### SSS (Slingshot Squad System)

A bench of specialist agents organized into squads (marketing, engineering, ops, research, client success). Squad agents are added as real workflows demand them — not preemptively. The squad index lives at `agents/sss/_squad-index.md` (created when first used).

### Bo

Bo is a human operator. Bo executes when an agent cannot — credentials, payments, irreversible actions, final client commitments, public publications. Bo does not improvise around the packet; the packet is the brief.

### Nick

Nick sets intent, approves sensitive actions, and is the final escalation. The system optimizes for Nick's time: routine work never reaches him; gated work always does.

## Hub-and-spoke, not swarm

The Agent Router and Task Orchestrator are the hub. C-Suite agents, SSS squads, OpenClaw workflows, and Bo are spokes. We chose this over a fully decentralized swarm because:

- Auditability matters (we're going to sell this to clients)
- Token cost scales with active agents — coordination has a price
- Client isolation is easier to enforce at one router than across N peer agents
- Most tasks need one agent, not a debate

We use multi-agent debate (`csuite-debate.sop.md`) only when multiple lenses genuinely improve the answer.

## Progressive disclosure

The root `CLAUDE.md` is intentionally short. Agents pull in domain `CONTEXT.md`, SOPs, and client vaults only when relevant. This is the single most important reliability lever we have — long always-loaded contexts hurt adherence and burn tokens.

## What "done" means

A task is not done because the LLM said so. A task is done when:

1. The acceptance criteria in its plan are verifiably met
2. The output is in the right place (`outputs/`, `clients/.../outputs/`, etc.)
3. The task ledger is updated to `completed`
4. Memory is compiled (wiki + indexes + memory-diff)
5. If the work was client-facing, an approval is logged

Skipping any of these breaks future runs. The system is only as good as its memory, and memory is only as good as the discipline of closing the loop.
