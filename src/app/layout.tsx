import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "SNT Agro Industries Pvt. Ltd. | Rice, Pulses, and Food Products",
  description:
    "SNT Agro Industries Pvt. Ltd. supplies rice, pulses, RTS products, and bulk food products for wholesale, export, and business enquiries.",
  icons: {
    icon: "/images/sntrice.jpg",
    shortcut: "/images/sntrice.jpg",
    apple: "/images/sntrice.jpg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#31584d"
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className="page">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
