import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertProblem = mutation({
  args: {
    slug: v.string(), // ✅ renamed // ✅ Custom slugified ID
    title: v.string(),
    topic: v.string(),
    difficulty: v.union(v.literal("Easy"), v.literal("Medium"), v.literal("Hard")),
    description: v.string(),
    constraints: v.array(v.string()),
    sampleInput: v.string(),
    sampleOutput: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    // Optional: prevent duplicates
    const problemId = ctx.db.normalizeId("problems", args.slug);
    const existing = problemId ? await ctx.db.get(problemId) : null;

    if (existing) {
      throw new Error(`Problem with slug "${args.slug}" already exists.`);
    }

    await ctx.db.insert("problems", args);
  },
});
