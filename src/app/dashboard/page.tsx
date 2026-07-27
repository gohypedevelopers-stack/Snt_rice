"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dashboardGalleryImages } from "@/lib/site-data";

type Invoice = { id: string; invoiceDate: string; invoiceNumber: string; quantity: number; status: string };
type DashboardPayload = {
  user: { name: string; shopName: string; city: string };
  invoices: Invoice[];
  approvedBags: number;
  pendingCount: number;
  currentSlab: { level: string; target: number };
  nextSlab: { level: string; target: number } | null;
  redemptionOpen: boolean;
};

const actionItems = [
  { title: "Submit another invoice", status: "New", href: "/vendor/invoices", text: "Add invoice date, number, quantity, and proof." },
  { title: "Check reward eligibility", status: "Progress", href: "/vendor/milestones", text: "See the remaining approved bags for your next tier." },
  { title: "Contact helpdesk", status: "Support", href: "/vendor/helpdesk", text: "Raise a ticket if a submission or reward status looks wrong." }
];

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => setDashboard(data?.dashboard ?? null))
      .finally(() => setLoading(false));
  }, []);

  const approved = dashboard?.approvedBags ?? 0;
  const nextTarget = dashboard?.nextSlab?.target ?? Math.max(approved, 250);
  const progress = nextTarget ? Math.min(100, Math.round((approved / nextTarget) * 100)) : 0;
  const invoices = dashboard?.invoices ?? [];

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="container dashboard-hero__grid">
          <div className="dashboard-hero__copy">
            <div>
              <p className="dashboard-eyebrow">Retailer dashboard</p>
              <div className="dashboard-title-row">
                <div>
                  <h1>{dashboard?.user.name ?? "Your retailer workspace"}</h1>
                  <p>{dashboard ? `${dashboard.user.shopName}, ${dashboard.user.city}` : "Sign in to load your campaign account"}</p>
                </div>
                <span className="dashboard-live">{loading ? "Connecting" : dashboard ? "Active campaign" : "Sign in required"}</span>
              </div>
            </div>

            <div className="dashboard-kpis">
              <article className="dashboard-kpi"><p>Accepted quantity</p><strong>{approved} bags</strong><span>Approved from your invoices</span></article>
              <article className="dashboard-kpi"><p>Current slab</p><strong>{dashboard?.currentSlab.level ?? "-"}</strong><span>{dashboard?.nextSlab ? `${dashboard.nextSlab.target - approved} bags to next tier` : "Highest tier reached"}</span></article>
              <article className="dashboard-kpi"><p>Review queue</p><strong>{dashboard?.pendingCount ?? 0} items</strong><span>Waiting for admin review</span></article>
            </div>
            {!dashboard && !loading ? <div className="dashboard-login-callout"><strong>Your live account is waiting.</strong><span>Sign in with WhatsApp OTP to view and submit your own invoices.</span><Link href="/vendor/login" className="btn btn--dark">Sign in</Link></div> : null}
          </div>

          <aside className="dashboard-progress-card">
            <div className="dashboard-progress-card__media"><Image src={dashboardGalleryImages[0].src} alt={dashboardGalleryImages[0].alt} fill priority sizes="(max-width: 900px) 100vw, 34vw" /></div>
            <div className="dashboard-progress-card__content">
              <p className="dashboard-eyebrow">Live slab progress</p>
              <div className="dashboard-progress-card__top"><strong>{approved} / {nextTarget} bags</strong><span>{progress}%</span></div>
              <div className="dashboard-progress-bar" aria-label={`Progress toward ${nextTarget} bags`}><span style={{ width: `${progress}%` }} /></div>
              <p>{dashboard?.nextSlab ? `${dashboard.nextSlab.target - approved} approved bags remaining to reach ${dashboard.nextSlab.level}.` : "You are at the highest available reward tier."}</p>
            </div>
            <div className="dashboard-hero-strip"><div><span>Invoices</span><strong>{invoices.length}</strong></div><div><span>Pending review</span><strong>{dashboard?.pendingCount ?? 0}</strong></div><div><span>Gift state</span><strong>{dashboard?.redemptionOpen ? "Open" : "Locked"}</strong></div></div>
          </aside>
        </div>
      </section>

      <section className="dashboard-main">
        <div className="container dashboard-main__grid">
          <article className="dashboard-panel dashboard-panel--wide">
            <div className="dashboard-panel__head"><div><p className="dashboard-eyebrow">Recent activity</p><h2>Invoice submissions</h2></div><Link href="/vendor/invoices" className="btn btn--dark">New invoice</Link></div>
            <div className="dashboard-table-wrap"><table className="dashboard-table"><thead><tr><th>Date</th><th>Invoice</th><th>Qty</th><th>Status</th><th>Slab impact</th></tr></thead><tbody>{invoices.length ? invoices.map((row) => <tr key={row.id}><td>{new Date(row.invoiceDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td><td>{row.invoiceNumber}</td><td>{row.quantity} bags</td><td><span className={`status status--${row.status}`}>{row.status}</span></td><td>{row.status === "accepted" || row.status === "claimed" ? `+${row.quantity}` : "Review"}</td></tr>) : <tr><td colSpan={5}>{dashboard ? "No invoices submitted yet. Start with your first invoice." : "Sign in to see your private invoice history."}</td></tr>}</tbody></table></div>
          </article>

          <aside className="dashboard-panel"><div className="dashboard-panel__head dashboard-panel__head--stacked"><p className="dashboard-eyebrow">Next actions</p><h2>Keep progress moving</h2></div><div className="dashboard-action-list">{actionItems.map((item) => <Link href={item.href} className="dashboard-action" key={item.title}><div><h3>{item.title}</h3><p>{item.text}</p></div><span>{item.status}</span></Link>)}</div></aside>

          <article className="dashboard-panel dashboard-stock"><div><p className="dashboard-eyebrow">Stock visibility</p><h2>Campaign supply is moving through approved invoices.</h2></div><div className="dashboard-stock__images"><figure><Image src={dashboardGalleryImages[1].src} alt={dashboardGalleryImages[1].alt} fill sizes="50vw" /><figcaption>{dashboardGalleryImages[1].title}</figcaption></figure><figure><Image src={dashboardGalleryImages[2].src} alt={dashboardGalleryImages[2].alt} fill sizes="50vw" /><figcaption>{dashboardGalleryImages[2].title}</figcaption></figure></div></article>

          <article className="dashboard-panel dashboard-timeline"><div className="dashboard-panel__head dashboard-panel__head--stacked"><p className="dashboard-eyebrow">Review status</p><h2>Submission flow</h2></div><div className="dashboard-timeline__items"><div><span /><strong>Invoice captured</strong><p>Your account stores the invoice and proof file.</p></div><div><span /><strong>Admin review</strong><p>Pending entries are checked against invoice proof.</p></div><div><span /><strong>Reward updated</strong><p>Accepted quantity updates your live slab and redemption state.</p></div></div></article>
        </div>
      </section>
    </div>
  );
}
