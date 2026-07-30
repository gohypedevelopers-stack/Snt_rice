import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSession, findOrCreateGoogleRetailer } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = (await cookies()).get("snt_google_state")?.value;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? url.origin;

  if (!code || !state || !savedState || state !== savedState || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return NextResponse.redirect(new URL("/vendor/login?error=google_not_configured", request.url));
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code, client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, redirect_uri: `${appUrl}/api/auth/google/callback`, grant_type: "authorization_code" })
  });
  if (!tokenResponse.ok) return NextResponse.redirect(new URL("/vendor/login?error=google_failed", request.url));

  const tokenData = (await tokenResponse.json()) as { access_token?: string };
  if (!tokenData.access_token) return NextResponse.redirect(new URL("/vendor/login?error=google_failed", request.url));

  const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${tokenData.access_token}` } });
  if (!profileResponse.ok) return NextResponse.redirect(new URL("/vendor/login?error=google_failed", request.url));
  const profile = (await profileResponse.json()) as { email?: string; name?: string };
  if (!profile.email) return NextResponse.redirect(new URL("/vendor/login?error=google_failed", request.url));

  const user = await findOrCreateGoogleRetailer({ email: profile.email, name: profile.name ?? "" });
  const token = await createSession(user.id);
  const response = NextResponse.redirect(new URL("/vendor/dashboard", request.url));
  response.cookies.set("snt_session", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 30 * 24 * 60 * 60, path: "/" });
  response.cookies.set("snt_google_state", "", { expires: new Date(0), path: "/" });
  return response;
}
