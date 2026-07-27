import Link from "next/link";
import {
  campaignSteps,
  dashboardRows,
  flowHighlights,
  supportChannels,
  vendorWorkspaceCards
} from "@/lib/site-data";

export default function VendorOverviewPage() {
  return (
    <div className="vendor-page">
      <section className="vendor-overview-hero">
        <div className="container vendor-overview-hero__grid">
          <div className="vendor-overview-hero__copy">
            <p className="section-heading__eyebrow">Vendor workspace</p>
            <h1>Everything a retailer needs now lives under `/vendor`.</h1>
            <p>
              This section keeps invoice submissions, reward milestones, redemption pages, and support tasks separate
              from the public company website so vendors can move directly into campaign work.
            </p>
            <div className="vendor-overview-hero__actions">
              <Link href="/vendor/dashboard" className="btn btn--dark">
                Open dashboard
              </Link>
              <Link href="/vendor/login" className="btn btn--light">
                Vendor sign in
              </Link>
            </div>
          </div>

          <div className="vendor-overview-hero__stats">
            {dashboardRows.map((item) => (
              <article className="vendor-overview-stat" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vendor-overview-section">
        <div className="container">
          <div className="vendor-overview-section__head">
            <div>
              <p className="section-heading__eyebrow">Workspace pages</p>
              <h2>Dedicated pages for each vendor task.</h2>
            </div>
            <p>
              Vendors no longer land on the public homepage for operational work. They can start directly from this
              portal and move page by page.
            </p>
          </div>

          <div className="vendor-workspace-grid">
            {vendorWorkspaceCards.map((item) => (
              <article className="vendor-workspace-card" key={item.href}>
                <span>{item.status}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href={item.href}>Open page</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vendor-overview-section vendor-overview-section--soft">
        <div className="container vendor-overview-process">
          <div className="vendor-overview-section__head">
            <div>
              <p className="section-heading__eyebrow">Vendor flow</p>
              <h2>Simple movement from registration to reward claim.</h2>
            </div>
            <p>
              The process is split into clean steps so retailers can understand what happens before and after every
              invoice review.
            </p>
          </div>

          <div className="vendor-process-grid">
            {campaignSteps.map((item, index) => (
              <article className="vendor-process-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="vendor-highlight-grid">
            {flowHighlights.map((item) => (
              <article className="vendor-highlight-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vendor-overview-section">
        <div className="container vendor-support-grid">
          <div>
            <p className="section-heading__eyebrow">Support contacts</p>
            <h2>Fast contact routes when a vendor needs help.</h2>
            <p>
              Contact details stay visible inside the portal so login, invoice, and redemption issues can be escalated
              without leaving the vendor section.
            </p>
          </div>

          <div className="vendor-support-cards">
            {supportChannels.map((item) => (
              <article className="vendor-support-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
