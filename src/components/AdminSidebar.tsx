"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "@/lib/site-data";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <strong>SNT Rice Admin</strong>
        <span>Operations, moderation, and reward control.</span>
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
