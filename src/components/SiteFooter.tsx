"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandLogoSrc, publicNav, supportChannels } from "@/lib/site-data";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/vendor")) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__intro">
          <div className="footer-brand">
            <span className="footer-brand__mark"><Image src={brandLogoSrc} alt="SNT Agro logo" width={42} height={42} /></span>
            <div>
              <strong>SNT Agro</strong>
              <span>Industries Pvt. Ltd.</span>
            </div>
          </div>
          <p className="site-footer__note">Rice, pulses, RTS products, and bulk supply for trade and business enquiries.</p>
          <Link href="/#products" className="btn btn--light">View products</Link>
        </div>

        <div className="site-footer__columns">
          <div>
            <p className="site-footer__label">Website</p>
            <div className="footer-links">
              {publicNav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="site-footer__label">Company</p>
            <div className="footer-links">
              <Link href="/#about">About SNT Agro</Link>
              <Link href="/#products">Product categories</Link>
              <Link href="/#contact">Business enquiries</Link>
            </div>
          </div>
        </div>

        <div className="site-footer__support">
          <p className="site-footer__label">Need help?</p>
          <h2>Contact the SNT Agro team directly.</h2>
          <div className="footer-contact">
            <strong>{supportChannels[0].label}</strong>
            <span><a href={supportChannels[0].href}>{supportChannels[0].value}</a></span>
            <small>{supportChannels[0].detail}</small>
          </div>
          <Link href="/#contact" className="home-pro-text-link">Contact the team <span>-&gt;</span></Link>
        </div>
      </div>
      <div className="container site-footer__bottom"><span>&copy; 2026 SNT Agro Industries Pvt. Ltd.</span><span>9953199155 | snt.agro@gmail.com</span><Link href="/terms">Terms and enquiry information</Link></div>
    </footer>
  );
}
