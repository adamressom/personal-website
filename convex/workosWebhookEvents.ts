import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const reserve = mutation({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("workosWebhookEvents")
      .withIndex("by_event_id", (q) => q.eq("eventId", args.eventId))
      .first();

    if (existing) return { alreadyProcessed: true };

    await ctx.db.insert("workosWebhookEvents", {
      eventId: args.eventId,
      status: "processing",
      createdAt: Date.now(),
    });

    return { alreadyProcessed: false };
  },
});

export const markSent = mutation({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("workosWebhookEvents")
      .withIndex("by_event_id", (q) => q.eq("eventId", args.eventId))
      .first();

    if (!existing) return;

    await ctx.db.patch(existing._id, {
      status: "sent",
      processedAt: Date.now(),
    });
  },
});

export const release = mutation({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("workosWebhookEvents")
      .withIndex("by_event_id", (q) => q.eq("eventId", args.eventId))
      .first();

    if (!existing || existing.status === "sent") return;

    await ctx.db.delete(existing._id);
  },
});
