import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth-server";
import { getRetailers } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireUser("admin");
  if (!admin) return NextResponse.json({ error: "Admin access is required." }, { status: 403 });
  return NextResponse.json({ ok: true, retailers: getRetailers() });
}
