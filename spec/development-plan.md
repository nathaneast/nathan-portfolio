# Development Plan - Nathan Portfolio

## Overview
todo.md의 11개 Task를 Git Worktree 기반 병렬 에이전트로 실행하는 개발 계획.

---

## 사전 작업: 커스텀 스킬 생성

### A) `.agents/skills/convex-best-practices/`
- Convex 스키마/함수/파일스토리지 작업 시 참조하는 규칙 스킬
- 내용: schema-definition, crud-functions, file-storage, nextjs-integration, auth-session

### B) `.agents/skills/shadcn-ui-patterns/`
- UI 컴포넌트/폼/테마 작업 시 참조하는 규칙 스킬
- 내용: theme-setup, dark-mode, form-patterns, component-usage

---

## 에이전트 구성 (OMC 내장)

| 에이전트 | 모델 | 역할 |
|---------|------|------|
| `executor` | sonnet | 코드 구현, 설정, 리팩토링 |
| `designer` | sonnet | UI/UX 설계, 레이아웃/컴포넌트 디자인 |
| `security-reviewer` | sonnet | 인증 보안 점검, 취약점 확인 |
| `verifier` | sonnet | build/lint 검증, PRD 대비 완성도 확인 |

---

## 실행 파이프라인

### Phase 1: 프로젝트 기반 셋업 (순차, 메인 dev 브랜치)

```
executor(Task 1: 초기 설정)
  → executor(Task 2: DB 스키마)
  → verifier(build + lint 검증)
  → git commit to dev
```

- **Task 1**: Convex 연동, shadcn/ui 설치, 다크모드 전용 테마, 환경변수 구성
- **Task 2**: Convex 테이블(profile, personalPages, products) + 기본 CRUD 함수
- 검증: `npm run build` + `npm run lint` 통과

### Phase 2: 홈 화면 (병렬 worktree → 통합 → 순차)

```
designer(홈 화면 UI 설계)
  ↓
┌─ worktree A (task3-profile 브랜치)
│    executor(Task 3: 프로필 소개 영역)
│
└─ worktree B (task4-products 브랜치)
     executor(Task 4: 프로덕트 목록 영역)

  → merge to dev
  → executor(Task 5: 반응형 레이아웃) [메인 dev]
  → verifier(build + lint + 홈 화면 렌더링 검증)
  → git commit to dev
```

- **Task 3**: 원형 프로필 이미지, 소개글, SNS 아이콘 링크, 개인 페이지 링크 목록
- **Task 4**: 카드 UI, 최신순 정렬, 15개씩 무한스크롤, 서비스 종료 표시
- **Task 5**: 데스크탑/태블릿 2단, 모바일 세로 배치
- 충돌 범위: layout.tsx import 정도 (낮음)

### Phase 3: 수정 페이지 (순차 → 보안 → 병렬 worktree → 통합)

```
executor(Task 6: 인증) [메인 dev]
  → security-reviewer(인증 보안 점검)
  ↓
┌─ worktree C (task7-profile-mgmt 브랜치)
│    executor(Task 7: 프로필 관리)
│
└─ worktree D (task8-product-mgmt 브랜치)
     executor(Task 8: 프로덕트 관리)

  → merge to dev
  → verifier(build + lint + 인증 + CRUD 동작 검증)
  → git commit to dev
```

- **Task 6**: 비밀번호 입력 화면, 서버 사이드 검증, session cookie 발급
- **Task 7**: 프로필 이미지/소개글 수정, SNS 링크 CRUD, 개인 페이지 링크 CRUD, 이미지 업로드
- **Task 8**: 프로덕트 CRUD, 이미지 업로드, 서비스 상태 변경
- 충돌 범위: app/admin/ 하위 별도 경로 (거의 없음)

### Phase 4: 마무리 (병렬 worktree → 통합 → 순차)

```
┌─ worktree E (task9-seo 브랜치)
│    executor(Task 9: SEO 적용)
│
└─ worktree F (task10-badge 브랜치)
     executor(Task 10: 환경 뱃지 UI)

  → merge to dev
  → executor(Task 11: dev 환경 배포) [메인 dev]
  → verifier(최종 검증: build + lint + PRD 대비 기능 완성도)
  → git commit to dev
```

- **Task 9**: 메타태그, OG 이미지, sitemap
- **Task 10**: local/dev 환경 좌측 상단 뱃지 표시
- **Task 11**: Vercel dev 프로젝트 셋업 및 배포
- 충돌 범위: layout.tsx metadata vs 뱃지 import (낮음)

---

## Git Worktree 전략

### 브랜치 흐름
```
dev (메인)
  ├── Phase 1: 직접 작업 → commit
  ├── task3-profile ──────┐
  ├── task4-products ─────┤→ merge to dev → Task 5 → commit
  ├── task7-profile-mgmt ─┐
  ├── task8-product-mgmt ─┤→ merge to dev → commit
  ├── task9-seo ──────────┐
  └── task10-badge ───────┤→ merge to dev → Task 11 → commit
```

### 충돌 최소화
- 병렬 Task 간 수정 파일 범위가 겹치지 않도록 설계
- Phase 간 의존성은 순차 실행으로 해결 (Phase 1 완료 → Phase 2 시작)
- merge 시 충돌 발생하면 수동 해결 후 진행

### 정리
- merge 완료된 worktree + 브랜치는 즉시 삭제
- 최종적으로 dev 브랜치에 모든 코드가 통합

---

## 검증 기준

| 시점 | 검증 항목 |
|------|----------|
| Phase 1 완료 | `npm run build` + `npm run lint` 통과 |
| Phase 2 완료 | 빌드/린트 + 홈 화면 렌더링 확인 |
| Phase 3 완료 | 빌드/린트 + 인증 + CRUD 동작 확인 |
| Phase 4 완료 | 빌드/린트 + PRD 대비 전체 기능 완성도 검증 |
