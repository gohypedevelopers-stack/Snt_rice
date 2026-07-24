import { AdminGate } from "@/components/AdminGate";
import { AdminSidebar } from "@/components/AdminSidebar";
import type { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminGate>
      <div className="container admin-shell">
        <AdminSidebar />
        <main className="admin-main">{children}</main>
      </div>
    </AdminGate>
  );
}
