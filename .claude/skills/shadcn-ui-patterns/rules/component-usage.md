# Component Usage Rules

## 설치 방식
```bash
npx shadcn@latest add button card dialog input textarea label
```
- 컴포넌트는 `components/ui/` 폴더에 설치됨
- 필요한 컴포넌트만 설치 (전체 설치 금지)

## 주요 컴포넌트 사용

### Card (프로덕트 카드, 프로필 카드)
```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>내용</CardContent>
</Card>
```

### Dialog (수정/삭제 확인)
```tsx
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
    </DialogHeader>
    내용
  </DialogContent>
</Dialog>
```

### Button
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">기본</Button>
<Button variant="outline">외곽선</Button>
<Button variant="ghost">고스트</Button>
<Button variant="destructive">삭제</Button>
```

### Input / Textarea
```tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

<Input placeholder="입력..." />
<Textarea placeholder="내용..." rows={4} />
```

## 규칙
- shadcn/ui 컴포넌트 import 경로: `@/components/ui/...`
- 커스텀 스타일은 `className`으로 Tailwind 적용
- 컴포넌트 변형은 variant prop 사용, 직접 스타일 오버라이드 최소화
