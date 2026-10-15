#!/bin/bash
set -eu
: "${SOBAYA_APP:?}" "${SOBAYA_MODEL:?}" "${SOBAYA_ROLE:?}"
task_dir=$(mktemp -d)
trap 'rm -rf "$task_dir"' EXIT
cat > "$task_dir/prompt.txt"
cat >> "$task_dir/prompt.txt" <<'CONTEXT'
The human approved ALL PR23 followups. Read spec.md and failed-test.md and the current entry. Implement only map display collision clusters, source/action vertical alignment and case-insensitive search highlighting preserving original text. The older archived spec / earlier 'never zoom cluster' rule is superseded: preserve logical regions but combine overlapping display circles using actual Naver map projection and original deterministic representative point. Multi-region cluster minimum48px. Recompute on zoom/idle/resize/period; preserve marker DOM/selection on unchanged idle and camera/SDK lifetime. Handle transitive overlap and larger merged radius; dispose callbacks safely. Existing fixed-coordinate test replacement was explicitly approved and committed. Other108 existing tests and ALL exact new tests/plans/helpers/fixtures are immutable. Source scope: src/features/map and src/features/search/ui/search-result-card only. No dependencies/runtime/harness/API/report/other UI changes, no commits/push/comments/PR mutations. Avoid making MapHome a larger monolith; use small cohesive display grouping module. Use React escaped original matching substrings for highlight, literal safe case-insensitive matching. Fix alignment of source link and action to within1px at320/393px. Coordinator owns browser QA. Return accurate checks.
CONTEXT
if [ "$SOBAYA_ROLE" = review ]; then
cat >> "$task_dir/prompt.txt" <<'REVIEW'
Fresh independent read-only review: inspect exact diff from approved baseline and previous product HEAD89a013f, check correctness, lifecycle, deterministic geometric grouping, unique count, coordinates, keyboard/selection/focus, resize/period changes, stale callbacks and native SDK/API/camera preservation. Check highlighted text preserves original case and treats regex metacharacters literally for title and description, existing articleText safety preserved. Check original108 tests byte-identical and only approved one replacement. Do not edit/run write-producing builds/tests/commit/publish. Gate and browser checks are coordinator-owned. Report actionable defects with exact file/line evidence; return done only if none remain.
REVIEW
fi
sandbox=workspace-write
[ "$SOBAYA_ROLE" != review ] || sandbox=read-only
codex exec --cd "$SOBAYA_APP" --model "$SOBAYA_MODEL" --sandbox "$sandbox" -c 'approval_policy="never"' --json --output-schema "$SOBAYA_APP/../sobaya/tdd-set/worker-result.schema.json" --output-last-message "$task_dir/result.json" - < "$task_dir/prompt.txt" > "$task_dir/events.jsonl"
cat "$task_dir/events.jsonl"
if jq -e -s 'any(.[]; .type=="turn.failed" or .type=="error")' "$task_dir/events.jsonl" >/dev/null; then exit 1; fi
jq -c --slurpfile events "$task_dir/events.jsonl" '. + {usage: ([$events[] | select(.type=="turn.completed") | .usage][-1] // {})}' "$task_dir/result.json"
