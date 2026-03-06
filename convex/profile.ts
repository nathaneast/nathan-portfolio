import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { snsTypeValidator } from "./schema";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("profile").first();
  },
});

export const upsert = mutation({
  args: {
    imageUrl: v.optional(v.string()),
    introduction: v.optional(v.string()),
    snsLinks: v.optional(
      v.array(
        v.object({
          type: snsTypeValidator,
          url: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("profile").first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("profile", {
      imageUrl: args.imageUrl ?? "",
      introduction: args.introduction ?? "",
      snsLinks: args.snsLinks ?? [],
    });
  },
});
