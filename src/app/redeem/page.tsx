"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redeemGalleryImages, rewardSlabs } from "@/lib/site-data";

const redeemRules = [
  {
    title: "Campaign Release Required",
    text: "Reward claiming remains locked until the campaign management team releases redemption from the admin portal."
  },
  {
    title: "Approved Quantity Only",
    text: "Only verified and accepted invoice bag counts count toward your slab tier for final gift eligibility."
  },
  {
    title: "Admin Tier Verification",
    text: "If an admin has assigned a special slab tier to your account, your redeem status will automatically reflect it."
  }
];

type RewardSlabData = { level: string; target: number; gift: string; tone: string };

export default function RedeemPage() {
  const [rewards, setRewards] = useState<{ rewardSlabs: RewardSlabData[]; redemptionOpen: boolean }>({
    rewardSlabs: rewardSlabs.map((slab) => ({ ...slab, target: Number(slab.target) })),
    redemptionOpen: true
  });
  const [approvedBags, setApprovedBags] = useState(0);

  useEffect(() => {
    fetch("/api/rewards")
      .then((response) => response.json())
      .then((data) => {
        if (data.rewards)
          setRewards({
            ...data.rewards,
            rewardSlabs: data.rewards.rewardSlabs.map((slab: RewardSlabData) => ({
              ...slab,
              target: Number(slab.target)
            }))
          });
      });
    fetch("/api/dashboard")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => setApprovedBags(data?.dashboard?.approvedBags ?? 184));
  }, []);

  const currentSlab = [...rewards.rewardSlabs].reverse().find((slab) => approvedBags >= slab.target) ?? rewards.rewardSlabs[0];
  const nextSlab = rewards.rewardSlabs.find((slab) => approvedBags < slab.target);

  return (
    <div className="v2-dashboard-page">
      {/* Top Header Section */}
      <section className="v2-dash-hero">
        <div className="container">
          <div className="v2-dash-hero__head">
            <div>
              <span className="v2-badge">
                <span className="badge-dot" /> Campaign Gift Redemption
              </span>
              <h1>Reward Catalog & Claim Portal</h1>
              <p className="v2-subtitle">
                Review your current reward slab eligibility and check available gifts unlocked by your approved SNT Rice bag total.
              </p>
            </div>

            <div className="v2-dash-hero__right">
              <Link href="/vendor/dashboard" className="btn btn--outline-ecom">
                ← Vendor Dashboard
              </Link>
              <Link href="/vendor/helpdesk" className="btn btn--ghost-ecom">
                Helpdesk Support 🎧
              </Link>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="v2-dash-kpi-grid">
            <div className="v2-kpi-card v2-kpi-card--green">
              <div className="v2-kpi-top">
                <span>Verified Volume</span>
                <span className="v2-kpi-icon">📦</span>
              </div>
              <strong>{approvedBags} Bags</strong>
              <small>Total approved across invoices</small>
            </div>

            <div className="v2-kpi-card v2-kpi-card--gold">
              <div className="v2-kpi-top">
                <span>Eligible Reward Slab</span>
                <span className="v2-kpi-icon">🏆</span>
              </div>
              <strong>{currentSlab.level}</strong>
              <small>{currentSlab.gift}</small>
            </div>

            <div className="v2-kpi-card">
              <div className="v2-kpi-top">
                <span>Claim State</span>
                <span className="v2-kpi-icon">🎁</span>
              </div>
              <strong>{rewards.redemptionOpen ? "Open to Claim" : "Locked"}</strong>
              <small>{rewards.redemptionOpen ? "Ready for disbursement" : "Unlocks at campaign end"}</small>
            </div>

            <div className="v2-kpi-card">
              <div className="v2-kpi-top">
                <span>Next Tier Upgrade</span>
                <span className="v2-kpi-icon">🎯</span>
              </div>
              <strong>{nextSlab ? `${nextSlab.target - approvedBags} Bags` : "Top Slab!"}</strong>
              <small>{nextSlab ? `Needed for ${nextSlab.level}` : "Highest reward reached"}</small>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog & Rules Section */}
      <section className="v2-dash-section">
        <div className="container v2-dash-grid">
          {/* Main Left Column */}
          <div className="v2-dash-main-col">
            {/* Active Status Callout */}
            <div className="v2-panel v2-progress-panel">
              <div className="v2-panel__head">
                <div>
                  <span className="v2-panel-eyebrow">Claim Eligibility</span>
                  <h2>{currentSlab.level} Gift Unlocked!</h2>
                </div>
                <span className="progress-percent-chip">{rewards.redemptionOpen ? "✓ Redemption Active" : "🔒 Pending Release"}</span>
              </div>

              <p className="v2-meter-note">
                🎉 Your retailer account has verified <strong>{approvedBags} approved bags</strong>, making you eligible for the <strong>{currentSlab.gift}</strong> under {currentSlab.level}!
              </p>
            </div>

            {/* Reward Catalog Grid */}
            <div className="v2-panel">
              <div className="v2-panel__head">
                <div>
                  <span className="v2-panel-eyebrow">Reward Catalog</span>
                  <h2>SNT Campaign Gifts</h2>
                </div>
                <Link href="/vendor/milestones" className="btn btn--outline-ecom btn--sm">
                  View Full Slab Ladder →
                </Link>
              </div>

              <div className="v2-rewards-tier-grid">
                {rewards.rewardSlabs.map((slab) => {
                  const isEligible = approvedBags >= slab.target;
                  return (
                    <div
                      className={isEligible ? "v2-tier-card v2-tier-card--unlocked" : "v2-tier-card"}
                      key={slab.level}
                    >
                      <div className="v2-tier-top">
                        <span className="v2-tier-tone">{slab.tone}</span>
                        <span className={isEligible ? "v2-tier-badge v2-tier-badge--active" : "v2-tier-badge"}>
                          {isEligible ? "✓ Eligible" : "Next Level"}
                        </span>
                      </div>
                      <h3>{slab.level}</h3>
                      <div className="v2-tier-target">{slab.target} Bags Minimum</div>
                      <p className="v2-tier-gift">{slab.gift}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="v2-dash-side-col">
            {/* Redemption Guidelines */}
            <div className="v2-panel">
              <div className="v2-panel__head v2-panel__head--stacked">
                <span className="v2-panel-eyebrow">Claim Standard</span>
                <h2>Redemption Guidelines</h2>
              </div>

              <div className="v2-checklist-items">
                {redeemRules.map((rule, index) => (
                  <div className="v2-check-item" key={rule.title}>
                    <span className="check-num">0{index + 1}</span>
                    <div>
                      <strong>{rule.title}</strong>
                      <p>{rule.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="v2-info-callout">
                <strong>📞 Support & Claim Hotline</strong>
                <p>
                  Have questions about gift delivery or forced slab overrides? Call our helpline at <strong>+91 98765 43210</strong>.
                </p>
              </div>
            </div>

            {/* Visual Media Showcase */}
            <div className="v2-panel v2-visual-card">
              <div className="v2-visual-media">
                <Image
                  src={redeemGalleryImages[0].src}
                  alt={redeemGalleryImages[0].alt}
                  fill
                  sizes="30vw"
                  className="v2-visual-img"
                />
                <div className="v2-visual-overlay" />
                <span className="v2-visual-badge">🎁 Verified Rewards</span>
              </div>
              <div className="v2-visual-content">
                <h4>Guaranteed Campaign Rewards</h4>
                <p>All rewards are fulfilled directly by SNT Agro Mill after final invoice verification.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

