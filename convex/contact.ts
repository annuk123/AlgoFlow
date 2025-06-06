import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitContactMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contactMessages", {
      name: args.name,
      email: args.email,
      message: args.message,
      createdAt: Date.now(),
    });
  },
});
