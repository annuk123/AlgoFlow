// convex/progress/getProgress.ts

import { query } from "../_generated/server"; // ✅ Correct import
import { v } from "convex/values";             // ✅ For validation

export const getProgress = query({
  args: {
    userId: v.string(),
  },
handler: async (ctx, args) => {
  const progress = await ctx.db
    .query("progress")
    .withIndex("by_user", (q) => q.eq("userId", args.userId))
    .collect();

  const detailed = await Promise.all(
    progress.map(async (p) => {
      const problem = await ctx.db.get(p.problemId);
      return {
        ...p,
        problem,
      };
    })
  );

  return detailed;
},

});

