"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { invoiceGalleryImages } from "@/lib/site-data";

const checklist = [
  "Keep the invoice number unique for each submission.",
  "Use the date printed on the physical bill.",
  "Enter the exact SNT Rice bag quantity.",
  "Attach a clear JPG, PNG, or PDF for review."
];

export default function InvoiceDetailsPage() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submitInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/invoices", { method: "POST", body: form });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setMessage(data.error ?? "We could not submit this invoice.");
      return;
    }

    setMessage("Invoice submitted. It is now waiting for admin review.");
    event.currentTarget.reset();
  }

  return (
    <div className="invoice-page">
      <section className="invoice-hero">
        <div className="container invoice-hero__grid">
          <div className="invoice-hero__copy">
            <p className="invoice-eyebrow">Retailer workspace / Invoice intake</p>
            <h1>Submit the proof that moves your reward total forward.</h1>
            <p>Enter the commercial details once, attach the bill, and leave the SNT Rice review team a clean record to approve.</p>
            <div className="invoice-hero__meta"><span>Secure account flow</span><span>Admin review required</span><span>Up to 8 MB proof</span></div>
            <div className="invoice-hero__actions"><Link href="/dashboard" className="btn btn--dark">Back to dashboard</Link><Link href="/helpdesk" className="btn btn--light">Need help?</Link></div>
            <div className="invoice-summary"><div><strong>01</strong><span>Invoice record</span></div><div><strong>02</strong><span>Proof attachment</span></div><div><strong>03</strong><span>Admin decision</span></div></div>
          </div>

          <div className="invoice-hero__visual">
            <figure className="invoice-photo invoice-photo--main"><Image src={invoiceGalleryImages[0].src} alt={invoiceGalleryImages[0].alt} fill priority sizes="(max-width: 900px) 100vw, 52vw" /></figure>
            <figure className="invoice-photo"><Image src={invoiceGalleryImages[1].src} alt={invoiceGalleryImages[1].alt} fill sizes="(max-width: 900px) 50vw, 20vw" /><figcaption>{invoiceGalleryImages[1].title}</figcaption></figure>
            <figure className="invoice-photo"><Image src={invoiceGalleryImages[2].src} alt={invoiceGalleryImages[2].alt} fill sizes="(max-width: 900px) 50vw, 20vw" /><figcaption>{invoiceGalleryImages[2].title}</figcaption></figure>
            <div className="invoice-status-card"><span>Submission state</span><strong>Review-ready intake</strong><p>Every field is linked to your retailer account.</p></div>
          </div>
        </div>
      </section>

      <section className="invoice-main">
        <div className="container invoice-main__grid">
          <article className="invoice-panel invoice-panel--form">
            <div className="invoice-panel__head"><div><p className="invoice-eyebrow">New submission</p><h2>Invoice details</h2></div><span className="status status--draft">Draft</span></div>
            <form onSubmit={submitInvoice} className="invoice-form">
              <div className="invoice-form__grid">
                <div className="field"><label htmlFor="invoice-date">Invoice date</label><input id="invoice-date" name="invoiceDate" type="date" defaultValue="2026-07-23" required /></div>
                <div className="field"><label htmlFor="invoice-number">Invoice number</label><input id="invoice-number" name="invoiceNumber" type="text" placeholder="INV-0000" required /></div>
                <div className="field"><label htmlFor="quantity">Quantity / bags</label><input id="quantity" name="quantity" type="number" min="1" placeholder="0" required /></div>
                <div className="field"><label htmlFor="shop">Shop reference</label><input id="shop" name="shopReference" type="text" placeholder="Retail outlet name" required /></div>
              </div>
              <div className="field"><label htmlFor="proof">Invoice proof</label><input id="proof" name="proof" type="file" accept="image/jpeg,image/png,application/pdf" required /><small className="field-help">Use a readable photo or PDF. Maximum size: 8 MB.</small></div>
              <div className="field"><label htmlFor="notes">Notes for review</label><textarea id="notes" name="notes" rows={4} placeholder="Optional support notes or clarification" /></div>
              {message ? <p className={message.startsWith("Invoice submitted") ? "form-success" : "form-error"}>{message}</p> : null}
              <div className="invoice-form__actions"><button type="submit" className="btn btn--dark" disabled={busy}>{busy ? "Submitting..." : "Submit for review"}</button><Link href="/dashboard" className="btn btn--light">Cancel</Link></div>
            </form>
          </article>

          <aside className="invoice-panel invoice-panel--checks"><div className="invoice-panel__head invoice-panel__head--stacked"><p className="invoice-eyebrow">Submission standard</p><h2>Four checks before you send</h2></div><div className="invoice-check-list">{checklist.map((item, index) => <div className="invoice-check" key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div><div className="invoice-note"><strong>What happens next</strong><p>Your invoice starts as pending. An admin can accept or reject it, and only accepted quantity contributes to your reward slab.</p></div></aside>
        </div>
      </section>
    </div>
  );
}
