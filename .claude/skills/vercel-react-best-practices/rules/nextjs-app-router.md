# Next.js App Router Rules

## 라우팅
- `app/` 디렉토리 기반 파일 시스템 라우팅
- `page.tsx`: 라우트의 UI
- `layout.tsx`: 공유 레이아웃 (중첩 가능)
- `loading.tsx`: Suspense 기반 로딩 UI
- `error.tsx`: 에러 바운더리
- `not-found.tsx`: 404 페이지
- 라우트 그룹: `(group)/` — URL에 영향 없이 파일 구조 정리

## Server vs Client Component
```tsx
// Server Component (기본값) — "use client" 없음
// DB 조회, 파일 읽기, 민감한 로직 등
export default function Page() {
  return <div>서버에서 렌더링</div>;
}

// Client Component — "use client" 필요
// useState, useEffect, 이벤트 핸들러, 브라우저 API
"use client";
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## 규칙
- Server Component를 기본으로 사용
- "use client"는 꼭 필요한 컴포넌트에만 추가
- Client Component는 트리의 말단(leaf)에 배치 — 범위 최소화
- Server Component에서 데이터 페칭, Client Component에서 인터랙션 담당
- async Server Component에서 직접 await 가능 (useEffect 불필요)

## Metadata
```tsx
// 정적 metadata
export const metadata: Metadata = {
  title: "페이지 제목",
  description: "설명",
};

// 동적 metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  return { title: `동적 제목` };
}
```
