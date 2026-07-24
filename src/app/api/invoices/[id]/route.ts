import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth-server";
import { updateInvoiceStatus, type InvoiceStatus } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireUser("admin");
    if (!admin) return NextResponse.json({ error: "Admin access is required." }, { status: 403 });

    const { id } = await context.params;
    const body = (await request.json()) as { status?: InvoiceStatus };
    if (!body.status || !["pending", "accepted", "rejected", "claimed"].includes(body.status)) {
      return NextResponse.json({ error: "Choose a valid invoice status." }, { status: 400 });
    }

    const invoice = updateInvoiceStatus(id, body.status);
    if (!invoice) return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
    return NextResponse.json({ ok: true, invoice });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not update invoice." }, { status: 500 });
  }
}
