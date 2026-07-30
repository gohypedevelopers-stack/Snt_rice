import { NextResponse } from "next/server";
import { createSession, registerWithEmailPassword } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      name?: string;
      phone?: string;
      shopName?: string;
      city?: string;
    };

    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";
    const name = body.name?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const shopName = body.shopName?.trim() ?? "";
    const city = body.city?.trim() ?? "";

    if (!email || !password || !name || !phone || !shopName || !city) {
      return NextResponse.json({ error: "All registration fields are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
    }

    const user = await registerWithEmailPassword({ email, password, name, phone, shopName, city });
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
      { error: error instanceof Error ? error.message : "Registration failed. Please try again." },
      { status: 400 }
    );
  }
}
