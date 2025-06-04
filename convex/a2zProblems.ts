import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: get all problems
export const getA2ZProblems = query({
  handler: async (ctx) => {
    return await ctx.db.query("a2zProblems").order("asc").collect();
  },
});

// Mutation: seed problems (optional)
export const insertA2ZProblem = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    topic: v.string(),
    difficulty: v.union(v.literal("Easy"), v.literal("Medium"), v.literal("Hard")),
    description: v.string(),
    constraints: v.array(v.string()),
    sampleInput: v.string(),
    sampleOutput: v.string(),
    createdAt: v.number(),
    link: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("a2zProblems", {
      slug: args.slug,
      title: args.title,
      topic: args.topic,
      difficulty: args.difficulty,
      description: args.description,
      constraints: args.constraints,
      sampleInput: args.sampleInput,
      sampleOutput: args.sampleOutput,
      createdAt: args.createdAt,
      // link: args.link, // Remove this line if 'link' is not in the schema
      // order: args.order, // Remove this line if 'order' is not in the schema
    });
  },
});
