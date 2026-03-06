import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { pageIconValidator } from "./schema";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("personalPages")
      .withIndex("by_order")
      .order("asc")
      .collect();
  },
});

export const create = mutation({
  args: {
    icon: pageIconValidator,
    name: v.string(),
    url: v.string(),
    description: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("personalPages", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("personalPages"),
    icon: v.optional(pageIconValidator),
    name: v.optional(v.string()),
    url: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: {
    id: v.id("personalPages"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
