#!/bin/bash
set -euo pipefail
task_dir=$(mktemp -d)
trap 'rm -rf "$task_dir"' EXIT
cat > "$task_dir/prompt.txt"
if [ "$SOBAYA_ROLE" = implement ]; then
cat >> "$task_dir/prompt.txt" <<'CONTEXT'
Implement approved spec.md and current exact test entry; read collab/active/codex--brand-feedback/copy-audit.md and complete approved scope. Source only: do not edit tests, fixtures, proposals, spec/failed-test, AGENTS, packages/locks, harness or Git metadata. No commits/publish. Existing other118 tests and all approved exact bodies are immutable.
Feature: location error direct retry using existing locate ref without reload, duplicate pending lock, native permission guidance; preserve initial geolocation/StrictMode/return viewport/SDK loaded marker and stale callback guards. Remove entire map source/overview control row and dead fitArticles handler/types; no automatic fit/zoom. Put KMA catalog attribution in /about while preserving representative-coordinate caveat and map selection.
Create a small shared notice presentation under components/feedback using existing Tailwind brand tokens, restrained decorative SVG, readable title/help/action,44px tap targets. Apply all specified map/search/list/detail/archive/recent-search/report/error/404 states and copy-audit; no new architecture or dependencies. Preserve explicit status/error phrases and exact report uncertainty/success semantics; don't hide legacy text merely to satisfy tests. Keep skeleton/spinner accessibility, reset/retry links, search offsets/cards, report files/keys/receipt and navigation. Remove stale developer-preparation/data-unconnected text on public404. No extra animations or new fetches.
Run focused map tests, source ESLint (including padding-line-between-statements), format and tsc. Worker sandbox cannot bind sockets for full suite/Next build: do not run full integration suite or build here. Parent runner executes unchanged full suite/hygiene; coordinator runs default build and actual production-browser UI QA. Return done when source and focused checks coherent, reporting remaining coordinator verification accurately.

CONTEXT
fi
if [ "$SOBAYA_ROLE" = review ]; then
cat >> "$task_dir/prompt.txt" <<'REVIEW'
Fresh independent READ-ONLY review of approved spec/copy-audit, full source diff against approval baseline and origin/dev. Check native permission retry doesn't reload/create duplicate requests or touch disposed SDK; initial geolocation/return viewport/SDK loaded state preserved; both source/overview UI removed in all data states with no auto-fit, source moved to /about and precision caveat intact. Verify all specified status surfaces branded/readable/actionable at320/393px, all role/aria/live/focus and pending actions correct, no duplicate/nested alerts or contradictory messages, no developer preparation claims or unsupported safety/receipt promises. Existing118 tests and approved4case bodies immutable, no new deps/harness/API contracts. Check SSR/client component boundaries, error reset/navigation, search pagination and report receipt/uncertainty/files/keys unaffected. Do not write, run builds/tests, commit or publish. done only if no actionable findings; defects must name file/line.

REVIEW
fi
sandbox=workspace-write
[ "$SOBAYA_ROLE" != review ] || sandbox=read-only
codex exec --cd "$SOBAYA_APP" --model "$SOBAYA_MODEL" --sandbox "$sandbox" -c 'approval_policy="never"' --json --output-schema "$SOBAYA_APP/../sobaya/tdd-set/worker-result.schema.json" --output-last-message "$task_dir/result.json" - < "$task_dir/prompt.txt" > "$task_dir/events.jsonl"
cat "$task_dir/events.jsonl"
if jq -e -s 'any(.[]; .type=="turn.failed")' "$task_dir/events.jsonl" >/dev/null; then exit 1; fi
jq -c --slurpfile events "$task_dir/events.jsonl" '. + {usage: ([$events[] | select(.type=="turn.completed") | .usage][-1] // {})}' "$task_dir/result.json"
