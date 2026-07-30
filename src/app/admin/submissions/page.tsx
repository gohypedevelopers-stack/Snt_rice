"use client";

import { useEffect, useState } from "react";

type AdminInvoice = {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  quantity: number;
  status: string;
  proofFileUrl?: string;
  user: { name: string; phone: string; shopName: string } | null;
};

export default function AdminSubmissionsPage() {
  const [invoices, setInvoices] = useState<AdminInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");

  async function loadInvoices() {
    try {
      const response = await fetch("/api/invoices");
      const data = await response.json();
      setInvoices(data.invoices ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  async function changeStatus(id: string, status: string) {
    const response = await fetch(`/api/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Could not update the invoice.");
      return;
    }
    setMessage(`Invoice updated to ${status}.`);
    loadInvoices();
  }

  const filteredInvoices = invoices.filter((inv) => filter === "all" || inv.status === filter);

  return (
    <div style={{ padding: "0.5rem 0", color: "#1e293b", fontFamily: "inherit" }}>
      {/* Header Bar */}
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
          <div style={{ fontSize: "1.125rem", fontWeight: "700", color: "#0f172a" }}>Invoice Submissions</div>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Review retailer invoices, inspect uploaded proof, and approve bag quantities</div>
        </div>

        {/* Filter Controls */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["all", "pending", "accepted", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                padding: "0.4rem 0.85rem",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                background: filter === tab ? "#1f5a43" : "#ffffff",
                color: filter === tab ? "#ffffff" : "#475569",
                cursor: "pointer",
                textTransform: "capitalize"
              }}
            >
              {tab} ({tab === "all" ? invoices.length : invoices.filter((i) => i.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", padding: "0.75rem 1rem", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.875rem" }}>
          {message}
        </div>
      )}

      {/* Main Table Container */}
      <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "0.85rem 1.25rem" }}>Retailer Details</th>
              <th style={{ padding: "0.85rem 1rem" }}>Invoice Info</th>
              <th style={{ padding: "0.85rem 1rem" }}>Quantity</th>
              <th style={{ padding: "0.85rem 1rem" }}>Status</th>
              <th style={{ padding: "0.85rem 1rem" }}>Document Proof</th>
              <th style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                  Loading invoice submissions...
                </td>
              </tr>
            ) : filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "2.5rem", textAlign: "center", color: "#64748b" }}>
                  No invoice submissions found under this filter.
                </td>
              </tr>
            ) : (
              filteredInvoices.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <div style={{ fontWeight: "600", color: "#0f172a" }}>{row.user?.name ?? "Unknown Retailer"}</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{row.user?.shopName ?? "Retail Outlet"} • {row.user?.phone ?? "No phone"}</div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: "600", color: "#0f172a" }}>{row.invoiceNumber}</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Date: {row.invoiceDate}</div>
                  </td>
                  <td style={{ padding: "1rem", fontWeight: "600", color: "#0f172a" }}>
                    {row.quantity} bags
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "4px",
                        textTransform: "capitalize",
                        background:
                          row.status === "accepted" ? "#f0fdf4" : row.status === "rejected" ? "#fef2f2" : "#fffbeb",
                        color:
                          row.status === "accepted" ? "#166534" : row.status === "rejected" ? "#991b1b" : "#92400e",
                        border:
                          row.status === "accepted"
                            ? "1px solid #bbf7d0"
                            : row.status === "rejected"
                            ? "1px solid #fecaca"
                            : "1px solid #fef08a"
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    {row.proofFileUrl ? (
                      <a
                        href={row.proofFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          color: "#1f5a43",
                          textDecoration: "underline"
                        }}
                      >
                        View Attachment
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>No file uploaded</span>
                    )}
                  </td>
                  <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        onClick={() => changeStatus(row.id, "accepted")}
                        disabled={row.status === "accepted"}
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #1f5a43",
                          background: row.status === "accepted" ? "#f1f5f9" : "#1f5a43",
                          color: row.status === "accepted" ? "#94a3b8" : "#ffffff",
                          cursor: row.status === "accepted" ? "not-allowed" : "pointer"
                        }}
                      >
                        {row.status === "accepted" ? "Approved" : "Approve"}
                      </button>
                      <button
                        type="button"
                        onClick={() => changeStatus(row.id, "rejected")}
                        disabled={row.status === "rejected"}
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #cbd5e1",
                          background: row.status === "rejected" ? "#f1f5f9" : "#ffffff",
                          color: row.status === "rejected" ? "#94a3b8" : "#dc2626",
                          cursor: row.status === "rejected" ? "not-allowed" : "pointer"
                        }}
                      >
                        Reject
                      </button>
                    </div>
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

