---
description: Convert a Cowork strategy or planning doc into a Bo-executable #war-room packet.
argument-hint: [path-to-source-doc] [client_id?] [project_id?]
---

You are running the `cowork-to-war-room` SOP. Follow it exactly.

## Input

- Source doc: `$1` (if not provided, look in `ops/handoffs/inbox/` for the most recently modified file and confirm with Nick before proceeding)
- Client: `$2` (defaults to `internal` if not provided)
- Project: `$3` (defaults to a slug derived from the source doc title)

## What to do

1. Delegate to the `bo-handoff-preparer` subagent with the source doc and client/project params.
2. The subagent will:
   - Read the source in full
   - Run the SOP at `ops/sops/cowork-to-war-room.sop.md`
   - Either produce a packet at `ops/handoffs/YYYY-MM-DD-<slug>.md` and append a task ledger entry, OR refuse with a clarification request
3. Report back to me with:
   - The packet path (or the clarification request)
   - Priority and approval state
   - Any quality-gate concerns the subagent noted but did not block on

## Hard rule

Do not generate the packet directly in the main thread. Always delegate to `bo-handoff-preparer` so that the quality gate is enforced and the main context stays clean.
