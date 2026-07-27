import Image from "next/image";
import Link from "next/link";
import {
  companyLocations,
  companyValues,
  customerGalleryImages,
  productShowcaseItems,
  customerStats,
  productHighlights,
  productRanges,
  supportChannels
} from "@/lib/site-data";

export default function HomePage() {
  function isExternalWhatsApp(href?: string) {
    return Boolean(href && href.includes("wa.me"));
  }

  return (
    <div className="customer-home">
      <section className="customer-hero">
        <Image
          src={customerGalleryImages[0].src}
          alt={customerGalleryImages[0].alt}
          fill
          priority
          sizes="100vw"
          className="customer-hero__image"
        />
        <div className="customer-hero__shade" />
        <div className="container customer-hero__content">
          <div className="customer-hero__copy">
            <p className="customer-eyebrow">SNT Agro Industries Pvt. Ltd.</p>
            <h1>SNT Agro</h1>
            <p>
              Rice, pulses, and food products for trade and business supply. We are rebuilding our official website.
              For product, wholesale, export, and business enquiries, please contact our team directly.
            </p>
            <div className="customer-hero__actions">
              <Link href="#products" className="btn btn--light">Explore products</Link>
              <Link href="#contact" className="btn btn--ghost">Contact sales</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="customer-stats-band">
        <div className="container customer-stats" aria-label="Company highlights">
          <div className="customer-stats__intro">
            <span>01</span>
            <strong>Rice, pulses, RTS products, and bulk supply for business enquiries.</strong>
          </div>
          {customerStats.map((item) => (
            <div className="customer-stat" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="customer-stat customer-stat--action">
            <span>Website update in progress</span>
            <Link href="#contact">Contact the SNT team <span aria-hidden="true">-&gt;</span></Link>
          </div>
        </div>
      </section>

      <section className="customer-showcase">
        <div className="container">
          <div className="customer-showcase__head">
            <div>
              <p className="customer-eyebrow">Product range</p>
              <h2>Explore SNT product packs and variants.</h2>
            </div>
            <p>
              A quick visual look at the available SNT product packaging range, including multiple pack views and
              product variants from the local catalog images.
            </p>
          </div>

          <div className="customer-showcase__grid">
            {productShowcaseItems.map((item) => (
              <article className="customer-showcase__card" key={item.src}>
                <figure>
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 50vw, 20vw" />
                </figure>
                <div>
                  <span>{item.note}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="customer-section customer-section--white">
        <div className="container customer-section__grid">
          <div className="customer-section__head">
            <p className="customer-eyebrow">Product details</p>
            <h2>Product categories available for enquiry.</h2>
            <p>
              The current website is being rebuilt, but the team is actively handling rice, pulses, RTS products, and
              bulk supply enquiries directly for trade and business buyers.
            </p>
          </div>

          <div className="customer-highlight-list">
            {productHighlights.map((item, index) => (
              <article className="customer-highlight" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="container customer-products">
          {productRanges.map((product) => (
            <article className="customer-product" key={product.name}>
              <figure>
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 900px) 100vw, 32vw" />
              </figure>
              <div>
                <span>{product.pack}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="customer-about">
        <div className="container customer-about__grid">
          <div className="customer-about__copy">
            <p className="customer-eyebrow">About us</p>
            <h2>Food products for wholesale, export, and business supply.</h2>
            <p>
              SNT Agro Industries Pvt. Ltd. supplies rice, pulses, and related food products for retail, wholesale,
              trade, distribution, export, and institutional requirements.
            </p>
            <Link href="#contact" className="customer-text-link">Contact SNT Agro <span>-&gt;</span></Link>
          </div>

          <div className="customer-about__gallery">
            <figure className="customer-about__main">
              <Image src={customerGalleryImages[2].src} alt={customerGalleryImages[2].alt} fill sizes="(max-width: 900px) 100vw, 52vw" />
              <figcaption>{customerGalleryImages[2].title}</figcaption>
            </figure>
            <figure>
              <Image src={customerGalleryImages[1].src} alt={customerGalleryImages[1].alt} fill sizes="(max-width: 900px) 50vw, 24vw" />
              <figcaption>{customerGalleryImages[1].title}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="customer-section customer-section--warm">
        <div className="container">
          <div className="customer-section__head customer-section__head--wide">
            <p className="customer-eyebrow">Company information</p>
            <h2>What buyers and trade partners can expect from SNT Agro.</h2>
          </div>
          <div className="customer-value-grid">
            {companyValues.map((item, index) => (
              <article className="customer-value" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="customer-portals">
        <div className="container customer-portals__single">
          <article className="customer-portal customer-portal--public">
            <span>Business enquiries</span>
            <h2>Direct support for wholesale, export, and institutional buyers.</h2>
            <p>
              For current product, business, and supply enquiries, the SNT Agro team is available directly by phone,
              WhatsApp, and email while the official website update is in progress.
            </p>
            <div className="customer-portal__actions">
              <Link href="https://wa.me/919953199155" className="btn btn--dark">WhatsApp enquiry</Link>
              <Link href="#contact" className="customer-text-link">Speak with our team <span>-&gt;</span></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="customer-section customer-section--white">
        <div className="container">
          <div className="customer-section__head customer-section__head--wide">
            <p className="customer-eyebrow">Locations</p>
            <h2>Works and office addresses.</h2>
          </div>
          <div className="customer-location-grid">
            {companyLocations.map((location) => (
              <article className="customer-location" key={location.label}>
                <span>{location.label}</span>
                <p>{location.address}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="customer-contact">
        <div className="container customer-contact__grid">
          <div>
            <p className="customer-eyebrow">Contact information</p>
            <h2>Reach SNT Agro Industries Pvt. Ltd. directly.</h2>
          </div>
          <div className="customer-contact__channels">
            {supportChannels.map((item) => (
              <div className="customer-contact__item" key={item.label}>
                <span>{item.label}</span>
                {item.href ? (
                  <strong>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className={isExternalWhatsApp(item.href) ? "contact-action contact-action--whatsapp" : "contact-action"}
                    >
                      {isExternalWhatsApp(item.href) ? (
                        <>
                          <span className="contact-action__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M19.05 4.94A9.9 9.9 0 0 0 12 2a9.93 9.93 0 0 0-8.61 14.88L2 22l5.28-1.38A9.93 9.93 0 1 0 19.05 4.94ZM12 20.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.13.82.84-3.05-.2-.31A8.12 8.12 0 1 1 12 20.13Zm4.45-6.08c-.24-.12-1.4-.69-1.62-.77-.21-.08-.36-.12-.52.12-.15.23-.6.77-.73.93-.13.16-.26.18-.49.06a6.64 6.64 0 0 1-1.95-1.2 7.34 7.34 0 0 1-1.35-1.68c-.14-.23-.01-.35.1-.47.1-.1.23-.26.34-.39.11-.13.14-.22.22-.37.07-.15.04-.29-.02-.41-.06-.12-.52-1.25-.71-1.71-.19-.45-.38-.39-.52-.4h-.44c-.15 0-.4.06-.6.29-.21.23-.8.78-.8 1.89s.82 2.19.93 2.34c.12.15 1.63 2.49 3.95 3.5.55.24.98.38 1.31.49.55.17 1.05.15 1.44.09.44-.07 1.4-.57 1.6-1.12.2-.56.2-1.03.14-1.13-.05-.1-.2-.16-.43-.28Z"
                              />
                            </svg>
                          </span>
                          <span>{item.value}</span>
                        </>
                      ) : (
                        item.value
                      )}
                    </a>
                  </strong>
                ) : (
                  <strong>{item.value}</strong>
                )}
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
