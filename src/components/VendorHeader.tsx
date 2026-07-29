"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { brandLogoSrc, vendorNav } from "@/lib/site-data";

function isActive(pathname: string | null, href: string) {
  if (!pathname) {
    return false;
  }

  if (href === "/vendor") {
    return pathname === "/vendor";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function VendorHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="vendor-header">
      <div className="container vendor-header__inner">
        <Link href="/vendor" className="vendor-header__brand" aria-label="SNT Rice vendor portal">
          <Image src={brandLogoSrc} alt="SNT Agro logo" width={34} height={34} className="vendor-brand-logo" />
          <div>
            <span>SNT Rice</span>
            <strong>Vendor Portal</strong>
          </div>
        </Link>

        <button
          type="button"
          className={menuOpen ? "menu-toggle menu-toggle--open" : "menu-toggle"}
          aria-expanded={menuOpen}
          aria-controls="vendor-nav"
          aria-label={menuOpen ? "Close vendor navigation menu" : "Open vendor navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="vendor-nav"
          className={menuOpen ? "vendor-header__nav vendor-header__nav--open" : "vendor-header__nav"}
          aria-label="Vendor navigation"
        >
          {vendorNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(pathname, item.href) ? "vendor-header__link vendor-header__link--active" : "vendor-header__link"}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={menuOpen ? "vendor-header__actions vendor-header__actions--open" : "vendor-header__actions"}>
          <Link href="/" className="vendor-header__text-link" onClick={() => setMenuOpen(false)}>
            Public site
          </Link>
          <Link href="/vendor/login" className="btn btn--dark" onClick={() => setMenuOpen(false)}>
            Vendor login
          </Link>
        </div>
      </div>
    </header>
  );
}
