import type { ReactNode } from "react";
import Link from "next/link";
import { VendorHeader } from "@/components/VendorHeader";

type VendorLayoutProps = {
  children: ReactNode;
};

export default function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <div className="vendor-shell">
      <VendorHeader />
      <div className="vendor-shell__content">{children}</div>
      <footer className="vendor-shell__footer">
        <div className="container vendor-shell__footer-inner">
          <div>
            <strong>SNT Rice retailer workspace</strong>
            <span>Invoices, milestones, redemption, and support for registered vendors.</span>
          </div>
          <Link href="/admin">Open admin console</Link>
        </div>
      </footer>
    </div>
  );
}
