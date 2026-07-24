import { NextResponse } from "next/server";
import { createSession, getOrCreateAdmin } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { secret?: string };
  const adminKey = process.env.SNT_ADMIN_KEY ?? "SNT@2026";

  if (body.secret !== adminKey) {
    return NextResponse.json({ error: "The admin key is not correct." }, { status: 401 });
  }

  const admin = getOrCreateAdmin();
  const response = NextResponse.json({ ok: true, user: admin });
  response.cookies.set("snt_session", createSession(admin.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60,
    path: "/"
  });
  return response;
}
