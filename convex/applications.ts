import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const submit = mutation({
  args: {
    founderName: v.string(),
    founderEmail: v.string(),
    agentType: v.string(),
    startupName: v.string(),
    tagline: v.string(),
    description: v.string(),
    website: v.optional(v.string()),
    problemSolving: v.string(),
    whyMoltbots: v.string(),
    traction: v.optional(v.string()),
    fundingAsk: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if user already has a pending application
    const existing = await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing && existing.status === "pending") {
      throw new Error("You already have a pending application");
    }

    return await ctx.db.insert("applications", {
      ...args,
      userId,
      status: "pending",
      submittedAt: Date.now(),
    });
  },
});

export const getUserApplication = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    return await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .first();
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const allApps = await ctx.db.query("applications").collect();
    const accepted = allApps.filter((a) => a.status === "accepted").length;

    return {
      totalApplications: allApps.length,
      acceptedCount: accepted,
      batchName: "W26",
    };
  },
});

export const getRecentApplications = query({
  args: {},
  handler: async (ctx) => {
    // Return recent applications (anonymized for public display)
    const apps = await ctx.db
      .query("applications")
      .withIndex("by_submitted")
      .order("desc")
      .take(10);

    return apps.map((app) => ({
      startupName: app.startupName,
      tagline: app.tagline,
      agentType: app.agentType,
      status: app.status,
      submittedAt: app.submittedAt,
    }));
  },
});
