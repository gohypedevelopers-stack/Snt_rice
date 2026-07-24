import Image from "next/image";
import Link from "next/link";
import { ImageGallery } from "@/components/ImageGallery";
import { SectionHeading } from "@/components/SectionHeading";
import { campaignSteps, heroStats, homeGalleryImages, rewardSlabs } from "@/lib/site-data";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <Image
          src="https://images.pexels.com/photos/14238105/pexels-photo-14238105.jpeg?cs=srgb&dl=pexels-reneterp-14238105.jpg&fm=jpg"
          alt="Rice packed in clear bags"
          fill
          priority
          sizes="100vw"
          className="home-hero__image"
        />
        <div className="home-hero__shade" />

        <div className="container home-hero__content">
          <div className="home-hero__copy">
            <p className="home-hero__eyebrow">Retailer rewards campaign</p>
            <h1 className="home-hero__title">SNT Rice Rewards</h1>
            <p className="home-hero__lede">
              Register, submit rice invoices, track slabs, and claim campaign gifts from one clean portal.
            </p>
            <div className="home-hero__actions">
              <Link href="/dashboard" className="btn btn--light">
                Open portal
              </Link>
              <Link href="/milestones" className="btn btn--ghost">
                View slabs
              </Link>
            </div>
          </div>

          <div className="home-hero__stats" aria-label="Campaign highlights">
            {heroStats.map((item) => (
              <div className="home-stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--lift">
        <div className="container">
          <SectionHeading eyebrow="Portal" title="Everything retailers need, without the clutter." />

          <div className="action-grid">
            {campaignSteps.map((step, index) => (
              <article className="action-card" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <SectionHeading eyebrow="SNT Rice network" title="A portal grounded in real rice trade activity." />
          <ImageGallery images={homeGalleryImages} />
        </div>
      </section>

      <section className="home-section home-section--surface">
        <div className="container story-grid">
          <div className="story-media">
            <Image
              src="https://images.pexels.com/photos/29798195/pexels-photo-29798195.jpeg?cs=srgb&dl=pexels-vinvivu-2201725-29798195.jpg&fm=jpg"
              alt="Rice sacks in the field"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className="story-media__image"
            />
          </div>

          <div className="story-panel">
            <SectionHeading eyebrow="Campaign progress" title="From purchase to reward in four steps." />
            <div className="mini-list">
              <div>
                <strong>Approved invoices</strong>
                <span>Only reviewed submissions count toward slabs.</span>
              </div>
              <div>
                <strong>Clear slab logic</strong>
                <span>Retailers see current level and next target.</span>
              </div>
              <div>
                <strong>Reward release</strong>
                <span>Admin unlocks gift selection when the campaign closes.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <SectionHeading eyebrow="Rewards" title="Simple slab cards that retailers can understand quickly." />

          <div className="slab-strip">
            {rewardSlabs.map((slab) => (
              <article className="slab-card" key={slab.level}>
                <span>{slab.tone}</span>
                <h3>{slab.level}</h3>
                <strong>{slab.target}</strong>
                <p>{slab.gift}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container bottom-cta">
          <div>
            <p>Ready for review</p>
            <h2>Retailer registration, invoice tracking, rewards, support, and admin pages are connected in the nav.</h2>
          </div>
          <div className="bottom-cta__actions">
            <Link href="/invoice-details" className="btn btn--dark">
              Submit invoice
            </Link>
            <Link href="/admin/submissions" className="btn btn--light">
              Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
