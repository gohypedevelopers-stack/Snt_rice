"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.05 4.94A9.9 9.9 0 0 0 12 2a9.93 9.93 0 0 0-8.61 14.88L2 22l5.28-1.38A9.93 9.93 0 1 0 19.05 4.94ZM12 20.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.13.82.84-3.05-.2-.31A8.12 8.12 0 1 1 12 20.13Zm4.45-6.08c-.24-.12-1.4-.69-1.62-.77-.21-.08-.36-.12-.52.12-.15.23-.6.77-.73.93-.13.16-.26.18-.49.06a6.64 6.64 0 0 1-1.95-1.2 7.34 7.34 0 0 1-1.35-1.68c-.14-.23-.01-.35.1-.47.1-.1.23-.26.34-.39.11-.13.14-.22.22-.37.07-.15.04-.29-.02-.41-.06-.12-.52-1.25-.71-1.71-.19-.45-.38-.39-.52-.4h-.44c-.15 0-.4.06-.6.29-.21.23-.8.78-.8 1.89s.82 2.19.93 2.34c.12.15 1.63 2.49 3.95 3.5.55.24.98.38 1.31.49.55.17 1.05.15 1.44.09.44-.07 1.4-.57 1.6-1.12.2-.56.2-1.03.14-1.13-.05-.1-.2-.16-.43-.28Z"
      />
    </svg>
  );
}

export function PublicWhatsAppFloat() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/vendor")) {
    return null;
  }

  return (
    <Link
      href="https://wa.me/919953199155"
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      aria-label="Open WhatsApp enquiry"
    >
      <span className="whatsapp-float__icon">
        <WhatsAppIcon />
      </span>
      <span className="whatsapp-float__label">WhatsApp</span>
    </Link>
  );
}
