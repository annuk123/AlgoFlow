import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Insert a solution
export const insertSolution = mutation({
  args: {
    problemId: v.id("problems"),
    language: v.string(),
    code: v.string(),
    explanation: v.string(), // Required explanation field
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("solutions", {
      problemId: args.problemId,
      language: args.language,
      code: args.code,
      explanation: args.explanation,
      createdAt: args.createdAt,
    });
  },
});

// Get all solutions for a problem
export const getSolutionsByProblemId = query({
  args: { problemId: v.id("problems") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("solutions")
      .filter((q) => q.eq(q.field("problemId"), args.problemId))
      .collect();
  },
});

// Get solution by problemId and language
export const getSolutionByLanguage = query({
  args: {
    problemId: v.id("problems"),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("solutions")
      .filter((q) =>
        q.and(
          q.eq(q.field("problemId"), args.problemId),
          q.eq(q.field("language"), args.language)
        )
      )
      .first();
  },
});

// Update solution code and explanation
export const updateSolution = mutation({
  args: {
    solutionId: v.id("solutions"),
    newCode: v.string(),
    newExplanation: v.string(), // Add explanation update
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.solutionId, {
      code: args.newCode,
      explanation: args.newExplanation,
    });
  },
});

export const deleteSolutionsByProblemId = mutation({
  args: { problemId: v.id("problems") },
  handler: async (ctx, args) => {
    const solutions = await ctx.db
      .query("solutions")
      .filter((q) => q.eq(q.field("problemId"), args.problemId))
      .collect();

    for (const solution of solutions) {
      await ctx.db.delete(solution._id);
    }
  },
});

