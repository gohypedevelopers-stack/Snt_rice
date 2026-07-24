import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth-server";
import { getDashboardData } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await requireUser("retailer");
  if (!user) return NextResponse.json({ error: "Sign in to view your dashboard." }, { status: 401 });
  return NextResponse.json({ ok: true, dashboard: getDashboardData(user.id) });
}
