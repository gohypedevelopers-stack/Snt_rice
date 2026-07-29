import Image from "next/image";
import Link from "next/link";
import {
  campaignSteps,
  dashboardRows,
  flowHighlights,
  productShowcaseItems,
  supportChannels,
  vendorWorkspaceCards
} from "@/lib/site-data";

export default function VendorOverviewPage() {
  return (
    <div className="vendor-page vendor-page--ecom-style">
      {/* Vendor Premium Hero Banner */}
      <section className="vendor-v2-hero">
        <div className="container">
          <div className="vendor-v2-hero__top">
            <span className="vendor-v2-badge">
              <span className="badge-dot" /> Retailer & Partner Portal
            </span>
            <h1>SNT Agro Partner Workspace</h1>
            <p>
              Manage invoice submissions, track tier milestone slabs, inspect real-time bag counts, and redeem campaign rewards in one place.
            </p>

            <div className="vendor-v2-hero__actions">
              <Link href="/vendor/dashboard" className="btn btn--primary-ecom btn--hero-v2">
                Launch Vendor Dashboard →
              </Link>
              <Link href="/vendor/invoices" className="btn btn--outline-ecom btn--hero-v2">
                Submit Invoice Proof 🧾
              </Link>
              <Link href="/vendor/login" className="btn btn--ghost-ecom btn--hero-v2">
                Retailer Login
              </Link>
            </div>
          </div>

          {/* Hero Live Stats Cards */}
          <div className="vendor-v2-stats-grid">
            <div className="v2-stat-card v2-stat-card--highlight">
              <div className="v2-stat-icon">📦</div>
              <div>
                <small>Accepted Bag Volume</small>
                <strong>184 Bags</strong>
                <span>Across 5 verified invoices</span>
              </div>
            </div>
            <div className="v2-stat-card">
              <div className="v2-stat-icon">🎯</div>
              <div>
                <small>Active Reward Tier</small>
                <strong>Level 3 Slab</strong>
                <span>Target: 200 bags (16 bags away)</span>
              </div>
            </div>
            <div className="v2-stat-card">
              <div className="v2-stat-icon">🎁</div>
              <div>
                <small>Redemption Status</small>
                <strong>Ready to Claim</strong>
                <span>Unlocked on campaign window</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Bar */}
      <section className="ecom-features-bar">
        <div className="container ecom-features-bar__grid">
          <div className="feature-item">
            <div className="feature-item__icon">📊</div>
            <div>
              <strong>Live Dashboard</strong>
              <p>Real-time bag count & slab updates.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-item__icon">🧾</div>
            <div>
              <strong>Quick Invoice Proof</strong>
              <p>Upload bill photos & quantity notes.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-item__icon">🏆</div>
            <div>
              <strong>Milestone Rewards</strong>
              <p>Unlock appliances & flagship gifts.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-item__icon">💬</div>
            <div>
              <strong>WhatsApp Support</strong>
              <p>Direct priority line for retailers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Line Images Grid Showcase */}
      <section className="vendor-ecom-section vendor-ecom-section--soft">
        <div className="container">
          <div className="ecom-section-center">
            <p className="ecom-section-eyebrow">Product Portfolio</p>
            <h2>SNT Agro Mill Product Varieties</h2>
            <p className="ecom-section-subtitle">
              All product lines eligible for vendor invoices, bulk orders, and retailer slab points.
            </p>
          </div>

          <div className="vendor-products-showcase-grid">
            {productShowcaseItems.map((item) => (
              <div className="product-showcase-card" key={item.title}>
                <div className="showcase-img-wrap">
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="showcase-img" />
                  <span className="showcase-badge">{item.note}</span>
                </div>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workspace Modules Section */}
      <section className="vendor-ecom-section">
        <div className="container">
          <div className="ecom-section-center">
            <p className="ecom-section-eyebrow">Workspace Navigation</p>
            <h2>Dedicated Portal Pages for Retailers</h2>
            <p className="ecom-section-subtitle">
              Jump straight into your required operational page with one click.
            </p>
          </div>

          <div className="vendor-workspace-ecom-grid">
            {vendorWorkspaceCards.map((item, idx) => {
              const icons = ["📊", "🧾", "🎯", "🎁", "🎧", "🔐"];
              return (
                <article className="vendor-card-ecom" key={item.href}>
                  <div className="vendor-card-ecom__top">
                    <span className="vendor-card-ecom__icon">{icons[idx % icons.length]}</span>
                    <span className="vendor-card-ecom__status">{item.status}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link href={item.href} className="vendor-card-ecom__link">
                    Open {item.title} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vendor Step-by-Step Flow */}
      <section className="vendor-ecom-section vendor-ecom-section--soft">
        <div className="container">
          <div className="ecom-section-center">
            <p className="ecom-section-eyebrow">Retailer Journey</p>
            <h2>Simple 4-Step Reward Process</h2>
            <p className="ecom-section-subtitle">
              Clear path from shop registration to unlocking your campaign slab reward.
            </p>
          </div>

          <div className="vendor-steps-ecom-grid">
            {campaignSteps.map((item, index) => (
              <article className="vendor-step-ecom-card" key={item.title}>
                <div className="step-num">0{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="vendor-highlights-ecom-grid">
            {flowHighlights.map((item) => (
              <article className="vendor-hl-card" key={item.title}>
                <div className="hl-check">✓</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Support Contacts Section */}
      <section className="vendor-ecom-section">
        <div className="container">
          <div className="ecom-portal-card">
            <span className="ecom-portal-tag">Direct Vendor Helpdesk</span>
            <h2>Need Quick Assistance with your Account?</h2>
            <p>
              Our team is ready to help you with invoice verification, slab calculations, and redemption status updates.
            </p>

            <div className="vendor-support-ecom-grid">
              {supportChannels.map((item) => (
                <a
                  href={item.href || "#"}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
                  className="vendor-support-ecom-card"
                  key={item.label}
                >
                  <span className="sup-label">{item.label}</span>
                  <strong className="sup-val">{item.value}</strong>
                  <p className="sup-det">{item.detail}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

