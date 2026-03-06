---
name: refactoring
description: staged 변경사항을 대상으로 중복 코드, 구조적 문제, 개선 가능한 패턴을 탐지한다. git commit 전 또는 리팩터링 검사 요청 시 사용.
allowed-tools: Bash(git diff *), Bash(git log *), Read, Grep, Glob
---

# Refactoring

staged 변경사항(`git diff --staged`)을 분석하여 구조적 문제와 개선 기회를 탐지한다.

## 검사 절차

1. `git diff --staged`로 변경된 파일과 diff를 확인한다.
2. 변경된 파일의 전체 내용을 `Read`로 읽어 맥락을 파악한다.
3. 자동 생성 파일(`convex/_generated/`, `node_modules/`)은 제외한다.
4. 아래 검사 항목을 순서대로 적용한다.
5. 문제 발견 시 `파일명:라인번호 - 사유 + 개선 방안` 형식으로 보고한다.

## 검사 항목

### 중복 코드
- 동일하거나 유사한 로직이 2곳 이상에서 반복 → 공통 함수/훅/컴포넌트로 추출.
- 유사한 JSX 패턴 반복 → 공통 컴포넌트로 분리.
- 동일한 매직 넘버/문자열 2곳 이상 사용 → 상수로 추출.
- 동일한 타입 정의가 여러 파일에 존재 → 공통 타입 파일로 통합.

### 파일 구조
- 200줄 초과 → 기능 단위로 분리.
- 한 파일이 여러 책임(데이터 페칭 + UI + 로직) → 분리.
- props 5개 이상 → 객체 그룹핑 또는 컴포넌트 분리 고려.

### 함수 복잡도
- 함수 20줄 이상 → 의미 단위 분리 고려.
- 중첩 조건문 3단계 이상 → early return 패턴 적용.
- 콜백 중첩이 깊음 → 헬퍼 함수 추출.

### React/Next.js 패턴
- 불필요한 `useEffect` → 이벤트 핸들러 또는 derived state로 대체.
- 불필요한 `useMemo`/`useCallback` → 실제 성능 문제 없으면 제거.
- 불필요한 state → props/계산값으로 대체 가능하면 제거.
- `"use client"` 범위 → 리프 컴포넌트로 내릴 수 있으면 내리기.
- 성능 최적화 패턴은 [vercel-react-best-practices](../vercel-react-best-practices/SKILL.md)의 규칙을 기준으로 적용한다. 특히 CRITICAL/HIGH 우선순위 규칙(async-*, bundle-*, server-*)에 해당하는 위반이 있으면 개선을 권고한다.

### Tailwind 패턴
- 중복 클래스 조합 반복 → 컴포넌트로 추출 (유틸 클래스 추상화는 지양).
- 조건부 클래스 → `clsx`/`cn` 활용.

### Import 정리
- 사용하지 않는 import 제거.
- import 순서: 외부 라이브러리 → 내부 모듈 → 상대 경로.

## 판단 기준

- **차단 (ok: false)**: 200줄 초과, 명백한 중복 코드 3곳 이상, 불필요한 `useEffect`.
- **통과 (ok: true)**: 경미한 개선 사항은 차단하지 않고 제안만 보고. 과도한 추상화 요구 금지.

프로젝트 코딩 컨벤션은 [policy/coding.md](../../../policy/coding.md)를 참조한다.
