// // convex/progress/saveProgress.ts

// import { mutation } from "../_generated/server"; 
//  // ✅ Correct import now
// import { v } from "convex/values";

// export const saveProgress = mutation({
//   args: {
//     userId: v.string(),
//     problemId: v.string(),
//     status: v.string(),
//     completedAt: v.number(),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("progress", {
//       userId: args.userId,
//       problemId: args.problemId,
//       status: args.status,
//       completedAt: args.completedAt,
//     });
//   },
// });


import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const saveProgress = mutation({
  args: {
    userId: v.string(),
    problemId: v.string(),
    status: v.string(),
    completedAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("progress", args);
  },
});
