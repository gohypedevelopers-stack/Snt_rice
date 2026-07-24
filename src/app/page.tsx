import Image from "next/image";
import Link from "next/link";
import { campaignSteps, heroStats, homeGalleryImages, milestoneGalleryImages, rewardSlabs } from "@/lib/site-data";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-pro-hero">
        <Image
          src={milestoneGalleryImages[0].src}
          alt="Aerial view of green rice fields"
          fill
          priority
          sizes="100vw"
          className="home-pro-hero__background"
        />
        <div className="home-pro-hero__shade" />
        <div className="container home-pro-hero__content">
          <div className="home-pro-hero__copy">
            <p className="home-pro-eyebrow">SNT Rice / Retailer rewards 2026</p>
            <h1>Turn every approved bag into visible progress.</h1>
            <p className="home-pro-hero__lede">
              One professional workspace for retailer registration, invoice proof, reward milestones, and campaign support.
            </p>
            <div className="home-pro-hero__actions">
              <Link href="/login" className="btn btn--dark">Open retailer portal</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-pro-metrics-wrap">
        <div className="container home-pro-metrics" aria-label="Campaign metrics">
          <div className="home-pro-metrics__intro"><span>01</span><strong>The portal at a glance</strong></div>
          {heroStats.map((item) => <div className="home-pro-metric" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
          <div className="home-pro-metric home-pro-metric--action"><span>For registered retailers</span><Link href="/dashboard">View your workspace <span aria-hidden="true">-&gt;</span></Link></div>
        </div>
      </section>

      <section className="home-command">
        <div className="container">
          <div className="home-command__header">
            <div><p className="home-pro-eyebrow">Retailer command center</p><h2>A clear route from purchase proof to reward.</h2></div>
            <p>Each step is connected to the same account, so retailers always know what has happened and what needs attention next.</p>
          </div>
          <div className="home-command__layout">
            <aside className="home-command__aside"><span>Campaign workflow</span><strong>Four simple moves.<br />One trusted record.</strong><Link href="/dashboard" className="home-pro-text-link">Open the dashboard <span>-&gt;</span></Link></aside>
            <div className="home-route-list">
              {campaignSteps.map((step, index) => <article className="home-route-item" key={step.title}><span className="home-route-item__number">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><span className="home-route-item__arrow">-&gt;</span></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="home-visual-band">
        <div className="container home-visual-band__grid">
          <div className="home-visual-band__copy"><p className="home-pro-eyebrow">Built around real movement</p><h2>Every accepted invoice becomes part of the bigger picture.</h2><p>See the approved bag total, current slab, next reward target, and release state in one account view. The experience stays useful for both a busy retailer and the team reviewing submissions.</p><Link href="/milestones" className="home-pro-text-link">See the milestone ladder <span>-&gt;</span></Link></div>
          <div className="home-visual-band__gallery"><figure className="home-visual-band__main"><Image src={homeGalleryImages[2].src} alt={homeGalleryImages[2].alt} fill sizes="(max-width: 900px) 100vw, 52vw" /></figure><figure className="home-visual-band__small"><Image src={homeGalleryImages[1].src} alt={homeGalleryImages[1].alt} fill sizes="(max-width: 900px) 52vw, 24vw" /><figcaption>{homeGalleryImages[1].title}</figcaption></figure></div>
        </div>
      </section>

      <section className="home-reward-section">
        <div className="container">
          <div className="home-reward-section__header"><div><p className="home-pro-eyebrow">Reward ladder</p><h2>Know what the next approved bag is working toward.</h2></div><Link href="/redeem" className="btn btn--dark">View redemption</Link></div>
          <div className="home-reward-board">{rewardSlabs.map((slab, index) => <article className={index === rewardSlabs.length - 1 ? "home-reward-row home-reward-row--last" : "home-reward-row"} key={slab.level}><span className="home-reward-row__number">{String(index + 1).padStart(2, "0")}</span><div><span className="home-reward-row__tone">{slab.tone}</span><h3>{slab.level}</h3></div><strong>{slab.target}</strong><p>{slab.gift}</p><span className="home-reward-row__arrow">-&gt;</span></article>)}</div>
        </div>
      </section>

      <section className="home-pro-final">
        <div className="container home-pro-final__inner"><div><p className="home-pro-eyebrow">Ready when you are</p><h2>Bring your next invoice into the SNT Rice campaign.</h2></div><div className="home-pro-final__actions"><Link href="/login" className="btn btn--light">Register or sign in</Link><Link href="/helpdesk" className="home-pro-text-link">Talk to support <span>-&gt;</span></Link></div></div>
      </section>
    </div>
  );
}
