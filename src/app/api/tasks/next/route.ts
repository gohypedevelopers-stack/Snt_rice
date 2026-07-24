import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channel = searchParams.get("channel") ?? "default";

  return NextResponse.json({
    ok: true,
    channel,
    task: null,
    message: "No task is currently available."
  });
}
