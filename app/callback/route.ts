import { WorkOS } from "@workos-inc/node";
import { NextRequest, NextResponse } from "next/server";
import {
  decryptSession,
  encryptSession,
  getClientIp,
  rateLimit,
  rateLimitResponse,
  secureStringEqual,
} from "@/lib/security";
import { normalizeEmail } from "@/lib/validation";

const workos = new WorkOS(process.env.WORKOS_API_KEY!);

export const runtime = "nodejs";

type AuthStateSession = {
  state?: unknown;
  expiresAt?: unknown;
};

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const result = rateLimit({
    key: `callback:${ip}`,
    limit: 12,
    windowMs: 60 * 60 * 1000,
  });

  if (!result.allowed) return rateLimitResponse(result);

  const globalDailyResult = rateLimit({
    key: "callback:global",
    limit: 100,
    windowMs: 24 * 60 * 60 * 1000,
  });

  if (!globalDailyResult.allowed) return rateLimitResponse(globalDailyResult);

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const authStateCookie = request.cookies.get("auth_state")?.value;
  const authState = authStateCookie
    ? decryptSession<AuthStateSession>(authStateCookie)
    : null;

  if (
    !code ||
    !state ||
    !authState ||
    typeof authState.state !== "string" ||
    typeof authState.expiresAt !== "number" ||
    authState.expiresAt <= Date.now() ||
    !secureStringEqual(authState.state, state)
  ) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("auth_state");
    return response;
  }

  const { user } = await workos.userManagement.authenticateWithCode({
    code,
    clientId: process.env.WORKOS_CLIENT_ID!,
  });

  const response = NextResponse.redirect(new URL("/blogs?subscribed=true", request.url));
  const maxAge = 60 * 60 * 24 * 7;
  const expiresAt = Date.now() + maxAge * 1000;
  const email = normalizeEmail(user.email);

  response.cookies.set(
    "user_session",
    encryptSession({
      email,
      initial: email.charAt(0).toUpperCase(),
      expiresAt,
    }),
    {
      httpOnly: true,
      maxAge,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  );
  response.cookies.delete("auth_state");
  response.cookies.delete("user_email");
  response.cookies.delete("is_signed_in");

  return response;
}
