"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNav, supportChannels } from "@/lib/site-data";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <div className="footer-brand">
            <span className="footer-brand__mark">S</span>
            <div>
              <strong>SNT Rice</strong>
              <p>Retailer portal for registration, submissions, milestones, and rewards.</p>
            </div>
          </div>
          <p className="site-footer__note">
            Built for a clear campaign experience with a premium visual system and operational pages that map to the handover.
          </p>
        </div>

        <div>
          <p className="site-footer__label">Quick links</p>
          <div className="footer-links">
            {publicNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="site-footer__label">Support</p>
          <div className="footer-links">
            {supportChannels.map((item) => (
              <div key={item.label} className="footer-contact">
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
