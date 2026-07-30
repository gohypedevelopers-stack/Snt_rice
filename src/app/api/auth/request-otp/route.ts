import { NextResponse } from "next/server";
import { requestOtp } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { phone?: string };
  const phone = body.phone?.trim() ?? "";

  if (phone.length < 10) {
    return NextResponse.json({ error: "Enter a valid WhatsApp number." }, { status: 400 });
  }

  if (process.env.NODE_ENV === "production" && (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID)) {
    return NextResponse.json({ error: "WhatsApp OTP is not configured yet. Add the WhatsApp Business credentials on the server." }, { status: 503 });
  }

  const otp = await requestOtp(phone);
  if (process.env.NODE_ENV === "production") {
    const whatsappResponse = await fetch(`https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to: otp.phone.replace(/\D/g, ""), type: "text", text: { body: `Your SNT Rice verification code is ${otp.code}. It expires in 5 minutes.` } })
    });

    if (!whatsappResponse.ok) {
      return NextResponse.json({ error: "WhatsApp could not deliver the verification code. Try again shortly." }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true, phone: otp.phone, expiresInSeconds: otp.expiresInSeconds, devCode: otp.devCode });
}
