import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const snsTypeValidator = v.union(
  v.literal("threads"),
  v.literal("x"),
  v.literal("linkedin"),
  v.literal("github"),
  v.literal("email")
);

export const pageIconValidator = v.union(
  v.literal("youtube"),
  v.literal("blog"),
  v.literal("website"),
  v.literal("newsletter"),
  v.literal("podcast"),
  v.literal("store"),
  v.literal("other")
);

export const productStatusValidator = v.union(
  v.literal("active"),
  v.literal("ended")
);

export const productTypeValidator = v.union(
  v.literal("web"),
  v.literal("app"),
  v.literal("toss-inapp"),
  v.literal("desktop")
);

export default defineSchema({
  profile: defineTable({
    imageUrl: v.string(),
    introduction: v.string(),
    snsLinks: v.array(
      v.object({
        type: snsTypeValidator,
        url: v.string(),
      })
    ),
  }),

  personalPages: defineTable({
    icon: pageIconValidator,
    name: v.string(),
    url: v.string(),
    description: v.string(),
    order: v.number(),
    thumbnailUrl: v.optional(v.string()),
  }).index("by_order", ["order"]),

  products: defineTable({
    imageUrl: v.string(),
    title: v.string(),
    description: v.string(),
    techDescription: v.optional(v.string()),
    serviceUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    status: productStatusValidator,
    type: v.optional(productTypeValidator),
  }),
});
