import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  subscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
  }),
  workosWebhookEvents: defineTable({
    eventId: v.string(),
    status: v.union(v.literal("processing"), v.literal("sent")),
    createdAt: v.number(),
    processedAt: v.optional(v.number()),
  }).index("by_event_id", ["eventId"]),
});
