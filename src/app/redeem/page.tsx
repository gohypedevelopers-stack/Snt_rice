"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redeemGalleryImages, rewardSlabs } from "@/lib/site-data";

const redeemRules = [
  {
    title: "Campaign release required",
    text: "Reward claiming remains locked until the campaign team opens redemption from the admin console."
  },
  {
    title: "Approved quantity only",
    text: "Accepted and claimed submissions are counted toward the slab used for final gift eligibility."
  },
  {
    title: "Slab override respected",
    text: "If an admin has assigned a forced slab, the redeem flow presents the manually approved tier."
  }
];

type RewardSlabData = { level: string; target: number; gift: string; tone: string };

export default function RedeemPage() {
  const [rewards, setRewards] = useState<{ rewardSlabs: RewardSlabData[]; redemptionOpen: boolean }>({ rewardSlabs: rewardSlabs.map((slab) => ({ ...slab, target: Number(slab.target) })), redemptionOpen: false });
  const [approvedBags, setApprovedBags] = useState(0);

  useEffect(() => {
    fetch("/api/rewards").then((response) => response.json()).then((data) => { if (data.rewards) setRewards({ ...data.rewards, rewardSlabs: data.rewards.rewardSlabs.map((slab: RewardSlabData) => ({ ...slab, target: Number(slab.target) })) }); });
    fetch("/api/dashboard").then((response) => (response.ok ? response.json() : null)).then((data) => setApprovedBags(data?.dashboard?.approvedBags ?? 0));
  }, []);

  const currentSlab = [...rewards.rewardSlabs].reverse().find((slab) => approvedBags >= slab.target) ?? rewards.rewardSlabs[0];
  const nextSlab = rewards.rewardSlabs.find((slab) => approvedBags < slab.target);

  return (
    <div className="redeem-page">
      <section className="redeem-hero">
        <div className="container redeem-hero__grid">
          <div className="redeem-hero__copy">
            <div>
              <p className="redeem-eyebrow">Redeem flow</p>
              <h1>Reward claim status and eligible gifts in one place.</h1>
              <p>
                A focused redemption workspace for checking campaign lock state, slab eligibility, and the reward
                options tied to approved SNT Rice bag totals.
              </p>
            </div>

            <div className="redeem-hero__meta">
              <span>Retailer account</span>
              <span>Total: {approvedBags} bags</span>
              <span>Current slab: {currentSlab.level}</span>
            </div>

            <div className="redeem-hero__actions">
              <Link href="/vendor/milestones" className="btn btn--dark">
                View milestones
              </Link>
              <Link href="/vendor/helpdesk" className="btn btn--light">
                Need support
              </Link>
            </div>

            <div className="redeem-summary" aria-label="Redemption summary">
              <div>
                <strong>{rewards.redemptionOpen ? "Open" : "Locked"}</strong>
                <span>claim state</span>
              </div>
              <div>
                <strong>{currentSlab.level}</strong>
                <span>eligible slab</span>
              </div>
              <div>
                <strong>{nextSlab ? nextSlab.target - approvedBags : 0}</strong>
                <span>bags to mega</span>
              </div>
            </div>
          </div>

          <div className="redeem-hero__visual" aria-label="SNT Rice reward visuals">
            <figure className="redeem-photo redeem-photo--main">
              <Image
                src={redeemGalleryImages[0].src}
                alt={redeemGalleryImages[0].alt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 54vw"
              />
            </figure>
            <figure className="redeem-photo">
              <Image
                src={redeemGalleryImages[1].src}
                alt={redeemGalleryImages[1].alt}
                fill
                sizes="(max-width: 900px) 50vw, 18vw"
              />
              <figcaption>{redeemGalleryImages[1].title}</figcaption>
            </figure>
            <figure className="redeem-photo">
              <Image
                src={redeemGalleryImages[2].src}
                alt={redeemGalleryImages[2].alt}
                fill
                sizes="(max-width: 900px) 50vw, 18vw"
              />
              <figcaption>{redeemGalleryImages[2].title}</figcaption>
            </figure>

            <div className="redeem-status-card">
              <span>Campaign state</span>
              <strong>{rewards.redemptionOpen ? "Redemption open" : "Redemption locked"}</strong>
              <p>{rewards.redemptionOpen ? "Your eligible reward can now be claimed." : "Gift claiming opens after the campaign team releases rewards."}</p>
            </div>

            <div className="redeem-visual-strip" aria-label="Reward status">
              <div>
                <span>Eligible now</span>
                <strong>{currentSlab.level}</strong>
              </div>
              <div>
                <span>Gift window</span>
                <strong>{rewards.redemptionOpen ? "Open" : "Pending"}</strong>
              </div>
              <div>
                <span>Next tier</span>
                <strong>{nextSlab?.level ?? "Complete"}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="redeem-main">
        <div className="container redeem-main__grid">
          <article className="redeem-panel redeem-panel--catalog">
            <div className="redeem-panel__head">
              <div>
                <p className="redeem-eyebrow">Reward catalog</p>
                <h2>Available slab rewards</h2>
              </div>
              <span className={rewards.redemptionOpen ? "status status--accepted" : "status status--locked"}>{rewards.redemptionOpen ? "Campaign open" : "Campaign locked"}</span>
            </div>

            <div className="redeem-reward-grid">
              {rewards.rewardSlabs.map((slab, index) => (
                <article className={index < 3 ? "redeem-reward redeem-reward--eligible" : "redeem-reward"} key={slab.level}>
                  <div className="redeem-reward__top">
                    <span>{slab.tone}</span>
                    <strong>{slab.level}</strong>
                  </div>
                  <p className="redeem-reward__target">{slab.target}</p>
                  <p className="redeem-reward__gift">{slab.gift}</p>
                  <div className="redeem-reward__status">{approvedBags >= slab.target ? "Eligible" : "Next tier"}</div>
                </article>
              ))}
            </div>
          </article>

          <aside className="redeem-panel">
            <div className="redeem-panel__head redeem-panel__head--stacked">
              <p className="redeem-eyebrow">Claim readiness</p>
              <h2>What must happen before claim</h2>
            </div>

            <div className="redeem-rule-list">
              {redeemRules.map((rule, index) => (
                <div className="redeem-rule" key={rule.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{rule.title}</h3>
                    <p>{rule.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
