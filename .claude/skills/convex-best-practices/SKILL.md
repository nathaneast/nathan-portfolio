---
name: convex-best-practices
description: Convex DB 스키마 정의, query/mutation/action 함수 작성, 파일 스토리지 연동, Next.js 통합, 인증/세션 구현 시 사용. Convex 관련 코드를 작성하거나 리뷰할 때 자동 활성화.
---

# Convex Best Practices

Convex DB를 사용하는 이 프로젝트에서 일관된 패턴과 best practice를 따르도록 가이드한다.

## 핵심 원칙

1. 스키마는 `convex/schema.ts`에서 `defineSchema`, `defineTable`로 정의
2. 함수는 `query`, `mutation`, `action`을 용도에 맞게 사용
3. 파일 스토리지는 Convex 내장 기능 사용 (외부 스토리지 불필요)
4. Next.js 연동은 ConvexProvider + useQuery/useMutation 패턴
5. 인증은 환경변수 비밀번호 + session cookie 방식

## 상세 규칙

각 규칙 파일에 구체적인 패턴과 코드 예시가 포함되어 있다:

- [스키마 정의](rules/schema-definition.md)
- [CRUD 함수](rules/crud-functions.md)
- [파일 스토리지](rules/file-storage.md)
- [Next.js 통합](rules/nextjs-integration.md)
- [인증/세션](rules/auth-session.md)

프로젝트 policy와 충돌 시 policy 우선.
