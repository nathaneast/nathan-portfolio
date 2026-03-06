# 구조화 데이터 (JSON-LD)

Google 리치 결과를 위한 Schema.org 구조화 데이터 주입 방법.

## 주입 방식

Server Component에서 `<script>` 태그로 직접 주입한다.
`next/head`나 외부 라이브러리 없이 layout.tsx 또는 page.tsx에서 처리.

```tsx
// app/layout.tsx 또는 app/page.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nathan',
    url: 'https://yourdomain.com',
    sameAs: [
      'https://github.com/yourhandle',
      'https://twitter.com/yourhandle',
    ],
    jobTitle: 'Frontend Developer',
    description: '프론트엔드 개발자 Nathan의 포트폴리오',
  }

  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
```

## 포트폴리오에 적합한 스키마 타입

### Person (개인 포트폴리오)

```ts
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nathan',
  url: 'https://yourdomain.com',
  image: 'https://yourdomain.com/profile.jpg',
  jobTitle: 'Frontend Developer',
  description: '프론트엔드 개발자',
  sameAs: [
    'https://github.com/yourhandle',
    'https://linkedin.com/in/yourhandle',
    'https://twitter.com/yourhandle',
  ],
  knowsAbout: ['React', 'Next.js', 'TypeScript'],
}
```

### WebSite (사이트 전체)

```ts
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nathan Portfolio',
  url: 'https://yourdomain.com',
  description: '프론트엔드 개발자 Nathan의 포트폴리오',
  author: {
    '@type': 'Person',
    name: 'Nathan',
  },
}
```

### SoftwareApplication (프로덕트 개별 페이지)

```ts
const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: product.name,
  description: product.description,
  url: product.url,
  applicationCategory: 'WebApplication',
  author: {
    '@type': 'Person',
    name: 'Nathan',
  },
  dateCreated: new Date(product._creationTime).toISOString(),
}
```

## 복수 스키마 주입

여러 스키마를 동시에 적용하려면 배열로 묶는다:

```tsx
const jsonLd = [
  { '@context': 'https://schema.org', '@type': 'Person', ... },
  { '@context': 'https://schema.org', '@type': 'WebSite', ... },
]

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

## Convex 데이터 연동

```tsx
// app/page.tsx (Server Component)
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'

export default async function HomePage() {
  const profile = await fetchQuery(api.profile.get)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile?.name ?? 'Nathan',
    description: profile?.bio ?? '',
    url: process.env.NEXT_PUBLIC_SITE_URL,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 페이지 콘텐츠 */}
    </>
  )
}
```

## 검증

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org
