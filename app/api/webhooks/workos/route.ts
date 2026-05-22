import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { WorkOS, type Event } from "@workos-inc/node";

import { api } from "@/convex/_generated/api";
import {
  getClientIp,
  rateLimit,
  rateLimitResponse,
} from "@/lib/security";
import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { buildWelcomeEmail } from "@/lib/welcome-email";

export const runtime = "nodejs";

type Env = {
  appUrl: string;
  convexUrl: string;
  resendApiKey: string | null;
  resendDailyLimit: number;
  resendEnabled: boolean;
  resendFromEmail: string | null;
  workosApiKey: string;
  workosWebhookSecret: string;
};

type UserLike = {
  id?: unknown;
  email?: unknown;
  firstName?: unknown;
  first_name?: unknown;
  lastName?: unknown;
  last_name?: unknown;
  name?: unknown;
  fullName?: unknown;
  full_name?: unknown;
  displayName?: unknown;
  display_name?: unknown;
};

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

function getEnv(): Env | null {
  const {
    NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CONVEX_URL,
    RESEND_API_KEY,
    RESEND_DAILY_LIMIT,
    RESEND_ENABLED,
    RESEND_FROM_EMAIL,
    WORKOS_API_KEY,
    WORKOS_WEBHOOK_SECRET,
  } = process.env;

  if (
    !NEXT_PUBLIC_APP_URL ||
    !NEXT_PUBLIC_CONVEX_URL ||
    !WORKOS_API_KEY ||
    !WORKOS_WEBHOOK_SECRET
  ) {
    return null;
  }

  const resendEnabled = RESEND_ENABLED === "true";
  if (resendEnabled && (!RESEND_API_KEY || !RESEND_FROM_EMAIL)) {
    return null;
  }

  return {
    appUrl: NEXT_PUBLIC_APP_URL,
    convexUrl: NEXT_PUBLIC_CONVEX_URL,
    resendApiKey: RESEND_API_KEY ?? null,
    resendDailyLimit: Math.min(Number(RESEND_DAILY_LIMIT ?? "20") || 20, 99),
    resendEnabled,
    resendFromEmail: RESEND_FROM_EMAIL ?? null,
    workosApiKey: WORKOS_API_KEY,
    workosWebhookSecret: WORKOS_WEBHOOK_SECRET,
  };
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getUserName(user: UserLike) {
  const firstName = asString(user.firstName) ?? asString(user.first_name);
  const lastName = asString(user.lastName) ?? asString(user.last_name);
  const fullName =
    asString(user.fullName) ??
    asString(user.full_name) ??
    asString(user.displayName) ??
    asString(user.display_name) ??
    asString(user.name);

  if (fullName) return fullName;
  if (firstName && lastName) return `${firstName} ${lastName}`;

  return firstName;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit({
    key: `workos-webhook:${ip}`,
    limit: 60,
    windowMs: 60 * 1000,
  });

  if (!limit.allowed) return rateLimitResponse(limit);

  // WorkOS sends the signup webhook to this public route handler.
  const signature = request.headers.get("workos-signature");
  if (!signature) return json(400, { error: "Missing workos-signature header" });

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 64 * 1024) {
    return json(413, { error: "Webhook payload too large" });
  }

  const rawBody = await request.text();
  if (rawBody.length > 64 * 1024) {
    return json(413, { error: "Webhook payload too large" });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json(400, { error: "Invalid webhook payload" });
  }

  const env = getEnv();
  if (!env) return json(500, { error: "Missing required environment variables" });

  let event: Event;
  try {
    const workos = new WorkOS(env.workosApiKey);
    // The signature check proves this event came from WorkOS before we trust it.
    event = await workos.webhooks.constructEvent({
      payload,
      sigHeader: signature,
      secret: env.workosWebhookSecret,
    });
  } catch {
    return json(400, { error: "Invalid WorkOS webhook signature" });
  }

  // Only user.created saves a subscriber and sends the existing welcome email.
  if (event.event !== "user.created") {
    return json(200, { received: true, ignored: true });
  }

  const user = event.data as UserLike;
  const workosUserId = asString(user.id);
  const email = asString(user.email);
  const firstName = asString(user.firstName) ?? asString(user.first_name);
  const lastName = asString(user.lastName) ?? asString(user.last_name);

  if (!workosUserId) return json(400, { error: "Missing WorkOS user id" });
  if (!email) return json(400, { error: "Missing user email" });
  const normalizedEmail = normalizeEmail(email);
  if (!isValidEmail(normalizedEmail)) return json(400, { error: "Invalid user email" });

  const convex = new ConvexHttpClient(env.convexUrl);
  const reservation = await convex.mutation(api.workosWebhookEvents.reserve, {
    eventId: event.id,
    webhookSecret: env.workosWebhookSecret,
  });

  if (reservation.alreadyProcessed) {
    return json(200, { received: true, duplicate: true });
  }

  let shouldSendWelcomeEmail = false;

  try {
    // Once WorkOS proves the signup is real, store the contact in Convex.
    // The mutation updates an existing row when the user or email is already known.
    const subscriber = await convex.mutation(api.subscribers.upsertFromWorkOS, {
      webhookSecret: env.workosWebhookSecret,
      workosUserId,
      email: normalizedEmail,
      firstName: firstName ?? undefined,
      lastName: lastName ?? undefined,
      welcomeEmailDailyLimit: env.resendEnabled ? env.resendDailyLimit : 0,
    });
    shouldSendWelcomeEmail = env.resendEnabled && subscriber.sendWelcomeEmail;
  } catch (error) {
    await convex.mutation(api.workosWebhookEvents.release, {
      eventId: event.id,
      webhookSecret: env.workosWebhookSecret,
    });
    throw error;
  }

  const emailBody = buildWelcomeEmail({
    appUrl: env.appUrl,
    name: getUserName(user),
  });

  let emailSent = false;

  if (shouldSendWelcomeEmail) {
    if (!env.resendApiKey || !env.resendFromEmail) {
      return json(500, { error: "Missing Resend environment variables" });
    }

    const resend = new Resend(env.resendApiKey);

    try {
      // Resend sends the custom welcome email after the WorkOS signup event.
      const { error } = await resend.emails.send(
        {
          from: env.resendFromEmail,
          to: normalizedEmail,
          subject: "Welcome to adamressom.dev",
          html: emailBody.html,
          text: emailBody.text,
        },
        { idempotencyKey: event.id },
      );

      if (error) {
        console.error("Resend failed to send welcome email", error);
      } else {
        emailSent = true;
        await convex.mutation(api.subscribers.markWelcomeEmailSent, {
          webhookSecret: env.workosWebhookSecret,
          workosUserId,
        });
      }
    } catch (error) {
      console.error("Failed to send welcome email", error);
    }
  }

  await convex.mutation(api.workosWebhookEvents.markSent, {
    eventId: event.id,
    webhookSecret: env.workosWebhookSecret,
  });

  return json(200, { received: true, sent: emailSent });
}
