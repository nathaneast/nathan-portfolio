---
name: shadcn-ui-patterns
description: UI 컴포넌트 구현, 폼 작업, 다크모드 테마 설정, shadcn/ui 컴포넌트 사용 시 자동 활성화. 다크모드 전용 포트폴리오의 UI 일관성과 품질을 보장한다.
---

# shadcn/ui Patterns

다크모드 전용 포트폴리오의 UI 일관성과 품질을 보장하는 디자인 패턴 가이드.

## 핵심 원칙

1. 다크모드 전용 — 라이트모드 미지원, dark 클래스 항상 적용
2. shadcn/ui 컴포넌트를 기본으로 사용
3. 커스텀 스타일은 Tailwind CSS로만 작업
4. 폼은 react-hook-form + zod 패턴
5. 깔끔, 모던, 가독성 우선

## 상세 규칙

각 규칙 파일에 구체적인 패턴과 코드 예시가 포함되어 있다:

- [테마 설정](rules/theme-setup.md)
- [다크모드](rules/dark-mode.md)
- [컴포넌트 사용법](rules/component-usage.md)
- [폼 패턴](rules/form-patterns.md)

프로젝트 policy와 충돌 시 policy 우선.
