import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscribers")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    if (existing) return { success: true, message: "Already subscribed!" };
    await ctx.db.insert("subscribers", {
      email: args.email,
      subscribedAt: Date.now(),
    });
    return { success: true, message: "Subscribed!" };
  },
});

export const getSubscribers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("subscribers").collect();
  },
});