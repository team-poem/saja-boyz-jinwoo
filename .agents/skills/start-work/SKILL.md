---
name: start-work
description: 작업 브랜치를 만들고 claim(무엇을 만드는지)을 써서 push 한다. 새 작업을 시작할 때, 훅이 "claim 이 없습니다" 로 막았을 때, 남의 브랜치를 이어받을 때 사용.
---

# start-work — 작업 선언

파일을 고치기 전에 "무엇을 만드는지" 선언하고 push 한다. 훅이 claim 없는 수정을 막으므로 항상 첫 행동이다. 30초면 된다.

## 절차
1. 세션 시작 시 주입된 "동료 작업 중" 과 "지금 같은 파일을 만지는 중" 을 본다. 같은 걸 만들고 있으면 사용자에게 먼저 말한다.
2. 보호 브랜치면 `git fetch origin && git switch -c <type>/<slug> origin/main` (type: feat/fix/chore/docs/refactor).
3. `mkdir -p collab/active/<branch-slug>` (`/`→`--`), `collab/templates/claim.md` 를 `claim.md` 로 복사해 `owner`(= `git config collab.me`)와 `goal` 한 줄을 채운다.
4. claim 만 담은 첫 커밋을 만들고 push 한다. push 해야 동료 세션에 보인다.
   ```
   git add collab/active/<slug> && git commit -m "chore(collab): claim <branch>" && git push -u origin HEAD
   ```

## 공유 파일을 건드리는 작업이라면
goal 이 허브 파일(`harness/config.sh` HOTSPOTS: 스키마, lockfile, 공용 타입 …)을 바꿔야 하면 사용자에게 제안한다:
"스키마·의존성 변경만 담은 작은 `chore/` 브랜치를 먼저 올려 머지하고, 기능 브랜치는 그 위에서". 동료가 그 파일을 기다리는 시간이 사라진다.
동료 claim 의 `next:` 나 "브랜치에 커밋됨" 목록에 내가 만질 파일이 있으면 순서를 사용자와 정한다.

## Development with Sobaya

5. Keep feature work isolated with `sh scripts/collab.sh worktree <branch>` when
   another task already owns this checkout or execution state. Do not copy or
   reuse another worktree's active attempt. The team's merge workflow remains.
6. Resolve the reviewed source runtime through `harness/config.sh` and check its
   revision against `harness/sobaya.lock`. For existing installations, follow
   `harness/sobaya/RULES.md`; legacy attach/sync may scaffold absent documents.
   Prepare the authorized feature's scenario list in `failed-test.md`. Preserve
   human-owned `spec.md`; ask about unclear product intent instead of inventing it.
7. Write one next test, observe why it fails, then implement GREEN with the full
   declared suite. Use a direct agent cycle or the optional one-test `step.sh` /
   `loop.sh`; no iteration count and no `approve.sh`. Wrap implementation workers
   with `sh scripts/collab.sh run -- <selected-runtime-command>`. Stop for a
   colleague's active hotspot edit before launching the worker.
8. At GREEN, consider small behavior-preserving source/test refactoring and rerun
   the suite. Update future prose scenarios from learning; tests need no separate
   approval. Do not weaken assertions to hide a defect. At a feature boundary,
   assess the actual outcome and learning before choosing further authorized work.

## 이어받기 (남의 브랜치에서 계속할 때)
1. 그 브랜치로 switch. digest 가 "owner 가 @X" 라고 알려준다.
2. 그 브랜치의 최근 저널 `## 남은 것` 을 읽고 사용자에게 요약한다.
3. claim 의 `owner` 를 나로 바꾸고 `## 메모` 에 "YYYY-MM-DD @X → @나 이어받음". 커밋·push.
4. 내 첫 저널 이벤트에 `- reply @X <branch> 이어받았습니다`.

## 하지 않는 것
- claim 전에 코드를 고치지 않는다 (Write/Edit 도 Bash 도 막힌다).
- 다른 브랜치의 claim 을 수정하지 않는다.
