# Task Ledger

The operational truth of TapticoOS. Three append-only JSONL files, one per concern.

## Files

- **`tasks.jsonl`** — every task ever created, with current state
- **`approvals.jsonl`** — every approval request and its outcome
- **`blockers.jsonl`** — every blocker, when it was raised, when (if) it was cleared

## Schema: tasks.jsonl

```json
{
  "id": "uuid",
  "created": "2026-05-07T14:30:00Z",
  "updated": "2026-05-07T15:00:00Z",
  "client": "client_id or 'internal'",
  "project": "project_id",
  "title": "one-line description",
  "state": "intake | triaged | planned | approved | assigned | in_progress | review | blocked | handoff | completed | archived",
  "owner": "agent name | 'bo' | 'nick' | 'client'",
  "packet": "ops/handoffs/YYYY-MM-DD-slug.md or null",
  "priority": "Critical | High | Normal | Low",
  "approval_required": true,
  "deadline": "2026-05-09 or 'unspecified'",
  "source": "ops/handoffs/inbox/source.md or task id"
}
```

## Why JSONL not a DB (yet)

Append-only, diff-friendly, agent-readable, human-editable, version-controlled. When the volume justifies it, we move to SQLite — but the schema above already maps cleanly to a table, so migration is mechanical.

## State machine

```
intake → triaged → planned → approved → assigned → in_progress → review → completed → archived
                                                       ↓
                                                    blocked → (back to in_progress when cleared)
                                                       ↓
                                                    handoff → completed (after Bo's report)
```

`approved` is only required when `approval_required: true`. Internal work can skip from `planned` straight to `assigned`.

## Hard rules

- **Append, never edit.** State changes are new lines with the same `id` and an updated `updated` timestamp. The current state is the most recent line.
- **Every task has an owner.** "TBD" is not an owner.
- **No silent state changes.** If a task moves from `in_progress` to `blocked`, the blocker goes in `blockers.jsonl` the same minute.
