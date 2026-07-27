import Link from "next/link";
import { adminModules, adminOverviewStats, supportChannels } from "@/lib/site-data";

export default function AdminIndexPage() {
  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard__hero">
        <p className="section-heading__eyebrow">Admin dashboard</p>
        <h1>Campaign control now starts at `/admin`.</h1>
        <p>
          This area is reserved for operations staff to review vendor submissions, manage registrations, control slab
          logic, and respond to support requests from one protected console.
        </p>
      </div>

      <div className="admin-dashboard__stats">
        {adminOverviewStats.map((item) => (
          <article className="admin-dashboard__stat" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="admin-dashboard__grid">
        <div className="admin-dashboard__modules">
          <div className="admin-dashboard__section-head">
            <div>
              <p className="section-heading__eyebrow">Admin pages</p>
              <h2>Operational desks</h2>
            </div>
            <Link href="/admin/submissions" className="btn btn--dark">
              Open submissions
            </Link>
          </div>

          <div className="admin-dashboard__module-grid">
            {adminModules.map((item) => (
              <article className="admin-dashboard__module" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href={item.href}>Go to page</Link>
              </article>
            ))}
          </div>
        </div>

        <aside className="admin-dashboard__support">
          <p className="section-heading__eyebrow">Escalation</p>
          <h2>Support and campaign contacts</h2>
          <div className="admin-dashboard__support-list">
            {supportChannels.map((item) => (
              <div className="admin-dashboard__support-item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
