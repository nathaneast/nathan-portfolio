# Robots.txt

Next.js App Router에서 robots.txt를 생성하는 방법.

## 파일 기반 설정 (권장)

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],  // 수정 페이지, API 크롤링 차단
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

## 복수 규칙 (봇별 차등 설정)

```ts
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'GPTBot',  // AI 크롤러 차단 (선택)
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
```

## 이 프로젝트 권장 설정

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',  // 수정 페이지 크롤링 차단
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

## 확인 방법

```
http://localhost:3000/robots.txt
```
