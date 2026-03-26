import { WorkOS } from "@workos-inc/node";
import { NextResponse } from "next/server";

const workos = new WorkOS(process.env.WORKOS_API_KEY!);

export async function GET() {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    provider: "authkit",
    redirectUri: process.env.WORKOS_REDIRECT_URI!,
    clientId: process.env.WORKOS_CLIENT_ID!,
  });

  return NextResponse.redirect(authorizationUrl);
}