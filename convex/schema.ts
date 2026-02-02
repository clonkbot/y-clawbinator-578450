import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  applications: defineTable({
    // Founder info
    founderName: v.string(),
    founderEmail: v.string(),
    agentType: v.string(), // Type of AI agent

    // Startup info
    startupName: v.string(),
    tagline: v.string(),
    description: v.string(),
    website: v.optional(v.string()),

    // Application specifics
    problemSolving: v.string(),
    whyMoltbots: v.string(),
    traction: v.optional(v.string()),
    fundingAsk: v.string(),

    // Meta
    userId: v.id("users"),
    status: v.string(), // "pending" | "reviewing" | "accepted" | "rejected"
    submittedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_submitted", ["submittedAt"]),

  stats: defineTable({
    totalApplications: v.number(),
    acceptedCount: v.number(),
    batchName: v.string(),
  }),
});
