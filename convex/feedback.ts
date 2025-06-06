import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitFeedback = mutation({
  args: {
    name: v.string(),
    message: v.string(),
    rating: v.number(),  // Add rating argument as number (1 to 5)
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("feedback", {
      name: args.name,
      message: args.message,
      rating: args.rating,           // Store rating in the DB
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
