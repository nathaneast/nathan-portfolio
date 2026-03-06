# Next.js Integration Rules

## Provider 설정

```typescript
// app/ConvexClientProvider.tsx
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

```typescript
// app/layout.tsx
import ConvexClientProvider from "./ConvexClientProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
```

## 데이터 페칭 패턴

```typescript
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// 읽기
const profile = useQuery(api.profile.get);

// 쓰기
const updateProfile = useMutation(api.profile.update);
await updateProfile({ imageUrl: "...", introduction: "..." });
```

## Pagination (무한스크롤)

```typescript
import { usePaginatedQuery } from "convex/react";

const { results, status, loadMore } = usePaginatedQuery(
  api.products.list,
  {},
  { initialNumItems: 15 }
);

// status: "CanLoadMore" | "LoadingMore" | "Exhausted"
// loadMore(15) 로 다음 페이지 로드
```

## 규칙
- Convex 훅은 반드시 `"use client"` 컴포넌트에서 사용
- `useQuery`는 로딩 중 `undefined` 반환 → 로딩 상태 처리 필수
- 환경변수: `NEXT_PUBLIC_CONVEX_URL` (클라이언트), `CONVEX_DEPLOY_KEY` (서버)
