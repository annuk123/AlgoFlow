// convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"; // Corrected import path for 'v'

export default defineSchema({
  // Table: progress tracking
  progress: defineTable({
    userId: v.string(),          // Local random ID stored in browser
    problemId: v.string(),        // ID of the problem (from your problems JSON)
    status: v.string(),           // "completed" | "incomplete" (you can extend later)
    completedAt: v.number(),      // Timestamp when user completed the problem
  })
    .index("by_user", ["userId"])        // For fetching all progress by user
    .index("by_user_problem", ["userId", "problemId"]), // For checking specific problem status
});
