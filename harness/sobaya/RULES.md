# Sobaya integration rules

Sobaya owns the Canon TDD cycle; this collaboration harness owns claims,
conflict coordination, journals and handoff. Preserve those team rules while
using the selected runtime's development contract.

| Runtime behavior | Consumer rule | Enforcement or guidance |
| --- | --- | --- |
| One concrete test: RED, GREEN, optional refactor; future scenarios remain prose | Select the next test from learning. No exact-test approval or frozen future batch. Never weaken tests to manufacture GREEN. | Sobaya `tdd-set/AGENTS.md`, start-work |
| Full declared suite after implementation and refactoring | Report actual evidence; optional review is useful when requested or warranted, not a mandatory `review.head` gate. Pause to assess learning between features. | Handoff |
| `spec.md` and `failed-test.md` are feature-local inputs | Preserve the human-owned spec; archive feature documents under `collab/journal/plans/<date-owner-slug>/` after verification. Do not recreate archived documents for installation maintenance. | Handoff; collaboration check prevents root feature documents entering main |
| Worker processes bypass editor hooks | Wrap workers with `scripts/collab.sh run -- ...`; stop for a colleague's active hotspot edit and report affected shared files afterward. | Collaboration run and Git hooks |
| State belongs to one Git directory; active attempts bind the working revision | Use separate worktrees for simultaneous tasks. Keep the team's merge policy. Pulse must defer while a lock or active attempt exists. The legacy `sobaya_approved` helper name means state existence only. | start-work, pulse, `sobaya_busy` |
| Optional source runtime is selected locally | Use `SOBAYA_ROOT`, then clone-local Git `sobaya.sourceRoot`, then workspace/sibling discovery. The local path is not a tracked team setting. It must point to the exact `sha` in `harness/sobaya.lock`. | `harness/config.sh`, `sobaya_root` |
| App hook delegates to selected source runtime | Preserve `core.hooksPath=.githooks`; its pre-commit runs the managed common Git hook. Back up and update only that Sobaya hook when changing runtime. Keep the runtime checkout available afterward. | `.githooks/pre-commit` |
| Source `install.sh` may scaffold missing feature documents | Do not use legacy `attach-sobaya.sh sync/update` for an already attached app with archived plans. It can pull a source checkout and recreate feature inputs. Inspect the exact candidate, update the local path/team pin/hook deliberately, and validate without running publisher hooks. | Maintenance workflow |
| Real app instructions are required | Keep `AGENTS.md` a regular file and `CLAUDE.md` its symlink; retain provider hook routing. | Existing template structure |
| `step.sh` requires unrelated edits to be committed or isolated | Complete the normal collaboration claim/journal workflow before starting another test. `gate.sh` can verify uncommitted GREEN refactoring. | Runtime and handoff |

A closed legacy state without current feature documents is historical. Preserve
its exact original metadata, receipts, calls and usage before transitioning to
ready v2. This does not rerun its tests, approve a new feature, reset budgets or
establish completion. New work needs its own authorized product intent and
scenario list. Retired approval commands are not part of the new cycle.

When revising this integration, run `tests/hooks.sh`, `tests/loop.sh` and
`tests/sobaya.sh` plus the app's declared suite. Verify the actual local resolver,
pin and hook target; a document edit alone does not migrate the installation.
