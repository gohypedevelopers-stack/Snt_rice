"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav, brandLogoSrc } from "@/lib/site-data";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <Image src={brandLogoSrc} alt="SNT Agro logo" width={38} height={38} className="admin-brand-logo" />
        <div>
          <strong>SNT Rice Admin</strong>
          <span>Operations & Moderation</span>
        </div>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Admin navigation">
        {adminNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-active={pathname === item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link href="/" className="btn btn--dark">
        Back to public site
      </Link>
    </aside>
  );
}
