import Link from "next/link";
import { adminModules, adminOverviewStats, supportChannels } from "@/lib/site-data";

export default function AdminIndexPage() {
  const moduleIcons: Record<string, string> = {
    "Submissions desk": "🧾",
    "Retailer registrations": "🏪",
    "Slab & reward configuration": "🎯",
    "Support queue": "💬"
  };

  const quickActions = [
    { title: "Review Submissions", href: "/admin/submissions", badge: "2 Pending", icon: "📑", bg: "#e6f4ed", color: "#1f5a43" },
    { title: "Retailer Accounts", href: "/admin/registrations", badge: "15 Active", icon: "🏪", bg: "#fef3d6", color: "#946b13" },
    { title: "Configure Slabs", href: "/admin/slabs", badge: "4 Tiers", icon: "🏆", bg: "#eff6ff", color: "#1d4ed8" },
    { title: "Support Queue", href: "/admin/support", badge: "Live Desk", icon: "💬", bg: "#f3e8ff", color: "#6b21a8" }
  ];

  const recentActivity = [
    { text: "Invoice INV-9821 approved (+45 bags credited)", time: "10 mins ago", type: "approved" },
    { text: "New Retailer Registered: Rahim Traders (Pune)", time: "25 mins ago", type: "new" },
    { text: "Support Ticket #104 resolved by Campaign Admin", time: "1 hour ago", type: "resolved" }
  ];

  return (
    <div className="v2-admin-console">
      {/* Top Console Header */}
      <div className="v3-clean-page-head">
        <div>
          <span className="v2-badge">
            <span className="badge-dot" /> Operational Console
          </span>
          <h1>SNT Admin Dashboard</h1>
        </div>
        <Link href="/admin/submissions" className="btn btn--primary-ecom">
          Review Submissions 🧾
        </Link>
      </div>

      {/* Modern 4 KPI Stat Cards */}
      <div className="admin-v3-kpi-row">
        {adminOverviewStats.map((item, idx) => {
          const icons = ["⏳", "🏪", "🎯", "⚡"];
          const accents = ["border-amber", "border-emerald", "border-indigo", "border-sky"];
          return (
            <div className={`v3-kpi-card ${accents[idx % accents.length]}`} key={item.label}>
              <div className="v3-kpi-header">
                <span className="v3-kpi-label">{item.label}</span>
                <span className="v3-kpi-icon-box">{icons[idx % icons.length]}</span>
              </div>
              <div className="v3-kpi-val">{item.value}</div>
              <div className="v3-kpi-detail">{item.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Operational Modules & Sidebar Layout */}
      <div className="admin-v3-grid-layout">
        {/* Main Console Desks */}
        <div className="v3-main-column">
          {/* Quick Shortcuts Toolbar */}
          <div className="admin-v3-panel">
            <div className="v3-panel-header">
              <div>
                <span className="v3-eyebrow">Direct Control</span>
                <h2>Quick Command Shortcuts</h2>
              </div>
            </div>

            <div className="v3-quick-shortcuts-grid">
              {quickActions.map((act) => (
                <Link href={act.href} key={act.title} className="v3-shortcut-card">
                  <span className="shortcut-icon">{act.icon}</span>
                  <div>
                    <h4>{act.title}</h4>
                    <span className="shortcut-badge" style={{ background: act.bg, color: act.color }}>
                      {act.badge}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Core Control Desks Grid */}
          <div className="admin-v3-panel">
            <div className="v3-panel-header">
              <div>
                <span className="v3-eyebrow">System Desks</span>
                <h2>Operational Desks</h2>
              </div>
              <span className="v3-pill-badge">4 Console Desks</span>
            </div>

            <div className="v3-desks-grid">
              {adminModules.map((item) => (
                <div className="v3-desk-card" key={item.title}>
                  <div className="desk-card-head">
                    <span className="desk-icon">{moduleIcons[item.title] || "⚡"}</span>
                    <span className="desk-status">Operational</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link href={item.href} className="btn-v3-outline">
                    Open Console Desk →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Operations & Activity Sidebar */}
        <div className="v3-sidebar-column">
          {/* Live Activity Stream */}
          <div className="admin-v3-panel">
            <div className="v3-panel-header">
              <div>
                <span className="v3-eyebrow">Real-time Stream</span>
                <h2>Recent Activity</h2>
              </div>
            </div>

            <div className="v3-activity-list">
              {recentActivity.map((act, i) => (
                <div className="v3-activity-item" key={i}>
                  <span className="activity-dot" />
                  <div>
                    <p>{act.text}</p>
                    <small>{act.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Escalation Channels */}
          <div className="admin-v3-panel">
            <div className="v3-panel-header">
              <div>
                <span className="v3-eyebrow">Hotline & Escalation</span>
                <h2>Operations Support</h2>
              </div>
            </div>

            <div className="v3-contacts-stack">
              {supportChannels.map((item) => (
                <div className="v3-contact-box" key={item.label}>
                  <span className="contact-tag">{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


