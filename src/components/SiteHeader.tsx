"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNav } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="SNT Rice home">
          <span className="brand__mark">
            <Image src="/snt-mark.svg" alt="" width={46} height={46} priority />
          </span>
          <span className="brand__text">
            <strong>SNT Rice</strong>
            <span>Retailer rewards portal</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "site-nav__link site-nav__link--active" : "site-nav__link"}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/login" className="btn btn--dark">
          Open portal
        </Link>
      </div>
    </header>
  );
}
