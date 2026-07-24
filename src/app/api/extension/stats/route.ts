import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    stats: {
      tasksCompleted: 0,
      tasksAvailable: 0,
      lastSyncAt: null
    }
  });
}
