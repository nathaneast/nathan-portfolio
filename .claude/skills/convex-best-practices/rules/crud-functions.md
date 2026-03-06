# CRUD Functions Rules

## 함수 종류
- `query`: 읽기 전용, 자동 캐싱/실시간 업데이트
- `mutation`: DB 쓰기, 트랜잭션 보장
- `action`: 외부 API 호출 등 부수효과가 있는 작업

## 패턴

```typescript
// convex/profile.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("profile").first();
  },
});

export const update = mutation({
  args: {
    imageUrl: v.string(),
    introduction: v.string(),
    snsLinks: v.array(v.object({
      type: v.string(),
      url: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("profile").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("profile", args);
    }
  },
});
```

## 규칙
- 함수 파일은 테이블 단위로 분리 (`convex/profile.ts`, `convex/products.ts` 등)
- `args`에 반드시 validator 지정 (타입 안전성)
- query 함수는 `.first()`, `.collect()`, `.take(n)` 등으로 결과 반환
- pagination은 `.paginate(opts)` 사용
- 정렬은 `.order("desc")` 또는 `.order("asc")`
- 인덱스 활용: `.withIndex("by_field", (q) => q.eq("field", value))`
