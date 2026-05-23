import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decryptSession } from "@/lib/security";

type UserSession = {
  email?: unknown;
  initial?: unknown;
  expiresAt?: unknown;
};

export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get("user_session")?.value;
  const session = encryptedSession
    ? decryptSession<UserSession>(encryptedSession)
    : null;

  if (
    !session ||
    typeof session.initial !== "string" ||
    typeof session.expiresAt !== "number" ||
    session.expiresAt <= Date.now()
  ) {
    return NextResponse.json(
      { signedIn: false, initial: null },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    {
      signedIn: true,
      initial: session.initial.slice(0, 1),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
