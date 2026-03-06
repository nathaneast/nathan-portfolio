---
name: nextjs-seo
description: Next.js App Router SEO 설정 시 자동 활성화. metadata API, OG 이미지, sitemap, robots.txt, JSON-LD 구조화 데이터 구현 작업에 사용.
---

# Next.js SEO Best Practices

Next.js App Router 기반 SEO 구현 가이드. metadata API 중심으로 OG, sitemap, 구조화 데이터까지 커버.

## 핵심 원칙

1. `next/head` 사용 금지 — App Router에서는 `metadata` export 또는 `generateMetadata()` 사용
2. 정적 페이지는 `export const metadata`, 동적 페이지는 `generateMetadata()` 함수 사용
3. OG 이미지는 `opengraph-image.tsx` 파일 기반 또는 `ImageResponse`로 동적 생성
4. sitemap과 robots는 `app/` 루트에 파일 기반으로 선언
5. JSON-LD 구조화 데이터는 `<script type="application/ld+json">` 으로 주입

## 규칙 목록

| 파일 | 내용 |
|------|------|
| [metadata-api](rules/metadata-api.md) | static/dynamic metadata, 필수 필드, 상속 패턴 |
| [og-image](rules/og-image.md) | opengraph-image.tsx, ImageResponse, 파일 기반 OG |
| [sitemap](rules/sitemap.md) | sitemap.ts 정적/동적 생성 |
| [robots](rules/robots.md) | robots.ts 설정 |
| [structured-data](rules/structured-data.md) | JSON-LD Person/WebSite/SoftwareApplication 스키마 |
| [seo-checklist](rules/seo-checklist.md) | 구현 전 체크리스트 및 검증 방법 |

## 이 프로젝트 적용 맥락

- **포트폴리오 사이트**: 단일 홈 페이지 중심, 정적 metadata 우선
- **다크모드 전용**: OG 이미지도 다크 테마 유지
- **Convex 연동**: 동적 메타데이터가 필요하면 `generateMetadata`에서 Convex 데이터 활용
- **배포 환경**: Vercel (VERCEL_URL 환경변수 활용 가능)

policy와 충돌 시 policy 우선.
