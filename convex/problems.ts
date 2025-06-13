import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ✅ Insert Problem
export const insertProblem = mutation({
  args: {
    slug: v.string(), // slug stored as a field, not as ID
    title: v.string(),
    topic: v.string(),
    explanation: v.string(),
    tags: v.array(v.string()),
    difficulty: v.union(v.literal("Easy"), v.literal("Medium"), v.literal("Hard")),
    description: v.string(),
    constraints: v.array(v.string()),
    sampleInput: v.object({ nums: v.array(v.number()), target: v.number() }),
    sampleOutput: v.array(v.number()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    // ✅ Prevent duplicates by checking if slug exists
    const existing = await ctx.db
      .query("problems")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (existing) {
      throw new Error(`Problem with slug "${args.slug}" already exists.`);
    }

    await ctx.db.insert("problems", args);
  },
});

// ✅ Get Problem By Slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("problems")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
  },
});

export const getProblemBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const problem = await ctx.db.query('problems').filter((q) => q.eq(q.field('slug'), args.slug)).first();
    return problem;
  },
});


export const setExplanation = mutation({
  args: { problemId: v.id("problems"), explanation: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.problemId, { explanation: args.explanation });
  },
});