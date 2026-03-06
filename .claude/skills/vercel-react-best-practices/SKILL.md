---
name: vercel-react-best-practices
description: React/Next.js 코드를 작성, 리뷰, 리팩터링할 때 자동 활성화. React 컴포넌트, Next.js 페이지, 데이터 페칭, 번들 최적화, 성능 개선 작업에 사용. Vercel Engineering 기반 58개 규칙.
---

# Vercel React Best Practices

React/Next.js 성능 최적화 가이드. 8개 카테고리, 58개 규칙을 영향도 순으로 정리.

## 규칙 카테고리 (우선순위순)

| 우선순위 | 카테고리 | 영향도 | 접두사 |
|---------|---------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## 주요 규칙 (CRITICAL/HIGH)

### 1. Eliminating Waterfalls (CRITICAL)
- [async-defer-await](rules/async-defer-await.md) - await를 실제 사용 분기로 이동
- [async-parallel](rules/async-parallel.md) - 독립 연산은 Promise.all() 사용
- [async-dependencies](rules/async-dependencies.md) - 부분 의존성은 better-all 사용
- [async-api-routes](rules/async-api-routes.md) - API 라우트에서 promise 조기 시작
- [async-suspense-boundaries](rules/async-suspense-boundaries.md) - Suspense로 스트리밍

### 2. Bundle Size Optimization (CRITICAL)
- [bundle-barrel-imports](rules/bundle-barrel-imports.md) - 직접 import, barrel 파일 지양
- [bundle-dynamic-imports](rules/bundle-dynamic-imports.md) - 무거운 컴포넌트는 next/dynamic
- [bundle-defer-third-party](rules/bundle-defer-third-party.md) - 분석/로깅은 hydration 후 로드
- [bundle-conditional](rules/bundle-conditional.md) - 기능 활성 시에만 모듈 로드
- [bundle-preload](rules/bundle-preload.md) - hover/focus 시 preload

### 3. Server-Side Performance (HIGH)
- [server-auth-actions](rules/server-auth-actions.md) - 서버 액션 인증
- [server-cache-react](rules/server-cache-react.md) - React.cache() 요청별 중복 제거
- [server-cache-lru](rules/server-cache-lru.md) - 교차 요청 LRU 캐시
- [server-dedup-props](rules/server-dedup-props.md) - RSC props 직렬화 중복 제거
- [server-hoist-static-io](rules/server-hoist-static-io.md) - 정적 I/O 모듈 레벨로
- [server-serialization](rules/server-serialization.md) - 클라이언트 전달 데이터 최소화
- [server-parallel-fetching](rules/server-parallel-fetching.md) - 페칭 병렬화
- [server-after-nonblocking](rules/server-after-nonblocking.md) - after()로 논블로킹

### 4~8. 중간/낮은 영향도 규칙

상세 규칙은 `rules/` 디렉토리의 개별 파일을 참조한다. 각 파일에 잘못된 코드 vs 올바른 코드 예시가 포함되어 있다.

## 추가 참조

- [Next.js App Router 패턴](rules/nextjs-app-router.md)
- [React 패턴](rules/react-patterns.md)
- [Next.js 최적화](rules/nextjs-optimization.md)
- [접근성](rules/accessibility.md)
- [Vercel 배포](rules/vercel-deployment.md)
