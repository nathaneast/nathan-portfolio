---
name: code-review
description: staged 변경사항을 대상으로 코드 품질, 버그, 컨벤션 위반을 체계적으로 리뷰한다. git commit 전 또는 코드 리뷰 요청 시 사용.
allowed-tools: Bash(git diff *), Bash(git log *), Read, Grep, Glob
---

# Code Review

staged 변경사항(`git diff --staged`)을 리뷰하여 코드 품질 문제를 탐지한다.

## 리뷰 절차

1. `git diff --staged`로 변경된 파일과 diff를 확인한다.
2. 자동 생성 파일(`convex/_generated/`, `node_modules/`)은 제외한다.
3. 아래 체크리스트 항목을 순서대로 검사한다.
4. 문제 발견 시 `파일명:라인번호 - 사유` 형식으로 보고한다.

## 체크리스트

### TypeScript 엄격성
- `any` 사용 금지. `unknown` + 타입 가드로 대체.
- 모든 props/함수 파라미터에 명시적 타입 선언.
- 불필요한 타입 단언(`as`) 최소화.

### 파일/컴포넌트 구조
- 한 파일 최대 200줄. 초과 시 기능 단위로 분리 필요.
- 한 파일에 하나의 컴포넌트/함수 역할.
- Server Component가 기본. `"use client"`는 hooks/이벤트/브라우저 API 필요 시에만.

### 코드 위생
- 사용하지 않는 import, 변수, 함수 제거.
- `console.log`, `debugger` 등 디버깅 코드 제거.
- 하드코딩된 매직 넘버/문자열은 상수로 추출.

### 스타일링 (다크모드 전용)
- `bg-white`, `text-black`, 하드코딩 색상 금지.
- shadcn 시맨틱 변수 사용: `bg-background`, `text-foreground`, `bg-card`.
- CSS-in-JS 금지. Tailwind 유틸리티 클래스만 사용.

### 접근성
- 시맨틱 HTML 사용 (`main`, `nav`, `section`, `aside`, `article`).
- `<div onClick>` 금지. `<button>` 또는 `<a>`/`<Link>` 사용.
- 모든 이미지에 `alt` 속성. `<img>` 대신 `next/image`.

### 보안
- API 키, 외부 SDK는 서버 경계에서만 사용.
- 환경변수가 클라이언트에 노출되지 않는지 확인.

## 판단 기준

- **차단 (ok: false)**: 타입 오류, `any` 사용, 보안 취약점, 접근성 위반, 200줄 초과, 디버깅 코드 잔존, 하드코딩 색상.
- **통과 (ok: true)**: 위 차단 사유 없음. 스타일 선호도 차이는 차단하지 않음.

프로젝트 코딩 컨벤션은 [policy/coding.md](../../../policy/coding.md)를 참조한다.
