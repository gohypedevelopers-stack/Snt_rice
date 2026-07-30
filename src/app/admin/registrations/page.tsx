"use client";

import { useEffect, useState } from "react";

type Retailer = {
  id: string;
  name: string;
  phone: string;
  shopName: string;
  city: string;
  currentSlab: string;
  approvedBags: number;
  invoiceCount: number;
};

export default function AdminRegistrationsPage() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/retailers")
      .then((response) => response.json())
      .then((data) => {
        setRetailers(data.retailers ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "0.5rem 0", color: "#1e293b", fontFamily: "inherit" }}>
      {/* Top Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1.25rem",
          marginBottom: "1.5rem",
          borderBottom: "1px solid #e2e8f0"
        }}
      >
        <div>
          <div style={{ fontSize: "1.125rem", fontWeight: "700", color: "#0f172a" }}>Retailer Registrations</div>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Manage verified retailer accounts and monitor active bag counts</div>
        </div>
        <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1f5a43", background: "#f0fdf4", padding: "0.4rem 0.85rem", borderRadius: "6px", border: "1px solid #bbf7d0" }}>
          Total Retailers: {retailers.length}
        </div>
      </div>

      {/* Main Table Container */}
      <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "0.85rem 1.25rem" }}>Retailer Contact</th>
              <th style={{ padding: "0.85rem 1rem" }}>Shop Name</th>
              <th style={{ padding: "0.85rem 1rem" }}>City</th>
              <th style={{ padding: "0.85rem 1rem" }}>Approved Bags</th>
              <th style={{ padding: "0.85rem 1rem" }}>Current Slab</th>
              <th style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>Total Invoices</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                  Loading retailer registrations...
                </td>
              </tr>
            ) : retailers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "2.5rem", textAlign: "center", color: "#64748b" }}>
                  No verified retailer accounts found yet.
                </td>
              </tr>
            ) : (
              retailers.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <div style={{ fontWeight: "600", color: "#0f172a" }}>{row.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{row.phone}</div>
                  </td>
                  <td style={{ padding: "1rem", fontWeight: "500", color: "#334155" }}>
                    {row.shopName}
                  </td>
                  <td style={{ padding: "1rem", color: "#64748b" }}>
                    {row.city}
                  </td>
                  <td style={{ padding: "1rem", fontWeight: "700", color: "#1f5a43" }}>
                    {row.approvedBags} bags
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: "600", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1" }}>
                      {row.currentSlab}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.25rem", textAlign: "right", fontWeight: "600", color: "#475569" }}>
                    {row.invoiceCount} submitted
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

