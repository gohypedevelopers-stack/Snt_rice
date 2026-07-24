import Image from "next/image";
import Link from "next/link";
import { faqItems, helpdeskGalleryImages, supportChannels } from "@/lib/site-data";

const supportStats = [
  { label: "Open tickets", value: "3", detail: "1 waiting on review" },
  { label: "Response window", value: "24h", detail: "Business-day SLA" },
  { label: "Campaign desk", value: "Live", detail: "Retailer support active" }
];

const ticketTypes = ["Login", "Submission", "Reward", "Other"];

export default function HelpdeskPage() {
  return (
    <div className="helpdesk-page">
      <section className="helpdesk-hero">
        <div className="container helpdesk-hero__grid">
          <div className="helpdesk-hero__copy">
            <div>
              <p className="helpdesk-eyebrow">Helpdesk</p>
              <h1>Retailer support, ticket intake, and campaign assistance.</h1>
              <p>
                A structured support workspace for resolving login issues, invoice questions, reward status concerns,
                and retailer follow-ups without losing campaign context.
              </p>
            </div>

            <div className="helpdesk-hero__meta">
              <span>Rahim Traders</span>
              <span>SNT Rice Wholesale</span>
              <span>Pune</span>
            </div>

            <div className="helpdesk-hero__actions">
              <Link href="/invoice-details" className="btn btn--dark">
                Submit invoice
              </Link>
              <Link href="/dashboard" className="btn btn--light">
                Back to dashboard
              </Link>
            </div>

            <div className="helpdesk-summary" aria-label="Support summary">
              {supportStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <p>{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="helpdesk-hero__visual" aria-label="SNT Rice support visuals">
            <figure className="helpdesk-photo helpdesk-photo--main">
              <Image
                src={helpdeskGalleryImages[0].src}
                alt={helpdeskGalleryImages[0].alt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 54vw"
              />
            </figure>
            <figure className="helpdesk-photo">
              <Image
                src={helpdeskGalleryImages[1].src}
                alt={helpdeskGalleryImages[1].alt}
                fill
                sizes="(max-width: 900px) 50vw, 18vw"
              />
              <figcaption>{helpdeskGalleryImages[1].title}</figcaption>
            </figure>
            <figure className="helpdesk-photo">
              <Image
                src={helpdeskGalleryImages[2].src}
                alt={helpdeskGalleryImages[2].alt}
                fill
                sizes="(max-width: 900px) 50vw, 18vw"
              />
              <figcaption>{helpdeskGalleryImages[2].title}</figcaption>
            </figure>

            <div className="helpdesk-status-card">
              <span>Support availability</span>
              <strong>Mon-Sat, 10 AM-6 PM</strong>
              <p>Campaign support is available for invoice, login, and reward questions.</p>
            </div>

            <div className="helpdesk-visual-strip" aria-label="Helpdesk status">
              <div>
                <span>Priority</span>
                <strong>Retailer care</strong>
              </div>
              <div>
                <span>Escalation</span>
                <strong>Campaign desk</strong>
              </div>
              <div>
                <span>Queue state</span>
                <strong>Active</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="helpdesk-main">
        <div className="container helpdesk-main__grid">
          <article className="helpdesk-panel helpdesk-panel--form">
            <div className="helpdesk-panel__head">
              <div>
                <p className="helpdesk-eyebrow">Support ticket</p>
                <h2>Raise a retailer support request</h2>
              </div>
              <span className="status status--pending">Draft</span>
            </div>

            <div className="helpdesk-form-grid">
              <div className="field">
                <label htmlFor="support-phone">Phone</label>
                <input id="support-phone" type="tel" placeholder="+91 98765 43210" />
              </div>
              <div className="field">
                <label htmlFor="support-category">Category</label>
                <select id="support-category" defaultValue="submission">
                  {ticketTypes.map((type) => (
                    <option value={type.toLowerCase()} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="support-reference">Reference</label>
                <input id="support-reference" type="text" placeholder="Invoice, phone, or reward ID" />
              </div>
              <div className="field">
                <label htmlFor="support-priority">Priority</label>
                <select id="support-priority" defaultValue="normal">
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="follow-up">Follow-up</option>
                </select>
              </div>
            </div>

            <div className="field field--spaced">
              <label htmlFor="support-message">Message</label>
              <textarea id="support-message" rows={5} placeholder="Describe the issue, invoice status, or reward question" />
            </div>

            <div className="helpdesk-form-actions">
              <button type="button" className="btn btn--dark">
                Send ticket
              </button>
              <button type="button" className="btn btn--light">
                Save draft
              </button>
            </div>
          </article>

          <aside className="helpdesk-panel">
            <div className="helpdesk-panel__head helpdesk-panel__head--stacked">
              <p className="helpdesk-eyebrow">Contact channels</p>
              <h2>Support routing</h2>
            </div>

            <div className="helpdesk-channel-list">
              {supportChannels.map((item) => (
                <div className="helpdesk-channel" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </aside>

          <article className="helpdesk-panel helpdesk-panel--faq">
            <div className="helpdesk-panel__head">
              <div>
                <p className="helpdesk-eyebrow">Knowledge base</p>
                <h2>Frequently asked questions</h2>
              </div>
            </div>

            <div className="helpdesk-faq-grid">
              {faqItems.map((item) => (
                <details className="helpdesk-faq" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
