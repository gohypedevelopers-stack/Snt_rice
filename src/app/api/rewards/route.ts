import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth-server";
import { getRewards, updateRewards, type RewardSlab } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, rewards: await getRewards() });
}

export async function PUT(request: Request) {
  const admin = await requireUser("admin");
  if (!admin) return NextResponse.json({ error: "Admin access is required." }, { status: 403 });

  const body = (await request.json()) as { rewardSlabs?: RewardSlab[]; redemptionOpen?: boolean };
  if (body.rewardSlabs && (!Array.isArray(body.rewardSlabs) || body.rewardSlabs.some((slab) => slab.target < 1 || !slab.level || !slab.gift))) {
    return NextResponse.json({ error: "Every reward tier needs a level, target, and gift." }, { status: 400 });
  }

  const rewards = await updateRewards(body);
  return NextResponse.json({ ok: true, rewards });
}
