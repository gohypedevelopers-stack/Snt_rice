"use client";

import { useEffect, useState } from "react";

type Retailer = { id: string; name: string; phone: string; shopName: string; city: string; currentSlab: string; approvedBags: number; invoiceCount: number };

export default function AdminRegistrationsPage() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  useEffect(() => { fetch("/api/retailers").then((response) => response.json()).then((data) => setRetailers(data.retailers ?? [])); }, []);

  return <>
    <section className="admin-toolbar"><div><h1 className="admin-toolbar__title">Retailers</h1><p className="admin-toolbar__copy">Every verified WhatsApp account appears here with its live approved quantity and reward position.</p></div><div className="admin-toolbar__actions"><span className="badge badge--gold">{retailers.length} retailers</span><span className="badge">Live account data</span></div></section>
    <section className="admin-panel"><div className="admin-panel__title"><span className="section-heading__eyebrow">Verified accounts</span><h2>Campaign participants</h2><p className="admin-panel__text">Retailers are created automatically after their first successful OTP verification.</p></div><div className="table-wrap"><table className="data-table"><thead><tr><th>Retailer</th><th>Shop</th><th>City</th><th>Approved bags</th><th>Slab</th><th>Invoices</th></tr></thead><tbody>{retailers.length ? retailers.map((row) => <tr key={row.id}><td><strong>{row.name}</strong><br /><small>{row.phone}</small></td><td>{row.shopName}</td><td>{row.city}</td><td>{row.approvedBags}</td><td>{row.currentSlab}</td><td>{row.invoiceCount}</td></tr>) : <tr><td colSpan={6}>No retailer accounts yet. The next verified login will appear here.</td></tr>}</tbody></table></div></section>
  </>;
}
