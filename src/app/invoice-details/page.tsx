"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { invoiceGalleryImages } from "@/lib/site-data";

const checklist = [
  "Keep the invoice number unique for each submission.",
  "Use the exact date printed on the physical commercial bill.",
  "Enter the correct total quantity of SNT Rice bags.",
  "Upload a clear bill image or PDF (JPG, PNG, PDF up to 8 MB)."
];

export default function InvoiceDetailsPage() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  async function submitInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/invoices", { method: "POST", body: form });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setMessage(data.error ?? "We could not submit this invoice. Please check the details.");
      return;
    }

    setMessage("✅ Invoice submitted successfully! It is now queued for admin review.");
    setFileName(null);
    event.currentTarget.reset();
  }

  return (
    <div className="v2-dashboard-page">
      {/* Top Header Banner */}
      <section className="v2-dash-hero">
        <div className="container">
          <div className="v2-dash-hero__head">
            <div>
              <span className="v2-badge">
                <span className="badge-dot" /> Invoice Intake Portal
              </span>
              <h1>Submit Invoice Proof</h1>
              <p className="v2-subtitle">
                Upload your commercial bill details to credit approved bag quantities toward your campaign reward tier.
              </p>
            </div>

            <div className="v2-dash-hero__right">
              <Link href="/vendor/dashboard" className="btn btn--outline-ecom">
                ← Back to Dashboard
              </Link>
              <Link href="/vendor/helpdesk" className="btn btn--ghost-ecom">
                Need Help? 🎧
              </Link>
            </div>
          </div>

          {/* Intake Process Steps */}
          <div className="v2-dash-kpi-grid">
            <div className="v2-kpi-card v2-kpi-card--green">
              <div className="v2-kpi-top">
                <span>Step 01</span>
                <span className="v2-kpi-icon">📝</span>
              </div>
              <strong>Bill Details</strong>
              <small>Enter date, invoice number & bag count</small>
            </div>

            <div className="v2-kpi-card v2-kpi-card--gold">
              <div className="v2-kpi-top">
                <span>Step 02</span>
                <span className="v2-kpi-icon">📎</span>
              </div>
              <strong>Upload Proof</strong>
              <small>Attach clear photo or PDF of the invoice</small>
            </div>

            <div className="v2-kpi-card">
              <div className="v2-kpi-top">
                <span>Step 03</span>
                <span className="v2-kpi-icon">🔍</span>
              </div>
              <strong>Admin Review</strong>
              <small>Fast verification within 24-48 hours</small>
            </div>

            <div className="v2-kpi-card">
              <div className="v2-kpi-top">
                <span>Step 04</span>
                <span className="v2-kpi-icon">🏆</span>
              </div>
              <strong>Reward Credit</strong>
              <small>Approved bags automatically add to slab total</small>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Guidelines Section */}
      <section className="v2-dash-section">
        <div className="container v2-dash-grid">
          {/* Form Left Column */}
          <div className="v2-dash-main-col">
            <div className="v2-panel">
              <div className="v2-panel__head">
                <div>
                  <span className="v2-panel-eyebrow">Form Intake</span>
                  <h2>Invoice Submission Form</h2>
                </div>
                <span className="v2-status-chip v2-status-chip--accepted">
                  Draft Intake
                </span>
              </div>

              <form onSubmit={submitInvoice} className="v2-form-grid-layout">
                <div className="v2-field-row">
                  <div className="v2-field">
                    <label htmlFor="invoice-date">Invoice Date *</label>
                    <input
                      id="invoice-date"
                      name="invoiceDate"
                      type="date"
                      defaultValue="2026-07-23"
                      required
                    />
                  </div>

                  <div className="v2-field">
                    <label htmlFor="invoice-number">Invoice Number *</label>
                    <input
                      id="invoice-number"
                      name="invoiceNumber"
                      type="text"
                      placeholder="e.g. SNT-INV-9821"
                      required
                    />
                  </div>
                </div>

                <div className="v2-field-row">
                  <div className="v2-field">
                    <label htmlFor="quantity">SNT Bag Quantity *</label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      placeholder="Total bags purchased"
                      required
                    />
                  </div>

                  <div className="v2-field">
                    <label htmlFor="shop">Shop / Retail Outlet Reference *</label>
                    <input
                      id="shop"
                      name="shopReference"
                      type="text"
                      placeholder="Your shop or enterprise name"
                      required
                    />
                  </div>
                </div>

                <div className="v2-field">
                  <label htmlFor="proof">Upload Invoice Proof (Photo / PDF) *</label>
                  <div className="v2-file-upload-box">
                    <input
                      id="proof"
                      name="proof"
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setFileName(file ? file.name : null);
                      }}
                      required
                    />
                    <div className="upload-box-content">
                      <span className="upload-icon">📄</span>
                      <div>
                        <strong>{fileName ? fileName : "Click to select or drag invoice file"}</strong>
                        <p>JPG, PNG or PDF format up to 8 MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="v2-field">
                  <label htmlFor="notes">Notes for Admin Review (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Add distributor name or batch details if applicable..."
                  />
                </div>

                {message && (
                  <div className={message.startsWith("✅") ? "v2-form-success" : "v2-form-error"}>
                    {message}
                  </div>
                )}

                <div className="v2-form-actions">
                  <button type="submit" className="btn btn--primary-ecom" disabled={busy}>
                    {busy ? "Submitting Invoice..." : "Submit Invoice for Review →"}
                  </button>
                  <Link href="/vendor/dashboard" className="btn btn--ghost-ecom">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Guidelines Right Sidebar Column */}
          <div className="v2-dash-side-col">
            <div className="v2-panel">
              <div className="v2-panel__head v2-panel__head--stacked">
                <span className="v2-panel-eyebrow">Submission Standard</span>
                <h2>Verification Checklist</h2>
              </div>

              <div className="v2-checklist-items">
                {checklist.map((item, index) => (
                  <div className="v2-check-item" key={item}>
                    <span className="check-num">0{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="v2-info-callout">
                <strong>📌 What happens next?</strong>
                <p>
                  Your invoice enters the verification queue. Admin approves quantity after matching bill proof, and approved bags are automatically added to your reward tier total.
                </p>
              </div>
            </div>

            {/* Verification Visual Card */}
            <div className="v2-panel v2-visual-card">
              <div className="v2-visual-media">
                <Image
                  src={invoiceGalleryImages[0].src}
                  alt={invoiceGalleryImages[0].alt}
                  fill
                  sizes="30vw"
                  className="v2-visual-img"
                />
                <div className="v2-visual-overlay" />
                <span className="v2-visual-badge">🔒 Secure Audit</span>
              </div>
              <div className="v2-visual-content">
                <h4>Commercial Proof Audit</h4>
                <p>Verification team cross-checks invoice numbers against distributor billing records.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

