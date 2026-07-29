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
  { icon: "🧾", title: "Submit new invoice", status: "Action Needed", href: "/vendor/invoices", text: "Upload bill photo, invoice date, number, and quantity bags." },
  { icon: "🎯", title: "View milestone slabs", status: "In Progress", href: "/vendor/milestones", text: "Check your remaining bag target to unlock the next reward tier." },
  { icon: "🎁", title: "Claim unlocked gift", status: "Status Check", href: "/vendor/redeem", text: "Review eligible rewards and check global campaign claim availability." },
  { icon: "💬", title: "Retailer helpdesk", status: "24/7 Support", href: "/vendor/helpdesk", text: "Raise questions directly with the campaign management team." }
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
    <div className="v2-dashboard-page">
      {/* Top Header Section */}
      <section className="v2-dash-hero">
        <div className="container">
          <div className="v2-dash-hero__head">
            <div>
              <span className="v2-badge">
                <span className="badge-dot" /> Retailer Dashboard
              </span>
              <h1>{dashboard?.user.name ?? "SNT Retailer Workspace"}</h1>
              <p className="v2-subtitle">
                {dashboard ? `📍 ${dashboard.user.shopName} • ${dashboard.user.city}` : "Sign in to access your live account and invoice tracking."}
              </p>
            </div>

            <div className="v2-dash-hero__right">
              <span className={dashboard ? "v2-status-pill v2-status-pill--active" : "v2-status-pill"}>
                {loading ? "⚡ Syncing Account..." : dashboard ? "✓ Active Account" : "🔒 Sign In Required"}
              </span>
              <Link href="/vendor/invoices" className="btn btn--primary-ecom">
                Submit New Invoice +
              </Link>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="v2-dash-kpi-grid">
            <div className="v2-kpi-card v2-kpi-card--green">
              <div className="v2-kpi-top">
                <span>Accepted Volume</span>
                <span className="v2-kpi-icon">📦</span>
              </div>
              <strong>{approved} Bags</strong>
              <small>Verified across approved invoices</small>
            </div>

            <div className="v2-kpi-card v2-kpi-card--gold">
              <div className="v2-kpi-top">
                <span>Active Slab Tier</span>
                <span className="v2-kpi-icon">🏆</span>
              </div>
              <strong>{dashboard?.currentSlab.level ?? "Level 1"}</strong>
              <small>{dashboard?.nextSlab ? `${dashboard.nextSlab.target - approved} bags to ${dashboard.nextSlab.level}` : "Top tier reached!"}</small>
            </div>

            <div className="v2-kpi-card">
              <div className="v2-kpi-top">
                <span>In Review</span>
                <span className="v2-kpi-icon">⏳</span>
              </div>
              <strong>{dashboard?.pendingCount ?? 0} Invoices</strong>
              <small>Pending campaign admin verification</small>
            </div>

            <div className="v2-kpi-card">
              <div className="v2-kpi-top">
                <span>Redemption Window</span>
                <span className="v2-kpi-icon">🎁</span>
              </div>
              <strong>{dashboard?.redemptionOpen ? "Unlocked" : "Campaign Ready"}</strong>
              <small>{dashboard?.redemptionOpen ? "Select unlocked slab gift" : "Unlocks at redemption phase"}</small>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar & Actions Grid */}
      <section className="v2-dash-section">
        <div className="container v2-dash-grid">
          {/* Main Left Column */}
          <div className="v2-dash-main-col">
            {/* Progress Meter Panel */}
            <div className="v2-panel v2-progress-panel">
              <div className="v2-panel__head">
                <div>
                  <span className="v2-panel-eyebrow">Tier Progress</span>
                  <h2>Campaign Reward Milestone Meter</h2>
                </div>
                <span className="progress-percent-chip">{progress}% Achieved</span>
              </div>

              <div className="v2-meter-wrap">
                <div className="v2-meter-bar">
                  <div className="v2-meter-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="v2-meter-labels">
                  <span>Current: <strong>{approved} Bags</strong></span>
                  <span>Target: <strong>{nextTarget} Bags ({dashboard?.nextSlab?.level ?? "Max Slab"})</strong></span>
                </div>
              </div>

              <p className="v2-meter-note">
                {dashboard?.nextSlab
                  ? `💡 Submit ${dashboard.nextSlab.target - approved} more approved bags to unlock ${dashboard.nextSlab.level} rewards!`
                  : "🎉 Congratulations! You have reached the top reward slab for this campaign period."}
              </p>
            </div>

            {/* Invoices Table Panel */}
            <div className="v2-panel">
              <div className="v2-panel__head">
                <div>
                  <span className="v2-panel-eyebrow">Submission Log</span>
                  <h2>Recent Invoices</h2>
                </div>
                <Link href="/vendor/invoices" className="btn btn--outline-ecom btn--sm">
                  View All Submissions →
                </Link>
              </div>

              <div className="v2-table-wrap">
                <table className="v2-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Invoice No.</th>
                      <th>Quantity</th>
                      <th>Review Status</th>
                      <th>Volume Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.length > 0 ? (
                      invoices.map((row) => (
                        <tr key={row.id}>
                          <td>{new Date(row.invoiceDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                          <td><strong>{row.invoiceNumber}</strong></td>
                          <td>{row.quantity} bags</td>
                          <td>
                            <span className={`v2-status-chip v2-status-chip--${row.status}`}>
                              {row.status}
                            </span>
                          </td>
                          <td>
                            <strong className="v2-credit-text">
                              {row.status === "accepted" || row.status === "claimed" ? `+${row.quantity} Bags` : "Pending"}
                            </strong>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="empty-table-cell">
                          {dashboard ? "No invoices submitted yet. Click 'Submit New Invoice' to add your first bill!" : "Please sign in to view your submission history."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="v2-dash-side-col">
            {/* Quick Action Navigation */}
            <div className="v2-panel">
              <div className="v2-panel__head v2-panel__head--stacked">
                <span className="v2-panel-eyebrow">Retailer Actions</span>
                <h2>Quick Shortcuts</h2>
              </div>

              <div className="v2-action-list">
                {actionItems.map((item) => (
                  <Link href={item.href} key={item.title} className="v2-action-card">
                    <span className="action-icon">{item.icon}</span>
                    <div className="action-info">
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                    <span className="action-tag">{item.status}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Campaign Visual Showcase Card */}
            <div className="v2-panel v2-visual-card">
              <div className="v2-visual-media">
                <Image src={dashboardGalleryImages[0].src} alt={dashboardGalleryImages[0].alt} fill sizes="30vw" className="v2-visual-img" />
                <div className="v2-visual-overlay" />
                <span className="v2-visual-badge">🌾 Dispatch Verified</span>
              </div>
              <div className="v2-visual-content">
                <h4>Stock Dispatch & Verification</h4>
                <p>All submitted bags are cross-checked against authorized distributor supply batches.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

