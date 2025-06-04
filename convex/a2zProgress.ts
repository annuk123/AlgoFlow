// convex/a2zProgress.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveA2ZProgress = mutation({
  args: {
    userId: v.string(),
    problemId: v.id("a2zProblems"), // reference to a2zProblems table
    status: v.string(),
    completedAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("a2zProgress", {
      userId: args.userId,
      problemId: args.problemId,
      status: args.status as "solved" | "attempted",
      updatedAt: Date.now(),
    });
  },
});
