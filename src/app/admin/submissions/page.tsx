"use client";

import { useEffect, useState } from "react";

type AdminInvoice = {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  quantity: number;
  status: string;
  proofFileUrl?: string;
  user: { name: string; phone: string; shopName: string } | null;
};

export default function AdminSubmissionsPage() {
  const [invoices, setInvoices] = useState<AdminInvoice[]>([]);
  const [message, setMessage] = useState("");

  async function loadInvoices() {
    const response = await fetch("/api/invoices");
    const data = await response.json();
    setInvoices(data.invoices ?? []);
  }

  useEffect(() => {
    void fetch("/api/invoices")
      .then((response) => response.json())
      .then((data) => setInvoices(data.invoices ?? []));
  }, []);

  async function changeStatus(id: string, status: string) {
    const response = await fetch(`/api/invoices/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    const data = await response.json();
    if (!response.ok) { setMessage(data.error ?? "Could not update the invoice."); return; }
    setMessage(`Invoice marked ${status}.`);
    loadInvoices();
  }

  return <>
    <section className="admin-toolbar"><div><h1 className="admin-toolbar__title">Submissions</h1><p className="admin-toolbar__copy">Review live retailer invoices, inspect proof, and approve the quantity that powers rewards.</p></div><div className="admin-toolbar__actions"><span className="badge badge--gold">{invoices.length} in queue</span><span className="badge">Connected data</span></div></section>
    {message ? <p className="form-success admin-feedback">{message}</p> : null}
    <section className="admin-grid"><article className="admin-panel"><div className="admin-panel__title"><span className="section-heading__eyebrow">Moderation</span><h2>Invoice review queue</h2><p className="admin-panel__text">Accepting an invoice immediately recalculates the retailer dashboard and milestone position.</p></div><div className="table-wrap"><table className="data-table"><thead><tr><th>Retailer</th><th>Invoice</th><th>Qty</th><th>Status</th><th>Proof</th><th>Decision</th></tr></thead><tbody>{invoices.length ? invoices.map((row) => <tr key={row.id}><td><strong>{row.user?.name ?? "Unknown retailer"}</strong><br /><small>{row.user?.shopName ?? ""}</small></td><td>{row.invoiceNumber}<br /><small>{row.invoiceDate}</small></td><td>{row.quantity} bags</td><td><span className={`status status--${row.status}`}>{row.status}</span></td><td>{row.proofFileUrl ? <a href={row.proofFileUrl} target="_blank" rel="noreferrer" className="admin-proof-link">Open proof</a> : "Missing"}</td><td><div className="admin-row-actions"><button type="button" className="btn btn--small btn--dark" onClick={() => changeStatus(row.id, "accepted")}>Accept</button><button type="button" className="btn btn--small btn--light" onClick={() => changeStatus(row.id, "rejected")}>Reject</button></div></td></tr>) : <tr><td colSpan={6}>No retailer invoices have been submitted yet.</td></tr>}</tbody></table></div></article><article className="admin-panel"><div className="admin-panel__title"><span className="section-heading__eyebrow">Review policy</span><h2>Keep the reward total trustworthy.</h2><p className="admin-panel__text">Only accepted and claimed invoices contribute to a retailer&apos;s approved bag total. Rejected and pending records remain visible for audit.</p></div><div className="list-stack"><div className="list-item"><div className="list-item__top"><h3 className="list-item__title">Inspect the proof</h3><span className="badge badge--soft">Before accept</span></div><p className="list-item__text">Open the uploaded JPG, PNG, or PDF and match the invoice number and quantity.</p></div><div className="list-item"><div className="list-item__top"><h3 className="list-item__title">Make one clear decision</h3><span className="badge badge--soft">Live update</span></div><p className="list-item__text">The retailer sees the new status on the dashboard after the decision is saved.</p></div></div></article></section>
  </>;
}
