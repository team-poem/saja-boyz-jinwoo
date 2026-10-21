#!/bin/sh
# 이미 설정된 프로젝트에 합류하는 사람의 개인 설정. 멱등. 사용: sh harness/join.sh <핸들>
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd -P)"; cd "$ROOT"
handle="${1:-}"; [ -n "$handle" ] || { printf '핸들 (영문, 공백·하이픈 없이): '; read -r handle; }
handle="$(printf '%s' "$handle" | tr ' -' '__')"; [ -n "$handle" ] || { echo "핸들이 필요합니다"; exit 1; }
git config collab.me "$handle"; git config rerere.enabled true; git config core.hooksPath .githooks
chmod +x harness/hooks/*.sh harness/*.sh .githooks/* scripts/*.sh tests/*.sh 2>/dev/null || true
echo "✓ 핸들 @$handle · rerere · git 훅(.githooks)"
if [ -f harness/sobaya.lock ]; then
  # Joining must not pull a shared runtime or recreate archived feature inputs.
  . "$ROOT/harness/hooks/lib.sh"
  if sr="$(sobaya_root)" && [ "$(git -C "$sr" rev-parse HEAD 2>/dev/null)" = "$(sobaya_lock)" ]; then
    echo "✓ sobaya 소스 버전 확인 (설치·기능 문서는 그대로 유지)"
  else
    echo "! sobaya 소스 경로·버전 확인 필요 — harness/sobaya/RULES.md 에 따라 경로·pin·훅을 점검하세요"
  fi
fi
echo "합류 완료. 세션을 켜면 협업 현황이 먼저 뜹니다. 첫 작업은 start-work."
