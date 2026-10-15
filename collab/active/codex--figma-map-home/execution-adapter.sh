#!/bin/bash
set -eu
: "${SOBAYA_APP:?}" "${SOBAYA_MODEL:?}" "${SOBAYA_ROLE:?}"
task_dir=$(mktemp -d)
trap 'rm -rf "$task_dir"' EXIT
cat > "$task_dir/prompt.txt"
cat >> "$task_dir/prompt.txt" <<'CONTEXT'

You implement the approved map-home design only. Read spec.md, the current exact approved entry, relevant existing code and collab/active/codex--figma-map-home/figma/18-2348.txt and 45-3317.txt. Coordinator has already received and visually inspected the actual Figma renders for all linked nodes; these files are real high fidelity contexts, not approximations. Use existing local static assets, Tailwind tokens, local fonts, custom SVG logo, SearchHeader and BottomNavigation. Do not use map background or article example images from Figma in place of actual SDK/data. Preserve native Naver SDK/control attribution, viewport lifecycle, geolocation/retry, API and details. Correct visual implementation is required, not just asserting test class names.

Scope: src/features/map/ source and AppShell home-filter ownership, docs needed for exact contracts. No package/lockfile/harness/runtime/approved plan/tests/helpers/fixtures/Git metadata changes, no commits, push, PRs, comments, deployment or production POST. No unrequested changes to search/list/detail/report. New source components belong in coherent named folders with the existing project conventions. Do not make MapHome a larger monolith; small cohesive region model, carousel/card/image and filter components as needed by the current increment, not speculative architecture. No new dependency or new framework.

Three existing test expectation changes are explicitly human-approved and already committed in this baseline: singleton region circle now numeric; link assertion scoped to selected sheet because carousel adds links; AppShell no longer supplies inactive filters on home (MapHome owns connected filters), list inactive filters preserved. These may require the initial source increment to remove the obsolete home filter even before filter UI entry. All remaining original test lines and all new approved tests must stay byte-identical. Never change tests/plan or reinterpret missing metadata to get GREEN. Region identity is canonical label plus server representative coordinate for precision=region; historical address/neighborhood may retain same-coordinate grouping without fabricated region precision. Deduplicate article_id first. Numeric counts include 1; never zoom cluster.

Observe the current entry only, preserving earlier behavior. Full gate will run after each entry. Full suite takes about120 seconds and binds local ports; the worker sandbox may deny those ports, but coordinator runtime can verify it. Do not alter acceptance commands or switch away from the default Next build to evade environment issues. The final browser checks and exact visual evidence are coordinator-owned and are not a reason to handoff before source implementation is complete. Return accurate source findings and checks, not a blanket visual completion claim.
CONTEXT
if [ "$SOBAYA_ROLE" = review ]; then
cat >> "$task_dir/prompt.txt" <<'REVIEW'

Fresh independent read-only source review bound to HEAD: inspect exact approved spec and diff, existing test preservation, region identity/count/dedup/coordinate stability and singleton/count styles, sorted safe article cards/images, period inclusive boundaries and unknown/future dates, sync of marker counts/cards/selection without SDK or camera reset, dialogs/outside click/Escape/focus/scroll/inert cleanup, SDK lifecycle/listener cleanup/retry and source attribution clearance. Category/status values are unavailable and must not be selectable/inferred. Keep original site behavior outside home. Runtime has run the full gate at this HEAD. Do not run write-producing tests/build, edit, commit or publish. Return done only when no actionable source defect remains, with file/line evidence for any finding.
REVIEW
fi
sandbox=workspace-write
[ "$SOBAYA_ROLE" != review ] || sandbox=read-only
codex exec --cd "$SOBAYA_APP" --model "$SOBAYA_MODEL" --sandbox "$sandbox" -c 'approval_policy="never"' --json --output-schema "$SOBAYA_APP/../sobaya/tdd-set/worker-result.schema.json" --output-last-message "$task_dir/result.json" - < "$task_dir/prompt.txt" > "$task_dir/events.jsonl"
cat "$task_dir/events.jsonl"
if jq -e -s 'any(.[]; .type=="turn.failed" or .type=="error")' "$task_dir/events.jsonl" >/dev/null; then exit 1; fi
jq -c --slurpfile events "$task_dir/events.jsonl" '. + {usage: ([$events[] | select(.type=="turn.completed") | .usage][-1] // {})}' "$task_dir/result.json"
