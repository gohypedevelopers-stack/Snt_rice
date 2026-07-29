"use client";

import Image from "next/image";
import Link from "next/link";
import { milestoneGalleryImages, rewardSlabs } from "@/lib/site-data";

const slabProgress = [
  { percent: "20%", label: "50 bags (L1)" },
  { percent: "40%", label: "100 bags (L2)" },
  { percent: "80%", label: "200 bags (L3)" },
  { percent: "100%", label: "250+ bags (Mega)" }
];

export default function MilestonesPage() {
  return (
    <div className="v2-dashboard-page">
      {/* Top Header Section */}
      <section className="v2-dash-hero">
        <div className="container">
          <div className="v2-dash-hero__head">
            <div>
              <span className="v2-badge">
                <span className="badge-dot" /> Campaign Milestone Tracking
              </span>
              <h1>Retailer Reward Tier Slabs</h1>
              <p className="v2-subtitle">
                Track your approved bag count progress and see what gifts you unlock at each milestone level.
              </p>
            </div>

            <div className="v2-dash-hero__right">
              <Link href="/vendor/dashboard" className="btn btn--outline-ecom">
                ← Vendor Dashboard
              </Link>
              <Link href="/vendor/redeem" className="btn btn--primary-ecom">
                Claim Rewards 🎁
              </Link>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="v2-dash-kpi-grid">
            <div className="v2-kpi-card v2-kpi-card--green">
              <div className="v2-kpi-top">
                <span>Approved Bag Total</span>
                <span className="v2-kpi-icon">📦</span>
              </div>
              <strong>184 Bags</strong>
              <small>Verified across approved invoices</small>
            </div>

            <div className="v2-kpi-card v2-kpi-card--gold">
              <div className="v2-kpi-top">
                <span>Current Active Tier</span>
                <span className="v2-kpi-icon">🏆</span>
              </div>
              <strong>Level 3 Slab</strong>
              <small>Unlocked at 150+ approved bags</small>
            </div>

            <div className="v2-kpi-card">
              <div className="v2-kpi-top">
                <span>Next Milestone Target</span>
                <span className="v2-kpi-icon">🎯</span>
              </div>
              <strong>250+ Bags</strong>
              <small>66 bags remaining for Mega Tier</small>
            </div>

            <div className="v2-kpi-card">
              <div className="v2-kpi-top">
                <span>Campaign Gift Window</span>
                <span className="v2-kpi-icon">🎁</span>
              </div>
              <strong>Ready to Claim</strong>
              <small>Level 1, Level 2 & Level 3 unlocked</small>
            </div>
          </div>
        </div>
      </section>

      {/* Main Milestone Progress & Rewards Section */}
      <section className="v2-dash-section">
        <div className="container v2-dash-grid">
          {/* Main Left Column */}
          <div className="v2-dash-main-col">
            {/* Progress Meter Panel */}
            <div className="v2-panel v2-progress-panel">
              <div className="v2-panel__head">
                <div>
                  <span className="v2-panel-eyebrow">Tier Progression</span>
                  <h2>Level 3 Active • 73.6% Toward Mega Tier</h2>
                </div>
                <span className="progress-percent-chip">184 / 250 Bags</span>
              </div>

              <div className="v2-meter-wrap">
                <div className="v2-meter-bar">
                  <div className="v2-meter-fill" style={{ width: "73.6%" }} />
                </div>
                <div className="v2-meter-labels">
                  <span>Current: <strong>184 Bags</strong></span>
                  <span>Target: <strong>250+ Bags (Mega Tier)</strong></span>
                </div>
              </div>

              <p className="v2-meter-note">
                💡 Submit <strong>66 more approved bags</strong> before campaign end to upgrade to the top Mega Tier reward!
              </p>
            </div>

            {/* Reward Tier Cards Grid */}
            <div className="v2-panel">
              <div className="v2-panel__head">
                <div>
                  <span className="v2-panel-eyebrow">Reward Ladder</span>
                  <h2>SNT Campaign Reward Slabs</h2>
                </div>
                <Link href="/vendor/invoices" className="btn btn--outline-ecom btn--sm">
                  + Add Invoices to Level Up
                </Link>
              </div>

              <div className="v2-rewards-tier-grid">
                {rewardSlabs.map((slab, index) => {
                  const isUnlocked = index < 3;
                  return (
                    <div
                      className={isUnlocked ? "v2-tier-card v2-tier-card--unlocked" : "v2-tier-card"}
                      key={slab.level}
                    >
                      <div className="v2-tier-top">
                        <span className="v2-tier-tone">{slab.tone}</span>
                        <span className={isUnlocked ? "v2-tier-badge v2-tier-badge--active" : "v2-tier-badge"}>
                          {isUnlocked ? "✓ Unlocked" : "Locked"}
                        </span>
                      </div>
                      <h3>{slab.level}</h3>
                      <div className="v2-tier-target">{slab.target}</div>
                      <p className="v2-tier-gift">{slab.gift}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="v2-dash-side-col">
            {/* Campaign Rules & Logic */}
            <div className="v2-panel">
              <div className="v2-panel__head v2-panel__head--stacked">
                <span className="v2-panel-eyebrow">Campaign Rules</span>
                <h2>Slab Criteria & Rules</h2>
              </div>

              <div className="v2-checklist-items">
                <div className="v2-check-item">
                  <span className="check-num">01</span>
                  <div>
                    <strong>Approved Bags Only</strong>
                    <p>Only verified and accepted invoice bag counts count toward your milestone ladder.</p>
                  </div>
                </div>

                <div className="v2-check-item">
                  <span className="check-num">02</span>
                  <div>
                    <strong>Cumulative Volume</strong>
                    <p>Submissions pile up throughout the active 2026 campaign period.</p>
                  </div>
                </div>

                <div className="v2-check-item">
                  <span className="check-num">03</span>
                  <div>
                    <strong>Tier Upgrades</strong>
                    <p>Reaching a higher bag target automatically elevates your claim eligibility.</p>
                  </div>
                </div>
              </div>

              <div className="v2-info-callout">
                <strong>🎁 Claiming Rewards</strong>
                <p>
                  Once campaign redemption opens, unlocked gifts can be claimed directly from your vendor account or via support hotline.
                </p>
              </div>
            </div>

            {/* Milestone Visual Showcase Card */}
            <div className="v2-panel v2-visual-card">
              <div className="v2-visual-media">
                <Image
                  src={milestoneGalleryImages[0].src}
                  alt={milestoneGalleryImages[0].alt}
                  fill
                  sizes="30vw"
                  className="v2-visual-img"
                />
                <div className="v2-visual-overlay" />
                <span className="v2-visual-badge">🏆 Tier Verified</span>
              </div>
              <div className="v2-visual-content">
                <h4>Verified Retailer Growth</h4>
                <p>Track your movement up the SNT Agro rewards ladder with complete transparency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

