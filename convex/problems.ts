import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ✅ Insert Problem
export const insertProblem = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    topic: v.array(v.string()),
    explanation: v.string(),
    tags: v.array(v.string()),
    difficulty: v.union(v.literal("Easy"), v.literal("Medium"), v.literal("Hard")),
    description: v.string(),
    constraints: v.array(v.string()),
    sampleInput: v.any(), // Fully flexible input
    sampleOutput: v.any(), // Fully flexible output
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    // Prevent duplicates by checking if slug exists
    const existing = await ctx.db
      .query("problems")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (existing) {
      throw new Error(`Problem with slug "${args.slug}" already exists.`);
    }

    // Insert directly (Convex handles complex types natively)
    await ctx.db.insert("problems", {
      ...args,
    });
  },
});

// ✅ Unified Get Problem By Slug
export const getProblemBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const problem = await ctx.db
      .query("problems")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    return problem || null;
  },
});

// ✅ Set Explanation
export const setExplanation = mutation({
  args: { problemId: v.id("problems"), explanation: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.problemId, { explanation: args.explanation });
  },
});
