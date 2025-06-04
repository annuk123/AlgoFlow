// convex/progress/getProgress.ts

import { query } from "../_generated/server"; //Correct import
import { v } from "convex/values";             //00 For validation

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
      // Convert problemId to the correct table's Id type (e.g., "leetcode")
      const leetcodeProblemId = ctx.db.normalizeId("problems", p.problemId);
      const problem = leetcodeProblemId ? await ctx.db.get(leetcodeProblemId) : null;
      return {
        ...p,
        problem,
      };
    })
  );

  return detailed;
},

});

