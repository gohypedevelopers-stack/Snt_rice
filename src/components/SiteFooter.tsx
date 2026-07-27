"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandLogoSrc } from "@/lib/site-data";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/vendor")) {
    return null;
  }

  return (
    <footer className="ecom-footer">
      <div className="container ecom-footer__inner">
        {/* Brand info */}
        <div className="ecom-footer__brand">
          <Link href="/" className="footer-logo">
            <Image src={brandLogoSrc} alt="SNT Agro logo" width={38} height={38} />
            <div>
              <strong>SNT Agro Industries</strong>
              <span>Pvt. Ltd.</span>
            </div>
          </Link>
          <p>Premium Basmati Rice, Pulses & Wholesale Mill Supply. Quality tested and delivered direct from origin.</p>
        </div>

        {/* Quick Nav Links */}
        <div className="ecom-footer__links">
          <div className="footer-col">
            <h4>Shop Products</h4>
            <Link href="/#products-catalog">Basmati Rice</Link>
            <Link href="/#products-catalog">Non-Basmati Rice</Link>
            <Link href="/#products-catalog">Organic Pulses</Link>
            <Link href="/#products-catalog">Wholesale Sacks</Link>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/#products">Product Categories</Link>
            <Link href="/#about">About Us</Link>
            <Link href="/#contact">Contact & Hotline</Link>
          </div>

          <div className="footer-col">
            <h4>Customer Support</h4>
            <p>📞 Order Hotline: <strong>+91 9953199155</strong></p>
            <p>✉️ Email: <strong>snt.agro@gmail.com</strong></p>
            <p>⏰ Mon - Sat: 9:00 AM - 7:00 PM</p>
          </div>
        </div>
      </div>

      {/* Payment & Trust Badges Bar */}
      <div className="ecom-footer__trust-bar">
        <div className="container trust-bar__inner">
          <div className="trust-badges">
            <span className="badge-item">🔒 100% Secure Transaction</span>
            <span className="badge-item">🚚 Express All-India Shipping</span>
            <span className="badge-item">🏅 ISO 22000 Certified Mill</span>
          </div>

          <div className="payment-icons">
            <span className="pay-pill">UPI</span>
            <span className="pay-pill">NetBanking</span>
            <span className="pay-pill">Cards</span>
            <span className="pay-pill">COD</span>
            <span className="pay-pill">Bank Transfer</span>
          </div>
        </div>
      </div>

      {/* Compact Copyright Line */}
      <div className="ecom-footer__bottom">
        <div className="container bottom__inner">
          <span>&copy; {new Date().getFullYear()} SNT Agro Industries Pvt. Ltd. All rights reserved.</span>
          <div className="bottom-links">
            <Link href="/terms">Terms & Conditions</Link>
            <span>•</span>
            <Link href="/#contact">Business Enquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
