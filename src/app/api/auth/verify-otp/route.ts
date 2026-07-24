import { NextResponse } from "next/server";
import { createSession, findOrCreateRetailer, verifyOtp } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    phone?: string;
    code?: string;
    name?: string;
    shopName?: string;
    city?: string;
  };
  const phone = body.phone?.trim() ?? "";
  const code = body.code?.trim() ?? "";

  if (!verifyOtp(phone, code)) {
    return NextResponse.json({ error: "That OTP is invalid or expired." }, { status: 400 });
  }

  const user = findOrCreateRetailer({
    phone,
    name: body.name ?? "",
    shopName: body.shopName ?? "",
    city: body.city ?? ""
  });
  const response = NextResponse.json({ ok: true, user });
  response.cookies.set("snt_session", createSession(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60,
    path: "/"
  });
  return response;
}
