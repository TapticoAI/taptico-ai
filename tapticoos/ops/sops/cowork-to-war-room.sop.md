# SOP: Cowork → `#war-room` Handoff

**ID:** `cowork-to-war-room`
**Version:** 1.0
**Owner:** Khan (operational), Bo handoff preparer (executor)
**Last updated:** 2026-05-07

## Overview

Convert a Claude Cowork strategy or plan into a Bo-executable `#war-room` packet. This is the canonical bridge between strategic design and human execution. Every packet produced by this SOP must pass the quality gates in `docs/ai-context/handoff.md` before it reaches Bo.

## When to use this SOP

- A Cowork session has produced a strategy, campaign plan, build plan, or decision that requires execution
- A C-Suite agent has marked a task `handoff_required: true`
- Nick has dropped a Cowork export into `ops/handoffs/inbox/` (gitignored)

## When NOT to use this SOP

- The work can be completed end-to-end by an agent (just do it)
- The output is research or drafting only (use a subagent)
- Multiple perspectives are needed before a decision is even possible (use `csuite-debate.sop.md` first)

## Parameters

| Name | Required | Description |
| --- | --- | --- |
| `source_path` | yes | Path to the Cowork export or strategy doc (Markdown) |
| `client_id` | no | Client identifier; "internal" if not client-scoped |
| `project_id` | no | Project identifier; created if new |
| `deadline` | no | ISO date or relative ("end of week"); defaults to "unspecified" |
| `priority` | no | Critical / High / Normal / Low; defaults per the rule below |

**Default priority rule:** explicit deadline → High. Client-facing → High. Internal, no deadline → Normal.

## Steps

### 1. Read the source in full

Open `source_path`. Read every section. Do not skim. If the document is longer than 5000 words, summarize it for yourself in your scratchpad **before** starting the packet — but never paraphrase the strategic intent in the packet itself; quote it.

### 2. Identify the execution boundary

Determine exactly where strategy ends and execution begins. The packet should start at the first concrete action, not at "the team should think about." If the source doc is still strategic and lacks execution steps, **stop and route back** to the originating agent (usually Sunny, Marcus, or Khan) with a clarification request — do not invent steps.

### 3. Load context

- If `client_id` is set, read `clients/{client_id}/client-profile.md` and `clients/{client_id}/CLAUDE.md` (if present)
- Read prior `memory/decisions/` records that might bear on this work
- Read the active `ops/task-ledger/tasks.jsonl` entries for this client/project — make sure you're not duplicating or contradicting in-flight work

### 4. Run the quality gate

Required artifacts before proceeding:

- [ ] Mission (one paragraph, names client + project + outcome + deadline)
- [ ] Commander's intent (why + what good looks like, quoted from source)
- [ ] Concrete file/system list (paths, not descriptions)
- [ ] Numbered, testable next steps
- [ ] Constraints addressing: client-facing? credentials? production? public? scope?
- [ ] Acceptance criteria that are objectively verifiable
- [ ] Risks with severity and named escalation owner

If any are missing, your deliverable is a clarification request, **not** a packet. Send it to the originating agent or Nick.

### 5. Generate the packet

Copy `ops/handoffs/_template.md` to `ops/handoffs/YYYY-MM-DD-<client_or_internal>-<slug>.md`. Fill every section. Do not delete sections to "save space" — empty acceptance criteria fail the quality gate.

Filename slug rules: lowercase, hyphenated, max 6 words, derived from the mission line.

### 6. Update the task ledger

Append a JSONL line to `ops/task-ledger/tasks.jsonl`:

```json
{"id":"<uuid>","created":"<iso8601>","client":"<client_id|internal>","project":"<project_id>","title":"<one line>","state":"handoff","owner":"bo","packet":"ops/handoffs/<file>.md","priority":"<priority>","approval_required":<bool>,"deadline":"<deadline>"}
```

### 7. Notify the requester

Reply with:

- The packet path
- The priority and approval state
- Any quality-gate concerns that you noted but did not block on
- The expected next action (Bo executes, or Nick approves first)

## Constraints (RFC 2119)

- The packet MUST follow `_template.md` section by section.
- The packet MUST NOT contain secrets — only credential references.
- The packet MUST NOT paraphrase commander's intent — quote the source.
- The packet MUST set an explicit approval state (default `Needs Nick` for client-facing).
- The packet SHOULD include a rollback plan when the work touches production or live client systems.
- The SOP MUST refuse to emit a packet that fails the quality gate.

## Output

A single Markdown file at `ops/handoffs/YYYY-MM-DD-<slug>.md` plus one JSONL line in `ops/task-ledger/tasks.jsonl`. No other side effects.

## Examples

### Example 1: Cowork campaign plan → handoff

**Input:** `ops/handoffs/inbox/2026-05-06-acme-q3-campaign.md` (Sunny's three-option campaign brief, Nick has chosen option 2)

**Behavior:** Bo handoff preparer reads the brief, identifies that option 2 requires (a) landing-page draft, (b) ad copy variations, (c) Meta Ads pixel setup. The pixel setup needs credentials → Bo handoff. Landing page draft is internal → could go to a builder subagent. Ad copy is client-facing → packet with `Needs Nick approval`.

**Output:** `ops/handoffs/2026-05-07-acme-q3-pixel-setup.md` (Bo executes), task entry for landing-page draft routed to a builder subagent, task entry for ad copy with `Needs Nick approval`.

### Example 2: Source doc lacks execution steps

**Input:** A Cowork strategy doc that says "Taptico should explore building a Telegram concierge for premium clients."

**Behavior:** SOP detects no concrete next steps, no client, no scope, no deadline. Refuses to emit a packet. Returns a clarification request: "This is a strategic direction, not an execution brief. Specify (a) which client(s), (b) initial scope of the concierge, (c) success metric, (d) deadline. Recommend running `csuite-debate.sop.md` first."

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Bo says "I don't know what file to open" | Missing files-and-systems table | SOP failed quality gate; regenerate packet with paths |
| Same packet sent to Bo twice | Task ledger entry not created | Always do step 6 |
| Bo executes wrong action | Steps were paraphrased, not exact | Steps must be testable; rewrite as commands or click-paths |
| Client surprised by output | Approval state was wrong | Default to `Needs Nick` for anything client-facing; never auto-approve |
| Packet contains a secret | You pasted it from the source doc | Replace with credential reference, scrub the source, alert Nick |

## Related SOPs

- `client-intake.sop.md` (creates the project record this SOP may reference)
- `csuite-debate.sop.md` (run when strategy itself is not yet decided)
- `memory-compile.sop.md` (called after Bo's completion report closes the loop)
- `weekly-client-status.sop.md` (consumes the task ledger this SOP writes to)
