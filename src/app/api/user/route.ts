import { NextResponse } from "next/server";
import { getAccessTokenCookie } from "@/lib/auth/session";
import { fetchCurrentUser } from "@/lib/auth/functions";

export async function GET() {
  const accessToken = await getAccessTokenCookie();
  if (!accessToken) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const user = await fetchCurrentUser(accessToken);
  if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  return NextResponse.json({ user });
}
