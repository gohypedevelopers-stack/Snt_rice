import { SectionHeading } from "@/components/SectionHeading";
import { termsSections } from "@/lib/site-data";

export default function TermsPage() {
  return (
    <div className="page-shell">
      <section className="page-hero container">
        <div className="page-hero__panel">
          <p className="section-heading__eyebrow">Terms and conditions</p>
          <h1 className="page-hero__title">Clear campaign terms are part of the product experience.</h1>
          <p className="page-hero__copy">
            The terms page should be calm, readable, and structured enough that retailers can verify the rules without
            hunting through a long paragraph wall.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          {termsSections.map((section) => (
            <article className="panel card" key={section.title}>
              <SectionHeading eyebrow="Policy" title={section.title} />
              <div className="details-stack">
                {section.points.map((point, index) => (
                  <div className="list-item" key={point}>
                    <div className="list-item__top">
                      <h3 className="list-item__title">Rule {index + 1}</h3>
                      <span className="badge badge--soft">Applies</span>
                    </div>
                    <p className="list-item__text">{point}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
