# Sitemap

Next.js App Router에서 sitemap.xml을 생성하는 방법.

## 정적 sitemap (포트폴리오 단일 페이지용)

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

## 동적 sitemap (프로덕트 개별 페이지가 있는 경우)

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'

  const products = await fetchQuery(api.products.list)

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product._id}`,
    lastModified: new Date(product._creationTime),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...productUrls,
  ]
}
```

## changeFrequency 가이드

| 값 | 적합한 페이지 |
|----|--------------|
| `always` | 실시간 데이터 |
| `hourly` | 뉴스, 피드 |
| `daily` | 블로그 홈 |
| `weekly` | 카테고리 |
| `monthly` | 포트폴리오, 프로덕트 |
| `yearly` | 정적 페이지 |
| `never` | 아카이브 |

## 확인 방법

개발 서버 실행 후 `/sitemap.xml` 접근으로 확인:
```
http://localhost:3000/sitemap.xml
```
