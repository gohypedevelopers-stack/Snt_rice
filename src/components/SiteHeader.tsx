"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { brandLogoSrc, publicNav } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/vendor")) {
    return null;
  }

  return (
    <header className="site-header site-header--ecom">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="SNT Agro home">
          <span className="brand__mark">
            <Image src={brandLogoSrc} alt="SNT Agro logo" width={42} height={42} priority />
          </span>
          <span className="brand__text">
            <strong>SNT Agro</strong>
            <span>Industries Pvt. Ltd.</span>
          </span>
        </Link>

        <button
          type="button"
          className={menuOpen ? "menu-toggle menu-toggle--open" : "menu-toggle"}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="site-nav" className={menuOpen ? "site-nav site-nav--open" : "site-nav"} aria-label="Primary">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "site-nav__link site-nav__link--active" : "site-nav__link"}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a href="#products-catalog" className="site-nav__link" onClick={() => setMenuOpen(false)}>
            Catalog
          </a>
          <Link href="/#contact" className="site-nav__mobile-cta" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
        </nav>

        <div className="header-ecom-actions">
          <a href="https://wa.me/919953199155" target="_blank" rel="noreferrer" className="header-wa-btn">
            <span>💬 Quick WhatsApp Quote</span>
          </a>
        </div>
      </div>
      {menuOpen ? <button type="button" className="mobile-nav-scrim" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} /> : null}
    </header>
  );
}
