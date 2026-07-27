import Image from "next/image";
import Link from "next/link";
import { milestoneGalleryImages, rewardSlabs } from "@/lib/site-data";

const slabProgress = [
  { percent: "20%", label: "50 bags" },
  { percent: "40%", label: "100 bags" },
  { percent: "80%", label: "200 bags" },
  { percent: "100%", label: "250+ bags" }
];

export default function MilestonesPage() {
  return (
    <div className="milestones-page">
      <section className="milestone-hero">
        <div className="container milestone-hero__grid">
          <div className="milestone-hero__copy">
            <div>
              <p className="milestone-eyebrow">Milestones</p>
              <h1>Milestone overview</h1>
              <p>
                Track approved bags, current slab, and the next reward target for the active SNT Rice campaign.
              </p>
            </div>

            <div className="milestone-hero__meta">
              <span>Rahim Traders</span>
              <span>SNT Rice Wholesale</span>
              <span>Pune</span>
            </div>

            <div className="milestone-hero__actions">
              <Link href="/vendor/dashboard" className="btn btn--dark">
                View progress
              </Link>
              <Link href="/vendor/redeem" className="btn btn--light">
                Check rewards
              </Link>
            </div>

            <div className="milestone-summary" aria-label="Campaign slab summary">
              <div>
                <strong>184</strong>
                <span>approved bags</span>
              </div>
              <div>
                <strong>Level 3</strong>
                <span>current slab</span>
              </div>
              <div>
                <strong>66</strong>
                <span>bags to mega</span>
              </div>
            </div>
          </div>

          <div className="milestone-hero__visual" aria-label="SNT Rice campaign visuals">
            <figure className="milestone-photo milestone-photo--main">
              <Image
                src={milestoneGalleryImages[0].src}
                alt={milestoneGalleryImages[0].alt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 44vw"
              />
              <figcaption>{milestoneGalleryImages[0].title}</figcaption>
            </figure>
            <figure className="milestone-photo">
              <Image
                src={milestoneGalleryImages[1].src}
                alt={milestoneGalleryImages[1].alt}
                fill
                sizes="(max-width: 900px) 50vw, 20vw"
              />
              <figcaption>{milestoneGalleryImages[1].title}</figcaption>
            </figure>
            <figure className="milestone-photo">
              <Image
                src={milestoneGalleryImages[2].src}
                alt={milestoneGalleryImages[2].alt}
                fill
                sizes="(max-width: 900px) 50vw, 20vw"
              />
              <figcaption>{milestoneGalleryImages[2].title}</figcaption>
            </figure>
            <div className="milestone-visual-card">
              <span>Current progress</span>
              <strong>184 / 250 bags</strong>
              <p>Mega reward is 66 approved bags away.</p>
            </div>
            <div className="milestone-visual-strip" aria-label="Milestone status">
              <div>
                <span>Current slab</span>
                <strong>Level 3</strong>
              </div>
              <div>
                <span>Gift status</span>
                <strong>Ready soon</strong>
              </div>
              <div>
                <span>Review state</span>
                <strong>1 pending</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="milestone-band">
        <div className="container milestone-progress">
          <div className="milestone-section-head">
            <p className="milestone-eyebrow">Current position</p>
            <h2>Level 3 is active. Mega unlocks at 250 bags.</h2>
          </div>

          <div className="milestone-meter" aria-label="Slab progress toward 250 bags">
            <div className="milestone-meter__track">
              <span className="milestone-meter__fill" />
              {slabProgress.map((item) => (
                <span className="milestone-meter__point" style={{ left: item.percent }} key={item.label}>
                  <span>{item.label}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="milestone-rewards">
            {rewardSlabs.map((slab, index) => (
              <article className={index < 3 ? "milestone-reward milestone-reward--active" : "milestone-reward"} key={slab.level}>
                <div className="milestone-reward__top">
                  <span>{slab.tone}</span>
                  <strong>{slab.level}</strong>
                </div>
                <p className="milestone-reward__target">{slab.target}</p>
                <p className="milestone-reward__gift">{slab.gift}</p>
                <div className="milestone-reward__status">{index < 3 ? "Unlocked" : "Next target"}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="milestone-ops">
        <div className="container milestone-ops__grid">
          <div className="milestone-section-head">
            <p className="milestone-eyebrow">Campaign logic</p>
            <h2>Clear rules make the slab ladder easier to trust.</h2>
          </div>

          <div className="milestone-rule-grid">
            <article className="milestone-rule">
              <span>01</span>
              <div>
                <h3>Approved bags only</h3>
                <p>Pending or rejected submissions stay out of the slab total until an operator accepts them.</p>
              </div>
            </article>
            <article className="milestone-rule">
              <span>02</span>
              <div>
                <h3>Next target stays visible</h3>
                <p>The retailer always sees the distance to the next reward, even before redemption opens.</p>
              </div>
            </article>
            <article className="milestone-rule">
              <span>03</span>
              <div>
                <h3>Rewards unlock together</h3>
                <p>Gift claiming opens only after the campaign team releases redemption from the admin console.</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
