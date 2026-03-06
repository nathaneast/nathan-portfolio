# Next.js Optimization Rules

## Image 최적화
```tsx
import Image from "next/image";

// 고정 크기
<Image src="/photo.jpg" alt="설명" width={300} height={200} />

// fill 모드 (부모 relative 필수)
<div className="relative w-full h-64">
  <Image src="/photo.jpg" alt="설명" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
</div>

// 외부 이미지 — next.config.ts에 도메인 등록 필요
```

### Image 규칙
- `<img>` 태그 직접 사용 금지 — 반드시 `next/image` 사용
- `alt` 속성 필수 (접근성)
- `sizes` 속성으로 반응형 크기 힌트 제공
- LCP(Largest Contentful Paint) 이미지에 `priority` 속성
- 외부 이미지 도메인은 `next.config.ts`의 `images.remotePatterns`에 등록

## Link
```tsx
import Link from "next/link";

<Link href="/about">About</Link>
```
- `<a>` 태그 대신 `next/link` 사용 (내부 네비게이션)
- 외부 링크는 `<a target="_blank" rel="noopener noreferrer">`

## Font
```tsx
// app/layout.tsx에서 설정
import { Geist } from "next/font/google";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
```
- `next/font`로 폰트 최적화 (자동 self-hosting)
- CSS 변수로 연결

## 성능
- dynamic import: 큰 컴포넌트 지연 로딩
```tsx
import dynamic from "next/dynamic";
const HeavyChart = dynamic(() => import("./HeavyChart"), { ssr: false });
```
- 불필요한 리렌더링 방지: memo, useMemo, useCallback은 실제 성능 문제가 있을 때만
- bundle 크기: lucide-react 등 트리쉐이킹 가능한 라이브러리 사용
