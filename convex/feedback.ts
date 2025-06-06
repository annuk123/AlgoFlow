import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitFeedback = mutation({
  args: {
    name: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("feedback", {
      name: args.name,
      message: args.message,
      createdAt: Date.now(),
    });
  },
});

export const getAllFeedback = query({
  handler: async (ctx) => {
    return await ctx.db.query("feedback")
      .order("desc")
      .collect();
  },
});
