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

  const verifiedPhone = await verifyOtp(phone, code);
  if (!verifiedPhone) {
    return NextResponse.json({ error: "That OTP is invalid or expired." }, { status: 400 });
  }

  const user = await findOrCreateRetailer({
    phone,
    name: body.name ?? "",
    shopName: body.shopName ?? "",
    city: body.city ?? ""
  });
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
}
