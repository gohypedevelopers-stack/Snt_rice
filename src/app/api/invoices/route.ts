import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth-server";
import { createInvoice, getAllInvoices, getInvoicesForUser } from "@/lib/server-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireUser("admin");
  if (admin) return NextResponse.json({ ok: true, invoices: await getAllInvoices() });

  const retailer = await requireUser("retailer");
  if (!retailer) return NextResponse.json({ error: "Sign in to view invoices." }, { status: 401 });
  return NextResponse.json({ ok: true, invoices: await getInvoicesForUser(retailer.id) });
}

export async function POST(request: Request) {
  const user = await requireUser("retailer");
  if (!user) return NextResponse.json({ error: "Sign in before submitting an invoice." }, { status: 401 });

  const formData = await request.formData();
  const invoiceDate = String(formData.get("invoiceDate") ?? "").trim();
  const invoiceNumber = String(formData.get("invoiceNumber") ?? "").trim();
  const quantity = Number(formData.get("quantity") ?? 0);
  const shopReference = String(formData.get("shopReference") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const proof = formData.get("proof");

  if (!invoiceDate || !invoiceNumber || !Number.isInteger(quantity) || quantity < 1 || !shopReference) {
    return NextResponse.json({ error: "Invoice date, number, quantity, and shop reference are required." }, { status: 400 });
  }

  let proofFileName: string | undefined;
  let proofFileUrl: string | undefined;
  if (proof instanceof File && proof.size > 0) {
    if (proof.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Invoice proof must be smaller than 8 MB." }, { status: 400 });
    }

    const safeName = proof.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    proofFileName = proof.name;
    proofFileUrl = `/uploads/${crypto.randomUUID()}-${safeName}`;
    const uploadPath = path.join(process.cwd(), "public", proofFileUrl.replace(/^\//, ""));
    await fs.mkdir(path.dirname(uploadPath), { recursive: true });
    await fs.writeFile(uploadPath, Buffer.from(await proof.arrayBuffer()));
  }

  const invoice = await createInvoice({
    userId: user.id,
    invoiceDate,
    invoiceNumber,
    quantity,
    shopReference,
    notes,
    proofFileName,
    proofFileUrl
  });

  return NextResponse.json({ ok: true, invoice }, { status: 201 });
}
