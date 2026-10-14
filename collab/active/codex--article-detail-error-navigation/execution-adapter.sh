#!/bin/bash
set -eu
: "${SOBAYA_APP:?}" "${SOBAYA_MODEL:?}" "${SOBAYA_ROLE:?}"
task_dir=$(mktemp -d)
trap 'rm -rf "$task_dir"' EXIT
cat > "$task_dir/prompt.txt"
cat >> "$task_dir/prompt.txt" <<'CONTEXT'

Read the exact approved spec.md and failed-test.md for the article detail error navigation correction. Source scope is the detail page and a small dedicated navigation component shared by success/error. Preserve existing navigation markup/styles/accessible labels, article APIs, 5-second timeout, 404/invalid IDs, normal content/image/share behavior. Do not restore global chrome to detail screens. No redesign, dependency change, unrelated refactoring, tests/helpers/fixtures/plan/Git metadata edits, or Sobaya runtime changes. The coordinator owns journal, Git push, integration into existing PR19 and full production browser verification. This is not permission to return handoff merely because those steps are coordinator-owned.

Original101 tests are protected. The runtime materializes the exact approved new test and handles RED/GREEN/checkpoint. Focused unchanged detail tests and typecheck/format/lint are useful worker checks. Full suite normally takes around120 seconds and includes local port binding; inner worker sandbox may deny ports but coordinator runtime can verify it. Do not change test commands or downgrade the default Next build to evade an environment failure. Return accurate evidence, not blanket completion.
CONTEXT
if [ "$SOBAYA_ROLE" = review ]; then
cat >> "$task_dir/prompt.txt" <<'REVIEW'

Fresh independent read-only review: inspect approved spec, full source diff, new regression coverage and original-test preservation. Check all detail error variants, deterministic list/home links for direct entry, retry and no duplicate global/dedicated navigation, normal markup/image/share/404 compatibility. Runtime has run the exact full gate at this HEAD. No write-producing tests/build, edit, commit, or publishing. Return done only when no actionable source defect remains, with file/line evidence.
REVIEW
fi
sandbox=workspace-write
[ "$SOBAYA_ROLE" != review ] || sandbox=read-only
codex exec --cd "$SOBAYA_APP" --model "$SOBAYA_MODEL" --sandbox "$sandbox" -c 'approval_policy="never"' --json --output-schema "$SOBAYA_APP/../sobaya/tdd-set/worker-result.schema.json" --output-last-message "$task_dir/result.json" - < "$task_dir/prompt.txt" > "$task_dir/events.jsonl"
cat "$task_dir/events.jsonl"
if jq -e -s 'any(.[]; .type=="turn.failed" or .type=="error")' "$task_dir/events.jsonl" >/dev/null; then exit 1; fi
jq -c --slurpfile events "$task_dir/events.jsonl" '. + {usage: ([$events[] | select(.type=="turn.completed") | .usage][-1] // {})}' "$task_dir/result.json"
