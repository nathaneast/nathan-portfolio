# File Storage Rules

## 업로드 플로우
1. 클라이언트에서 `generateUploadUrl` mutation 호출 → presigned URL 획득
2. presigned URL로 파일 POST 업로드 → storageId 반환
3. storageId를 DB에 저장

## 구현 패턴

```typescript
// convex/files.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getImageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
```

```typescript
// 클라이언트 업로드
const generateUploadUrl = useMutation(api.files.generateUploadUrl);

async function handleUpload(file: File) {
  const postUrl = await generateUploadUrl();
  const result = await fetch(postUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  const { storageId } = await result.json();
  // storageId를 DB에 저장하는 mutation 호출
}
```

## 이미지 URL 사용
- DB에는 storageId(`Id<"_storage">`)를 저장
- 표시 시 `ctx.storage.getUrl(storageId)`로 URL 생성
- 또는 imageUrl 필드에 직접 URL 문자열을 저장하는 방식도 가능 (이 프로젝트에서는 URL 문자열 저장)

## 규칙
- 파일 크기 제한은 클라이언트에서 검증 (이미지 최대 5MB 권장)
- 허용 타입: image/jpeg, image/png, image/webp, image/gif
