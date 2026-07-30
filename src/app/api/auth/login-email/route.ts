import { NextResponse } from "next/server";
import { createSession, loginWithEmailPassword } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await loginWithEmailPassword({ email, password });
    const token = await createSession(user.id);

    const response = NextResponse.json({ ok: true, user });
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
      { error: error instanceof Error ? error.message : "Invalid email or password." },
      { status: 401 }
    );
  }
}
