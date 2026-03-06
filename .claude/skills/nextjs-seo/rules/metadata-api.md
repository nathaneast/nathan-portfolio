# Metadata API

Next.js App Router에서 SEO 메타데이터를 설정하는 방법.

## 정적 metadata (권장 — 포트폴리오 홈 페이지)

```ts
// app/layout.tsx 또는 app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Nathan | Developer',
    template: '%s | Nathan',  // 하위 페이지에서 title만 지정하면 자동 조합
  },
  description: '프론트엔드 개발자 Nathan의 포트폴리오',
  keywords: ['developer', 'frontend', 'portfolio'],
  authors: [{ name: 'Nathan' }],
  creator: 'Nathan',
  metadataBase: new URL('https://yourdomain.com'),  // 절대 URL 기준점 (필수)

  openGraph: {
    title: 'Nathan | Developer',
    description: '프론트엔드 개발자 Nathan의 포트폴리오',
    url: 'https://yourdomain.com',
    siteName: 'Nathan Portfolio',
    locale: 'ko_KR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nathan | Developer',
    description: '프론트엔드 개발자 Nathan의 포트폴리오',
    creator: '@yourhandle',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'your-google-site-verification-token',  // 선택
  },
}
```

## 동적 metadata (개별 프로덕트 페이지 등)

```ts
// app/products/[id]/page.tsx
import type { Metadata } from 'next'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Convex fetchQuery 또는 다른 데이터 소스
  const product = await fetchProduct(params.id)

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  }
}
```

## metadataBase 설정 (필수)

OG 이미지, canonical URL 등 상대 경로를 절대 URL로 변환하려면 반드시 설정해야 한다.

```ts
// 환경별 처리
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  ),
}
```

## layout.tsx vs page.tsx 분리 전략

- `layout.tsx`: 사이트 전체 공통 메타데이터 (title template, metadataBase, robots)
- `page.tsx`: 페이지별 구체적인 title, description, OG 오버라이드

하위 페이지의 metadata는 상위 layout의 metadata를 **병합(merge)** 한다.
단, `openGraph`, `twitter` 등 객체 필드는 **완전 교체**되므로 하위에서 재정의 시 전체 작성 필요.

## 잘못된 패턴

```tsx
// BAD: App Router에서 next/head 사용 금지
import Head from 'next/head'
export default function Page() {
  return (
    <>
      <Head><title>Page</title></Head>  {/* 동작하지 않거나 충돌 */}
      <main>...</main>
    </>
  )
}
```

```tsx
// BAD: metadata를 Client Component에서 export
'use client'
export const metadata = { title: 'Page' }  // 무시됨 — Server Component에서만 동작
```
