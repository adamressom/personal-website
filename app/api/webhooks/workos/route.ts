import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { WorkOS, type Event } from "@workos-inc/node";

import { api } from "@/convex/_generated/api";

export const runtime = "nodejs";

type Env = {
  appUrl: string;
  convexUrl: string;
  resendApiKey: string;
  resendFromEmail: string;
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
    RESEND_FROM_EMAIL,
    WORKOS_API_KEY,
    WORKOS_WEBHOOK_SECRET,
  } = process.env;

  if (
    !NEXT_PUBLIC_APP_URL ||
    !NEXT_PUBLIC_CONVEX_URL ||
    !RESEND_API_KEY ||
    !RESEND_FROM_EMAIL ||
    !WORKOS_API_KEY ||
    !WORKOS_WEBHOOK_SECRET
  ) {
    return null;
  }

  return {
    appUrl: NEXT_PUBLIC_APP_URL,
    convexUrl: NEXT_PUBLIC_CONVEX_URL,
    resendApiKey: RESEND_API_KEY,
    resendFromEmail: RESEND_FROM_EMAIL,
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildWelcomeEmail({ appUrl, name }: { appUrl: string; name: string | null }) {
  const baseUrl = appUrl.replace(/\/$/, "");
  const safeUrl = escapeHtml(baseUrl);
  const textGreeting = name ? `Hi ${name},` : "Hi there,";
  const htmlGreeting = name ? `Hi ${escapeHtml(name)},` : "Hi there,";
  const headline = name ? `Welcome, ${escapeHtml(name.split(" ")[0])}.` : "Welcome in.";

  return {
    text: [
      textGreeting,
      "",
      "Thanks for signing up for adamressom.dev. I am glad you are here.",
      "You can head back to the site whenever you are ready:",
      baseUrl,
      "",
      "If you did not create this account, you can ignore this email.",
    ].join("\n"),
    html: `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#eef4ec;color:#20221f;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      Thanks for signing up for adamressom.dev.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef4ec;margin:0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#fbfaf3;border:1px solid #d4ded2;border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(57,70,61,0.08);">
            <tr>
              <td style="padding:28px 24px 10px;text-align:center;">
                <div style="display:inline-block;border:1px solid #d4ded2;border-radius:999px;background:#eef4ec;padding:7px 12px;color:#386f8f;font-size:10px;line-height:14px;letter-spacing:1.8px;text-transform:uppercase;font-family:Consolas,'SFMono-Regular',monospace;">
                  operation adamressom.dev
                </div>
                <h1 style="margin:24px 0 0;color:#20221f;font-size:30px;line-height:36px;font-weight:700;letter-spacing:0;">
                  ${headline}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 28px 4px;">
                <p style="margin:0 0 16px;color:#4f5b53;font-size:15px;line-height:26px;">
                  ${htmlGreeting}
                </p>
                <p style="margin:0;color:#4f5b53;font-size:15px;line-height:26px;">
                  Thanks for signing up for adamressom.dev. I build practical web tools and share notes on projects, systems, and the things I am learning along the way. Glad to have you here.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:28px 28px 12px;">
                <a href="${safeUrl}" style="display:inline-block;background:#20221f;color:#fbfaf3;text-decoration:none;border-radius:999px;padding:13px 22px;font-size:13px;line-height:18px;font-weight:700;">
                  Open adamressom.dev
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 24px;text-align:center;">
                <p style="margin:0;color:#667069;font-size:12px;line-height:20px;">
                  Button not working? Open this link:<br>
                  <a href="${safeUrl}" style="color:#386f8f;text-decoration:underline;word-break:break-all;">${safeUrl}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#eef4ec;border-top:1px solid #d4ded2;padding:18px 24px;text-align:center;">
                <p style="margin:0;color:#667069;font-size:12px;line-height:20px;">
                  If you did not create this account, you can ignore this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}

export async function POST(request: Request) {
  // WorkOS sends the signup webhook to this public route handler.
  const signature = request.headers.get("workos-signature");
  if (!signature) return json(400, { error: "Missing workos-signature header" });

  const rawBody = await request.text();

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

  const convex = new ConvexHttpClient(env.convexUrl);
  const reservation = await convex.mutation(api.workosWebhookEvents.reserve, {
    eventId: event.id,
  });

  if (reservation.alreadyProcessed) {
    return json(200, { received: true, duplicate: true });
  }

  // Once WorkOS proves the signup is real, store the contact in Convex.
  // The mutation updates an existing row when the user or email is already known.
  await convex.mutation(api.subscribers.upsertFromWorkOS, {
    workosUserId,
    email,
    firstName: firstName ?? undefined,
    lastName: lastName ?? undefined,
  });

  const resend = new Resend(env.resendApiKey);
  const emailBody = buildWelcomeEmail({
    appUrl: env.appUrl,
    name: getUserName(user),
  });

  let emailSent = false;

  try {
    // Resend sends the custom welcome email after the WorkOS signup event.
    const { error } = await resend.emails.send(
      {
        from: env.resendFromEmail,
        to: email,
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
    }
  } catch (error) {
    console.error("Failed to send welcome email", error);
  }

  await convex.mutation(api.workosWebhookEvents.markSent, { eventId: event.id });

  return json(200, { received: true, sent: emailSent });
}
