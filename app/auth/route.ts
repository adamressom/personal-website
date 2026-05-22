import { WorkOS } from "@workos-inc/node";
import { NextResponse } from "next/server";
import {
  createAuthState,
  encryptSession,
  getClientIp,
  rateLimit,
  rateLimitResponse,
} from "@/lib/security";

const workos = new WorkOS(process.env.WORKOS_API_KEY!);

export const runtime = "nodejs";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const result = rateLimit({
    key: `auth:${ip}`,
    limit: 8,
    windowMs: 60 * 60 * 1000,
  });

  if (!result.allowed) return rateLimitResponse(result);

  const globalDailyResult = rateLimit({
    key: "auth:global",
    limit: 100,
    windowMs: 24 * 60 * 60 * 1000,
  });

  if (!globalDailyResult.allowed) return rateLimitResponse(globalDailyResult);

  const state = createAuthState();
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    provider: "authkit",
    redirectUri: process.env.WORKOS_REDIRECT_URI!,
    clientId: process.env.WORKOS_CLIENT_ID!,
    state,
  });

  const response = NextResponse.redirect(authorizationUrl);
  response.cookies.set(
    "auth_state",
    encryptSession({
      state,
      expiresAt: Date.now() + 10 * 60 * 1000,
    }),
    {
      httpOnly: true,
      maxAge: 10 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/callback",
    },
  );

  return response;
}
