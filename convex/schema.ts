import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  subscribers: defineTable({
    email: v.string(),
    workosUserId: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    subscribed: v.optional(v.boolean()),
    source: v.optional(v.union(v.literal("workos"), v.literal("website"))),
    subscribedAt: v.optional(v.number()),
  })
    .index("by_workosUserId", ["workosUserId"])
    .index("by_email", ["email"])
    .index("by_subscribed", ["subscribed"]),
  workosWebhookEvents: defineTable({
    eventId: v.string(),
    status: v.union(v.literal("processing"), v.literal("sent")),
    createdAt: v.number(),
    processedAt: v.optional(v.number()),
  }).index("by_event_id", ["eventId"]),
});
