"use client";

import Image from "next/image";
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
      <div className="container site-footer__inner">
        <div className="site-footer__intro">
          <div className="footer-brand">
            <span className="footer-brand__mark"><Image src="/snt-mark.svg" alt="" width={42} height={42} /></span>
            <div>
              <strong>SNT Rice</strong>
              <span>Retailer rewards portal</span>
            </div>
          </div>
          <p className="site-footer__note">A clear home for registration, invoice submissions, campaign milestones, and reward claims.</p>
          <Link href="/login" className="btn btn--light">Open retailer portal</Link>
        </div>

        <div className="site-footer__columns">
          <div>
            <p className="site-footer__label">Portal</p>
            <div className="footer-links">
              {publicNav.slice(0, 4).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="site-footer__label">Company</p>
            <div className="footer-links">
              {publicNav.slice(4).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
              <Link href="/helpdesk">Retailer support</Link>
            </div>
          </div>
        </div>

        <div className="site-footer__support">
          <p className="site-footer__label">Need help?</p>
          <h2>Keep your campaign moving.</h2>
          <div className="footer-contact">
            <strong>{supportChannels[0].label}</strong>
            <span>{supportChannels[0].value}</span>
            <small>{supportChannels[0].detail}</small>
          </div>
          <Link href="/helpdesk" className="home-pro-text-link">Visit helpdesk <span>-&gt;</span></Link>
        </div>
      </div>
      <div className="container site-footer__bottom"><span>© 2026 SNT Rice</span><span>Retailer rewards campaign</span><Link href="/terms">Terms and campaign rules</Link></div>
    </footer>
  );
}
