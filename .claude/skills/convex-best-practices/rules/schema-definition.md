# Schema Definition Rules

## 스키마 정의
- `convex/schema.ts`에서 `defineSchema`, `defineTable` 사용
- 모든 테이블은 명시적 타입 지정 (`v.string()`, `v.number()`, `v.boolean()` 등)
- optional 필드는 `v.optional(v.string())` 패턴 사용

## 이 프로젝트 테이블

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profile: defineTable({
    imageUrl: v.string(),
    introduction: v.string(),
    snsLinks: v.array(v.object({
      type: v.union(
        v.literal("threads"),
        v.literal("x"),
        v.literal("linkedin"),
        v.literal("github"),
        v.literal("email")
      ),
      url: v.string(),
    })),
  }),

  personalPages: defineTable({
    icon: v.string(),
    name: v.string(),
    url: v.string(),
    description: v.string(),
    order: v.number(),
  }),

  products: defineTable({
    imageUrl: v.string(),
    title: v.string(),
    description: v.string(),
    serviceUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("ended")),
    createdAt: v.number(),
  }),
});
```

## 규칙
- `_id`, `_creationTime`은 Convex가 자동 생성하므로 스키마에 포함하지 않음
- 배열/객체 중첩은 `v.array(v.object({...}))` 패턴
- union 타입은 `v.union(v.literal(...), ...)` 패턴
