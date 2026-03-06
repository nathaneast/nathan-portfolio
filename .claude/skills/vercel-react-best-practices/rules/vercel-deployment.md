# Vercel Deployment Rules

## 환경 분리
- `dev` 브랜치 → dev 환경 (개발 서버)
- `main` 브랜치 → prod 환경 (운영 서버)
- 환경변수는 dev/prod 완전 분리

## 환경변수
```
# 클라이언트 노출 (브라우저에서 접근 가능)
NEXT_PUBLIC_CONVEX_URL=...
NEXT_PUBLIC_ENV=local|dev|prod

# 서버 전용 (절대 클라이언트 노출 금지)
CONVEX_DEPLOY_KEY=...
ADMIN_PASSWORD=...
```

### 규칙
- `NEXT_PUBLIC_` 접두사: 클라이언트에 노출되는 값만
- 민감 정보(비밀번호, API 키)는 절대 `NEXT_PUBLIC_` 사용 금지
- `.env.local`은 gitignore 처리
- Vercel 대시보드에서 환경별 변수 설정

## 빌드 최적화
- `next.config.ts`에서 이미지 외부 도메인 설정
- 불필요한 dependency 최소화
- `npm run build` 로컬에서 확인 후 푸시

## 환경 감지
```tsx
const env = process.env.NEXT_PUBLIC_ENV ?? "local";
// "local" | "dev" | "prod"
```
