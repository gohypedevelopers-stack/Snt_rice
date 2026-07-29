"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { faqItems, helpdeskGalleryImages, supportChannels } from "@/lib/site-data";

const ticketTypes = ["Login Issue", "Submission Query", "Reward Status", "General Support"];

export default function HelpdeskPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="v2-dashboard-page">
      {/* Top Header Section */}
      <section className="v2-dash-hero">
        <div className="container">
          <div className="v2-dash-hero__head">
            <div>
              <span className="v2-badge">
                <span className="badge-dot" /> Retailer Support Desk
              </span>
              <h1>Retailer Helpdesk & Support</h1>
              <p className="v2-subtitle">
                Raise questions regarding invoice verifications, slab targets, login access, or campaign rewards with prompt assistance.
              </p>
            </div>

            <div className="v2-dash-hero__right">
              <Link href="/vendor/dashboard" className="btn btn--outline-ecom">
                ← Vendor Dashboard
              </Link>
              <Link href="/vendor/invoices" className="btn btn--primary-ecom">
                Submit Invoice +
              </Link>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="v2-dash-kpi-grid">
            <div className="v2-kpi-card v2-kpi-card--green">
              <div className="v2-kpi-top">
                <span>Support Desk SLA</span>
                <span className="v2-kpi-icon">⚡</span>
              </div>
              <strong>24 Hours</strong>
              <small>Average response time</small>
            </div>

            <div className="v2-kpi-card v2-kpi-card--gold">
              <div className="v2-kpi-top">
                <span>Hotline Hours</span>
                <span className="v2-kpi-icon">📞</span>
              </div>
              <strong>10 AM - 6 PM</strong>
              <small>Monday to Saturday support</small>
            </div>

            <div className="v2-kpi-card">
              <div className="v2-kpi-top">
                <span>Support Queue</span>
                <span className="v2-kpi-icon">💬</span>
              </div>
              <strong>Active Care</strong>
              <small>Direct retailer assistance</small>
            </div>

            <div className="v2-kpi-card">
              <div className="v2-kpi-top">
                <span>Resolution Rate</span>
                <span className="v2-kpi-icon">✓</span>
              </div>
              <strong>99.4%</strong>
              <small>Verified retailer satisfaction</small>
            </div>
          </div>
        </div>
      </section>

      {/* Main Support Grid Section */}
      <section className="v2-dash-section">
        <div className="container v2-dash-grid">
          {/* Main Left Column */}
          <div className="v2-dash-main-col">
            {/* Support Form Panel */}
            <div className="v2-panel">
              <div className="v2-panel__head">
                <div>
                  <span className="v2-panel-eyebrow">Support Intake</span>
                  <h2>Raise a Ticket</h2>
                </div>
                <span className="v2-status-chip v2-status-chip--accepted">
                  Direct Line
                </span>
              </div>

              {submitted ? (
                <div className="v2-form-success">
                  ✅ <strong>Support Ticket Submitted!</strong>
                  <p style={{ margin: "6px 0 0", color: "#1f5a43", fontSize: "0.88rem" }}>
                    Our retailer support team will review your query and respond via WhatsApp or call within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="v2-form-grid-layout">
                  <div className="v2-field-row">
                    <div className="v2-field">
                      <label htmlFor="support-phone">WhatsApp / Phone Number *</label>
                      <input id="support-phone" type="tel" placeholder="+91 98765 43210" required />
                    </div>

                    <div className="v2-field">
                      <label htmlFor="support-category">Category *</label>
                      <select id="support-category" defaultValue="submission" className="v2-select-input">
                        {ticketTypes.map((type) => (
                          <option value={type.toLowerCase()} key={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="v2-field-row">
                    <div className="v2-field">
                      <label htmlFor="support-reference">Reference Invoice / Account ID</label>
                      <input id="support-reference" type="text" placeholder="e.g. INV-9821 or Shop Name" />
                    </div>

                    <div className="v2-field">
                      <label htmlFor="support-priority">Urgency Level</label>
                      <select id="support-priority" defaultValue="normal" className="v2-select-input">
                        <option value="normal">Normal (Routine Query)</option>
                        <option value="urgent">Urgent (Invoice Review Needed)</option>
                        <option value="follow-up">Follow-up (Existing Ticket)</option>
                      </select>
                    </div>
                  </div>

                  <div className="v2-field">
                    <label htmlFor="support-message">Detailed Message *</label>
                    <textarea
                      id="support-message"
                      rows={4}
                      placeholder="Explain your invoice, slab, or reward question in detail..."
                      required
                    />
                  </div>

                  <div className="v2-form-actions">
                    <button type="submit" className="btn btn--primary-ecom">
                      Submit Ticket →
                    </button>
                    <Link href="/vendor/dashboard" className="btn btn--ghost-ecom">
                      Cancel
                    </Link>
                  </div>
                </form>
              )}
            </div>

            {/* Knowledge Base FAQ Section */}
            <div className="v2-panel">
              <div className="v2-panel__head">
                <div>
                  <span className="v2-panel-eyebrow">Knowledge Base</span>
                  <h2>Frequently Asked Questions</h2>
                </div>
              </div>

              <div className="v2-faq-accordion-list">
                {faqItems.map((item) => (
                  <details className="v2-faq-card" key={item.question}>
                    <summary className="v2-faq-summary">
                      <strong>{item.question}</strong>
                      <span className="faq-toggle-icon">+</span>
                    </summary>
                    <div className="v2-faq-body">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="v2-dash-side-col">
            {/* Direct Contact Channels */}
            <div className="v2-panel">
              <div className="v2-panel__head v2-panel__head--stacked">
                <span className="v2-panel-eyebrow">Direct Helpline</span>
                <h2>Contact Channels</h2>
              </div>

              <div className="v2-channel-cards-list">
                {supportChannels.map((item) => (
                  <a
                    href={item.href || "#"}
                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                    rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
                    className="v2-channel-card"
                    key={item.label}
                  >
                    <span className="channel-tag">{item.label}</span>
                    <strong className="channel-val">{item.value}</strong>
                    <p className="channel-det">{item.detail}</p>
                  </a>
                ))}
              </div>

              <div className="v2-info-callout">
                <strong>📌 Campaign Notice</strong>
                <p>
                  For faster processing, please attach your invoice number or shop registration phone number when contacting support.
                </p>
              </div>
            </div>

            {/* Helpdesk Visual Showcase */}
            <div className="v2-panel v2-visual-card">
              <div className="v2-visual-media">
                <Image
                  src={helpdeskGalleryImages[0].src}
                  alt={helpdeskGalleryImages[0].alt}
                  fill
                  sizes="30vw"
                  className="v2-visual-img"
                />
                <div className="v2-visual-overlay" />
                <span className="v2-visual-badge">🎧 Dedicated Care</span>
              </div>
              <div className="v2-visual-content">
                <h4>SNT Agro Support Desk</h4>
                <p>Ensuring transparent campaign tracking and reliable reward delivery for every retailer partner.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

