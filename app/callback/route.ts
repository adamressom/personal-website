import { WorkOS } from "@workos-inc/node";
import { NextRequest, NextResponse } from "next/server";

const workos = new WorkOS(process.env.WORKOS_API_KEY!);

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) return NextResponse.redirect(new URL("/", request.url));

  const { user } = await workos.userManagement.authenticateWithCode({
    code,
    clientId: process.env.WORKOS_CLIENT_ID!,
  });

  const response = NextResponse.redirect(new URL("/blog?subscribed=true", request.url));
  
  // httpOnly for security
  response.cookies.set("user_email", user.email, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
  
  // readable by JS so frontend can check sign in status
  response.cookies.set("is_signed_in", "true", { httpOnly: false, maxAge: 60 * 60 * 24 * 7 });

  return response;
}