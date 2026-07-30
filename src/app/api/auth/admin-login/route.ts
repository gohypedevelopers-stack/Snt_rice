import { NextResponse } from "next/server";
import { createSession, loginAdminWithKeyOrCredentials } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { secret?: string; email?: string; password?: string };
    const admin = await loginAdminWithKeyOrCredentials(body);

    const token = await createSession(admin.id);
    const response = NextResponse.json({ ok: true, user: admin });
    response.cookies.set("snt_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60,
      path: "/"
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "The credentials or admin key are incorrect." },
      { status: 401 }
    );
  }
}
