import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { productStatusValidator } from "./schema";

export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getById = query({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    imageUrl: v.string(),
    title: v.string(),
    description: v.string(),
    techDescription: v.optional(v.string()),
    serviceUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    status: productStatusValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    imageUrl: v.optional(v.string()),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    techDescription: v.optional(v.string()),
    serviceUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    status: v.optional(productStatusValidator),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
