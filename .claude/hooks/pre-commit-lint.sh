#!/bin/bash
# pre-commit-lint.sh
# git commit 명령일 때만 ESLint + TypeScript 체크 실행

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# git commit 명령이 아니면 통과
if ! echo "$COMMAND" | grep -qE '^git commit'; then
  exit 0
fi

echo "Running pre-commit lint checks..." >&2

# ESLint
if ! npx eslint . --quiet 2>&1; then
  echo "ESLint failed. Fix lint errors before committing." >&2
  exit 2
fi

# TypeScript typecheck
if ! npx tsc --noEmit 2>&1; then
  echo "TypeScript typecheck failed. Fix type errors before committing." >&2
  exit 2
fi

echo "Lint checks passed." >&2
exit 0
