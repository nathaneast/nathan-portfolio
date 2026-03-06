# SEO 구현 체크리스트

Task 9 (SEO 적용) 구현 시 확인할 항목.

## 필수 구현 항목

### 1. layout.tsx — metadata 기본값 설정
- [ ] `metadataBase` 설정 (환경변수 기반)
- [ ] `title.default` + `title.template` 설정
- [ ] `description` 설정
- [ ] `openGraph` 기본값 설정 (title, description, type, locale, siteName)
- [ ] `twitter` 카드 설정 (card: 'summary_large_image')
- [ ] `robots` 설정 (index/follow)

### 2. OG 이미지
- [ ] `app/opengraph-image.tsx` 생성 (ImageResponse 사용)
- [ ] 다크 배경 (#09090b) 으로 포트폴리오 테마 통일
- [ ] 사이즈: 1200×630

### 3. sitemap.ts
- [ ] `app/sitemap.ts` 생성
- [ ] 홈 URL 포함
- [ ] `NEXT_PUBLIC_SITE_URL` 환경변수 활용

### 4. robots.ts
- [ ] `app/robots.ts` 생성
- [ ] `/admin/` 크롤링 차단
- [ ] sitemap URL 포함

### 5. 구조화 데이터 (선택)
- [ ] `Person` 스키마 — layout.tsx 또는 page.tsx에 주입
- [ ] `WebSite` 스키마 추가 (선택)

## 환경변수 확인

`.env.local`에 추가 필요:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Vercel 배포 시 환경변수 설정 필요.

## 검증 방법

```bash
# 개발 서버에서 확인
open http://localhost:3000/sitemap.xml
open http://localhost:3000/robots.txt
open http://localhost:3000/opengraph-image
```

### 외부 도구
- OG 미리보기: https://opengraph.xyz (URL 입력)
- 구조화 데이터 검증: https://search.google.com/test/rich-results
- Twitter 카드 검증: https://cards-dev.twitter.com/validator

## 파일 위치 정리

```
app/
├── layout.tsx          ← metadata export 추가
├── opengraph-image.tsx ← OG 이미지 생성
├── sitemap.ts          ← sitemap.xml
└── robots.ts           ← robots.txt
```

## 주의사항

- `NEXT_PUBLIC_SITE_URL`이 없으면 개발 환경에서 VERCEL_URL 폴백, 그것도 없으면 localhost 사용
- `metadataBase`가 없으면 Next.js 경고 + 상대 경로 OG 이미지 미동작
- Client Component에서 `metadata` export는 무시됨 — Server Component에서만 동작
