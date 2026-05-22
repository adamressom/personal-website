import { internalQuery, mutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { v } from "convex/values";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DAY_MS = 24 * 60 * 60 * 1000;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function assertValidEmail(email: string) {
  if (
    email.length < 3 ||
    email.length > 254 ||
    email.includes("\n") ||
    email.includes("\r") ||
    !EMAIL_PATTERN.test(email)
  ) {
    throw new Error("Please enter a valid email address.");
  }
}

function requireWebhookSecret(webhookSecret: string) {
  const expectedSecret = process.env.WORKOS_WEBHOOK_SECRET;
  if (!expectedSecret || webhookSecret !== expectedSecret) {
    throw new Error("Unauthorized webhook mutation.");
  }
}

async function checkRateLimit(
  ctx: MutationCtx,
  key: string,
  limit: number,
  windowMs: number,
) {
  const now = Date.now();
  const existing = await ctx.db
    .query("rateLimits")
    .withIndex("by_key", (q) => q.eq("key", key))
    .first();

  if (!existing || existing.resetAt <= now) {
    if (existing) {
      await ctx.db.patch(existing._id, {
        count: 1,
        resetAt: now + windowMs,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("rateLimits", {
        key,
        count: 1,
        resetAt: now + windowMs,
        createdAt: now,
        updatedAt: now,
      });
    }

    return;
  }

  if (existing.count >= limit) {
    throw new Error("Too many requests. Please try again later.");
  }

  await ctx.db.patch(existing._id, {
    count: existing.count + 1,
    updatedAt: now,
  });
}

async function tryCheckRateLimit(
  ctx: MutationCtx,
  key: string,
  limit: number,
  windowMs: number,
) {
  try {
    await checkRateLimit(ctx, key, limit, windowMs);
    return true;
  } catch {
    return false;
  }
}

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    assertValidEmail(email);

    await checkRateLimit(ctx, "subscribe:global", 50, DAY_MS);
    await checkRateLimit(ctx, `subscribe:email:${email}`, 3, DAY_MS);

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
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
      email,
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
    webhookSecret: v.string(),
    workosUserId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    welcomeEmailDailyLimit: v.number(),
  },
  handler: async (ctx, args) => {
    requireWebhookSecret(args.webhookSecret);

    const email = normalizeEmail(args.email);
    assertValidEmail(email);
    const welcomeEmailDailyLimit = Math.max(
      0,
      Math.min(Math.floor(args.welcomeEmailDailyLimit), 99),
    );

    // WorkOS user ids are the strongest duplicate check because they stay stable.
    const existingByWorkOSId = await ctx.db
      .query("subscribers")
      .withIndex("by_workosUserId", (q) => q.eq("workosUserId", args.workosUserId))
      .first();

    const existingByEmail = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    const existing = existingByWorkOSId ?? existingByEmail;
    const now = Date.now();

    if (existing) {
      const emailSendCount = existing.emailSendCount ?? 0;
      const canSendWelcomeEmail =
        !existing.welcomeEmailSentAt &&
        !existing.welcomeEmailReservedAt &&
        emailSendCount < 1;
      const shouldSendWelcomeEmail =
        canSendWelcomeEmail &&
        welcomeEmailDailyLimit > 0 &&
        (await tryCheckRateLimit(
          ctx,
          "resend:welcome-email:global",
          welcomeEmailDailyLimit,
          DAY_MS,
        ));

      // If the email was already on the list, attach the WorkOS identity instead
      // of creating a second subscriber row for the same person.
      await ctx.db.patch(existing._id, {
        workosUserId: args.workosUserId,
        email,
        firstName: args.firstName,
        lastName: args.lastName,
        createdAt: existing.createdAt ?? existing.subscribedAt ?? now,
        updatedAt: now,
        subscribed: true,
        source: "workos",
        welcomeEmailReservedAt: shouldSendWelcomeEmail
          ? now
          : existing.welcomeEmailReservedAt,
      });

      return { created: false, sendWelcomeEmail: shouldSendWelcomeEmail };
    }

    const sendWelcomeEmail =
      welcomeEmailDailyLimit > 0 &&
      (await tryCheckRateLimit(
        ctx,
        "resend:welcome-email:global",
        welcomeEmailDailyLimit,
        DAY_MS,
      ));

    await ctx.db.insert("subscribers", {
      workosUserId: args.workosUserId,
      email,
      firstName: args.firstName,
      lastName: args.lastName,
      createdAt: now,
      updatedAt: now,
      subscribed: true,
      source: "workos",
      welcomeEmailReservedAt: sendWelcomeEmail ? now : undefined,
      emailSendCount: 0,
    });

    return { created: true, sendWelcomeEmail };
  },
});

export const markWelcomeEmailSent = mutation({
  args: {
    webhookSecret: v.string(),
    workosUserId: v.string(),
  },
  handler: async (ctx, args) => {
    requireWebhookSecret(args.webhookSecret);

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_workosUserId", (q) => q.eq("workosUserId", args.workosUserId))
      .first();

    if (!existing) return;

    await ctx.db.patch(existing._id, {
      welcomeEmailSentAt: Date.now(),
      emailSendCount: (existing.emailSendCount ?? 0) + 1,
      updatedAt: Date.now(),
    });
  },
});

export const getSubscribers = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("subscribers").take(100);
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
