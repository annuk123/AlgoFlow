import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"; // Corrected import path for 'v'

export default defineSchema({
problems: defineTable({
  slug: v.string(),
  title: v.string(),
  topic: v.array(v.string()),
  explanation: v.optional(v.string()),
  tags: v.array(v.string()),
  difficulty: v.union(
    v.literal("Easy"),
    v.literal("Medium"),
    v.literal("Hard")
  ),
  description: v.string(),
  constraints: v.array(v.string()),

sampleInput: v.any(),
sampleOutput: v.any(),

  createdAt: v.number(),
})
.index("by_slug", ["slug"]),

  progress: defineTable({
    userId: v.string(),
    problemId: v.id("problems"), // ✅ references the problems table
    status: v.union(v.literal("solved"), v.literal("attempted")),
    updatedAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_problem", ["problemId"]),

    a2zProblems: defineTable({
    slug: v.string(), // ✅ custom unique slug
    title: v.string(),
    topic: v.string(),
    difficulty: v.union(v.literal("Easy"), v.literal("Medium"), v.literal("Hard")),
    description: v.string(),
    constraints: v.array(v.string()),
    sampleInput: v.string(),
    sampleOutput: v.string(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  a2zProgress: defineTable({
  userId: v.string(),
  problemId: v.id("a2zProblems"), // references A2Z problem
  status: v.union(v.literal("solved"), v.literal("attempted")),
  updatedAt: v.number(),
}).index("by_user", ["userId"])
  .index("by_problem", ["problemId"]),

  feedback: defineTable({
    name: v.string(),
    message: v.string(),
    rating: v.number(), 
    createdAt: v.number(),
  }),

  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),

    algorithms: defineTable({
    name: v.string(),
    topic: v.string(),
    slug: v.string(),
    description: v.string(),
    isNew: v.boolean(),
    createdAt: v.number(),
  }),
solutions: defineTable({
 problemId: v.id("problems"), // 🔗 Foreign key reference
    language: v.string(),        // e.g. JavaScript, Python
    explanation: v.optional(v.string()), // Optional explanation
    code: v.string(),         // Solution code
    createdAt: v.number(),    // Timestamp
  }),

testCases: defineTable({
  input: v.string(),
  expectedOutput: v.string(),
})


})
