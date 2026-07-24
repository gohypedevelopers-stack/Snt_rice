import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserBySession } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = (await cookies()).get("snt_session")?.value;
  const user = getUserBySession(token);
  return NextResponse.json({ authenticated: Boolean(user), user });
}
