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
  { title: "Submit Invoice Proof", href: "/vendor/invoices", text: "Upload bill photo, date, number, and quantity." },
  { title: "Reward Milestones", href: "/vendor/milestones", text: "Track remaining bags needed for the next slab level." },
  { title: "Claim Reward", href: "/vendor/redeem", text: "Review eligible rewards and campaign redemption status." },
  { title: "Support Helpdesk", href: "/vendor/helpdesk", text: "Contact the SNT support team for account assistance." }
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
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "2rem 0", color: "#1e293b" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* Top Header Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "1.75rem 2rem",
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}
        >
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#1f5a43", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
              Retailer Workspace
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
              {dashboard?.user.name ?? "SNT Partner Dashboard"}
            </h1>
            <div style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "0.25rem" }}>
              {dashboard ? `${dashboard.user.shopName} • ${dashboard.user.city}` : "Sign in to manage invoices and reward progress."}
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                padding: "0.4rem 0.85rem",
                borderRadius: "6px",
                background: loading ? "#f1f5f9" : dashboard ? "#f0fdf4" : "#fef2f2",
                color: loading ? "#64748b" : dashboard ? "#166534" : "#991b1b",
                border: loading ? "1px solid #cbd5e1" : dashboard ? "1px solid #bbf7d0" : "1px solid #fecaca"
              }}
            >
              {loading ? "Syncing..." : dashboard ? "Verified Account" : "Sign In Required"}
            </span>

            <Link
              href="/vendor/invoices"
              style={{
                background: "#1f5a43",
                color: "#ffffff",
                padding: "0.6rem 1.25rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: "600",
                textDecoration: "none"
              }}
            >
              Submit Invoice +
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Accepted Volume</div>
            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1f5a43", margin: "0.35rem 0" }}>{approved} Bags</div>
            <div style={{ fontSize: "0.775rem", color: "#94a3b8" }}>Verified across approved invoices</div>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Current Reward Slab</div>
            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#0f172a", margin: "0.35rem 0" }}>
              {dashboard?.currentSlab.level ?? "Level 1"}
            </div>
            <div style={{ fontSize: "0.775rem", color: "#94a3b8" }}>
              {dashboard?.nextSlab ? `${dashboard.nextSlab.target - approved} bags to ${dashboard.nextSlab.level}` : "Top tier reached"}
            </div>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>In Review</div>
            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#0f172a", margin: "0.35rem 0" }}>
              {dashboard?.pendingCount ?? 0} Invoices
            </div>
            <div style={{ fontSize: "0.775rem", color: "#94a3b8" }}>Pending admin verification</div>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Redemption Status</div>
            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: dashboard?.redemptionOpen ? "#1f5a43" : "#475569", margin: "0.35rem 0" }}>
              {dashboard?.redemptionOpen ? "Open" : "Locked"}
            </div>
            <div style={{ fontSize: "0.775rem", color: "#94a3b8" }}>
              {dashboard?.redemptionOpen ? "Eligible gifts ready to claim" : "Unlocks at redemption window"}
            </div>
          </div>
        </div>

        {/* Main Grid: Left Column & Right Sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: "1.5rem" }}>
          
          {/* Main Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Reward Progress Meter */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>Campaign Reward Progress</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Progress toward next slab target</div>
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1f5a43" }}>{progress}%</div>
              </div>

              <div style={{ background: "#f1f5f9", borderRadius: "999px", height: "10px", overflow: "hidden", marginBottom: "0.85rem" }}>
                <div style={{ background: "#1f5a43", height: "100%", width: `${progress}%`, borderRadius: "999px", transition: "width 0.4s ease" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#64748b" }}>
                <span>Approved: <strong style={{ color: "#0f172a" }}>{approved} Bags</strong></span>
                <span>Next Target: <strong style={{ color: "#0f172a" }}>{nextTarget} Bags ({dashboard?.nextSlab?.level ?? "Max Slab"})</strong></span>
              </div>
            </div>

            {/* Invoices Log Table */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>Submitted Invoices</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Recent bill entries and verification status</div>
                </div>
                <Link href="/vendor/invoices" style={{ fontSize: "0.8rem", fontWeight: "600", color: "#1f5a43", textDecoration: "none" }}>
                  View All Submissions →
                </Link>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <th style={{ padding: "0.75rem 1rem" }}>Date</th>
                      <th style={{ padding: "0.75rem 1rem" }}>Invoice No.</th>
                      <th style={{ padding: "0.75rem 1rem" }}>Quantity</th>
                      <th style={{ padding: "0.75rem 1rem" }}>Status</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.length > 0 ? (
                      invoices.map((row) => (
                        <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "0.85rem 1rem", color: "#64748b" }}>
                            {new Date(row.invoiceDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                          <td style={{ padding: "0.85rem 1rem", fontWeight: "600", color: "#0f172a" }}>
                            {row.invoiceNumber}
                          </td>
                          <td style={{ padding: "0.85rem 1rem", color: "#334155" }}>
                            {row.quantity} bags
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                padding: "0.2rem 0.5rem",
                                borderRadius: "4px",
                                textTransform: "capitalize",
                                background: row.status === "accepted" ? "#f0fdf4" : row.status === "rejected" ? "#fef2f2" : "#fffbeb",
                                color: row.status === "accepted" ? "#166534" : row.status === "rejected" ? "#991b1b" : "#92400e",
                                border: row.status === "accepted" ? "1px solid #bbf7d0" : row.status === "rejected" ? "1px solid #fecaca" : "1px solid #fef08a"
                              }}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td style={{ padding: "0.85rem 1rem", textAlign: "right", fontWeight: "600", color: row.status === "accepted" || row.status === "claimed" ? "#1f5a43" : "#94a3b8" }}>
                            {row.status === "accepted" || row.status === "claimed" ? `+${row.quantity} Bags` : "Pending"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                          {dashboard ? "No invoices submitted yet. Click 'Submit Invoice' to add your first bill." : "Please sign in to view your submission history."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Quick Actions */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
              <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid #f1f5f9" }}>
                Quick Navigation
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {actionItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "0.85rem",
                      background: "#f8fafc",
                      border: "1px solid #f1f5f9",
                      borderRadius: "6px",
                      textDecoration: "none"
                    }}
                  >
                    <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#0f172a" }}>{item.title}</div>
                    <div style={{ fontSize: "0.775rem", color: "#64748b", marginTop: "0.2rem" }}>{item.text}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Verification Visual Card */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{ position: "relative", height: "140px" }}>
                <Image src={dashboardGalleryImages[0].src} alt={dashboardGalleryImages[0].alt} fill sizes="30vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1rem" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>Stock Verification</div>
                <div style={{ fontSize: "0.775rem", color: "#64748b", marginTop: "0.25rem" }}>
                  Submitted invoices are cross-checked against distributor supply records.
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}


