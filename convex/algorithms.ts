import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertAlgorithm = mutation({
  args: {
    name: v.string(),
    topic: v.string(),
    slug: v.string(),
    description: v.string(),
    isNew: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("algorithms", {
      name: args.name,
      topic: args.topic,
      slug: args.slug,
      description: args.description,
      isNew: args.isNew,
      createdAt: Date.now(),
    });
  },
});
