# OG 이미지

Next.js App Router에서 Open Graph / Twitter 카드 이미지를 생성하는 방법.

## 방법 1: 파일 기반 (정적 이미지)

`app/` 디렉토리에 이미지 파일을 직접 배치:

```
app/
├── opengraph-image.png    → og:image 자동 설정
├── twitter-image.png      → twitter:image 자동 설정
└── favicon.ico            → favicon 자동 설정
```

- 권장 사이즈: OG 1200×630px, Twitter 1200×600px
- 파일명이 정확해야 Next.js가 자동 인식

## 방법 2: ImageResponse (동적 생성, 권장)

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nathan | Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',  // 다크모드 배경 (zinc-950)
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#fafafa',  // zinc-50
            marginBottom: 24,
          }}
        >
          Nathan
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#a1a1aa',  // zinc-400
          }}
        >
          Frontend Developer
        </div>
      </div>
    ),
    { ...size }
  )
}
```

## 방법 3: 동적 OG (Convex 데이터 활용)

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const profile = await fetchQuery(api.profile.get)

  return new ImageResponse(
    (
      <div style={{ background: '#09090b', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#fafafa', fontSize: 60 }}>{profile?.name ?? 'Nathan'}</div>
      </div>
    ),
    { ...size }
  )
}
```

## 커스텀 폰트 사용

```tsx
export default async function OGImage() {
  const fontData = await fetch(
    new URL('../public/fonts/Pretendard-Bold.woff', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (<div style={{ fontFamily: 'Pretendard' }}>...</div>),
    {
      ...size,
      fonts: [{ name: 'Pretendard', data: fontData, style: 'normal', weight: 700 }],
    }
  )
}
```

## metadata에서 OG 이미지 명시적 참조 (선택)

파일 기반 또는 route 기반 OG 이미지는 Next.js가 자동으로 감지한다.
명시적으로 지정하고 싶을 때만 사용:

```ts
export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: '/opengraph-image',  // Next.js가 자동 처리
        width: 1200,
        height: 630,
        alt: 'Nathan | Developer',
      },
    ],
  },
}
```

## 주의사항

- `ImageResponse`는 CSS subset만 지원 (flexbox 위주, grid 미지원)
- `runtime = 'edge'` 설정 시 Node.js API 사용 불가
- 이미지 외부 URL 참조 시 `fetch`로 가져와 ArrayBuffer로 변환 필요
