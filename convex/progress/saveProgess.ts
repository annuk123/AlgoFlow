import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const saveProgress = mutation({
  args: {
    userId: v.string(),
    problemId: v.id("problems"),
    status: v.string(),
    completedAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("progress", {
      userId: args.userId,
      problemId: args.problemId,
      status: args.status as "solved" | "attempted",
      updatedAt: Date.now(),
    });
  },
});
