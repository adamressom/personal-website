import { internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      if (!existing.subscribed) {
        const now = Date.now();
        await ctx.db.patch(existing._id, {
          createdAt: existing.createdAt ?? existing.subscribedAt ?? now,
          subscribed: true,
          updatedAt: now,
          source: existing.source ?? "website",
        });
      }

      return { success: true, message: "Already subscribed!" };
    }

    const now = Date.now();
    await ctx.db.insert("subscribers", {
      email: args.email,
      createdAt: now,
      updatedAt: now,
      subscribed: true,
      source: "website",
    });

    return { success: true, message: "Subscribed!" };
  },
});

export const upsertFromWorkOS = mutation({
  args: {
    workosUserId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // WorkOS user ids are the strongest duplicate check because they stay stable.
    const existingByWorkOSId = await ctx.db
      .query("subscribers")
      .withIndex("by_workosUserId", (q) => q.eq("workosUserId", args.workosUserId))
      .first();

    const existingByEmail = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    const existing = existingByWorkOSId ?? existingByEmail;
    const now = Date.now();

    if (existing) {
      // If the email was already on the list, attach the WorkOS identity instead
      // of creating a second subscriber row for the same person.
      await ctx.db.patch(existing._id, {
        workosUserId: args.workosUserId,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        createdAt: existing.createdAt ?? existing.subscribedAt ?? now,
        updatedAt: now,
        subscribed: true,
        source: "workos",
      });

      return { created: false };
    }

    await ctx.db.insert("subscribers", {
      workosUserId: args.workosUserId,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      createdAt: now,
      updatedAt: now,
      subscribed: true,
      source: "workos",
    });

    return { created: true };
  },
});

export const getSubscribers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("subscribers").collect();
  },
});

export const getSubscribedUsers = internalQuery({
  args: {},
  handler: async (ctx) => {
    // A future weekly-email job can reuse this without sending anything today.
    return await ctx.db
      .query("subscribers")
      .withIndex("by_subscribed", (q) => q.eq("subscribed", true))
      .collect();
  },
});
