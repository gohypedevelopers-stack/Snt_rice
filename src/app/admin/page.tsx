import Link from "next/link";
import { adminModules } from "@/lib/site-data";

export default function AdminIndexPage() {
  const quickActions = [
    { title: "Review Submissions", href: "/admin/submissions", desc: "Approve or reject uploaded retailer invoices", count: "Submissions" },
    { title: "Retailer Accounts", href: "/admin/registrations", desc: "Manage registered shops, locations & slab overrides", count: "Retailers" },
    { title: "Reward Slabs (CRUD)", href: "/admin/slabs", desc: "Add, edit, delete and save reward tiers", count: "Slabs" }
  ];

  const recentActivity = [
    { text: "Invoice submission INV-9821 approved", time: "10 mins ago" },
    { text: "New retailer registered: Rahim Traders", time: "25 mins ago" },
    { text: "Slab targets updated by administrator", time: "1 hour ago" }
  ];

  return (
    <div style={{ padding: "0.5rem 0", color: "#1e293b", fontFamily: "inherit" }}>
      {/* Top Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1.25rem",
          marginBottom: "1.5rem",
          borderBottom: "1px solid #e2e8f0"
        }}
      >
        <div>
          <div style={{ fontSize: "1.125rem", fontWeight: "700", color: "#0f172a" }}>Admin Console</div>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Manage submissions, accounts, and reward configurations</div>
        </div>
        <Link
          href="/admin/submissions"
          style={{
            background: "#1f5a43",
            color: "#ffffff",
            padding: "0.55rem 1.15rem",
            borderRadius: "6px",
            fontSize: "0.875rem",
            fontWeight: "600",
            textDecoration: "none"
          }}
        >
          Review Submissions
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Quick Actions Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {quickActions.map((act) => (
              <Link
                key={act.title}
                href={act.href}
                style={{
                  display: "block",
                  padding: "1.25rem",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>{act.title}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "#1f5a43", background: "#f0fdf4", padding: "0.2rem 0.5rem", borderRadius: "4px", border: "1px solid #bbf7d0" }}>
                    {act.count}
                  </span>
                </div>
                <div style={{ fontSize: "0.825rem", color: "#64748b", lineHeight: "1.4" }}>{act.desc}</div>
              </Link>
            ))}
          </div>

          {/* Operational Modules Section */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid #f1f5f9" }}>
              Management Desks
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {adminModules.map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.85rem 1rem",
                    background: "#f8fafc",
                    border: "1px solid #f1f5f9",
                    borderRadius: "6px"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#0f172a" }}>{item.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{item.text}</div>
                  </div>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      color: "#1f5a43",
                      textDecoration: "none",
                      padding: "0.35rem 0.75rem",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      background: "#ffffff"
                    }}
                  >
                    Open
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid #f1f5f9" }}>
              System Activity
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {recentActivity.map((act, i) => (
                <div key={i} style={{ fontSize: "0.825rem", borderBottom: i < recentActivity.length - 1 ? "1px solid #f8fafc" : "none", paddingBottom: "0.5rem" }}>
                  <div style={{ color: "#334155", fontWeight: "500" }}>{act.text}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.15rem" }}>{act.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



