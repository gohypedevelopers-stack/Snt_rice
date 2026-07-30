"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useId, useState } from "react";
import { invoiceGalleryImages } from "@/lib/site-data";

type Invoice = {
  id: string;
  invoiceDate: string;
  invoiceNumber: string;
  quantity: number;
  shopReference?: string;
  notes?: string;
  proofFileName?: string;
  proofFileUrl?: string;
  status: "pending" | "accepted" | "rejected" | "claimed";
  createdAt?: string;
};

type DashboardPayload = {
  user: { name: string; shopName: string; city: string };
  invoices: Invoice[];
  approvedBags: number;
  pendingCount: number;
  currentSlab: { level: string; target: number };
  nextSlab: { level: string; target: number } | null;
  redemptionOpen: boolean;
};

const actionItems = [
  { title: "Vendor Dashboard", href: "/vendor/dashboard", text: "View total bag counts, slab progress & reward status." },
  { title: "Reward Milestones", href: "/vendor/milestones", text: "Track remaining bags needed for your next slab level." },
  { title: "Claim Reward", href: "/vendor/redeem", text: "Review eligible rewards and campaign redemption status." },
  { title: "Support Helpdesk", href: "/vendor/helpdesk", text: "Contact the SNT support team for account assistance." }
];

const checklist = [
  "Keep the invoice number unique for each submission.",
  "Use the exact date printed on the physical commercial bill.",
  "Enter the correct total quantity of SNT Rice bags.",
  "Upload a clear bill image or PDF (JPG, PNG, PDF up to 8 MB)."
];

export default function InvoiceDetailsPage() {
  const [dashboard, setDashboard] = useState<DashboardPayload | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputId = useId();
  const filterSelectId = useId();
  const invoiceDateId = useId();
  const invoiceNumberId = useId();
  const quantityId = useId();
  const shopRefId = useId();
  const proofFileId = useId();
  const notesId = useId();

  const loadData = async () => {
    try {
      const [dashRes, invRes] = await Promise.all([
        fetch("/api/dashboard").then((res) => (res.ok ? res.json() : null)),
        fetch("/api/invoices").then((res) => (res.ok ? res.json() : null))
      ]);

      if (dashRes?.dashboard) {
        setDashboard(dashRes.dashboard);
      }
      if (invRes?.invoices) {
        setInvoices(invRes.invoices);
      } else if (dashRes?.dashboard?.invoices) {
        setInvoices(dashRes.dashboard.invoices);
      }
    } catch {
      // Gracefully handle unauthenticated or network error states
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  async function submitInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setBusy(true);
    setMessage("");

    try {
      const form = new FormData(formElement);
      const response = await fetch("/api/invoices", { method: "POST", body: form });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? "We could not submit this invoice. Please check the details.");
        return;
      }

      setMessage("✅ Invoice submitted successfully! It is now queued for admin review.");
      setFileName(null);
      setSelectedFile(null);
      formElement.reset();
      await loadData();
    } catch {
      setMessage("⚠️ Network error while submitting invoice. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const approvedBags = dashboard?.approvedBags ?? invoices.filter((i) => i.status === "accepted" || i.status === "claimed").reduce((acc, i) => acc + i.quantity, 0);
  const pendingCount = dashboard?.pendingCount ?? invoices.filter((i) => i.status === "pending").length;
  const rejectedCount = invoices.filter((i) => i.status === "rejected").length;

  const filteredInvoices = invoices.filter((inv) => {
    const matchesStatus = filterStatus === "all" || inv.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || inv.invoiceNumber.toLowerCase().includes(q) || (inv.shopReference ?? "").toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "2rem 0", color: "#1e293b" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* Top Header Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "1.75rem 2rem",
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}
        >
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#1f5a43", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
              Retailer Workspace • Invoice Intake
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
              Submit & Track Invoices
            </h1>
            <div style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "0.25rem" }}>
              {dashboard ? `${dashboard.user.name} (${dashboard.user.shopName} • ${dashboard.user.city})` : "Upload commercial bills to credit approved bag quantities toward your campaign rewards."}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                padding: "0.4rem 0.85rem",
                borderRadius: "6px",
                background: loading ? "#f1f5f9" : dashboard ? "#f0fdf4" : "#fffbeb",
                color: loading ? "#64748b" : dashboard ? "#166534" : "#92400e",
                border: loading ? "1px solid #cbd5e1" : dashboard ? "1px solid #bbf7d0" : "1px solid #fef08a"
              }}
            >
              {loading ? "Syncing..." : dashboard ? "Verified Partner" : "Guest Intake"}
            </span>

            <Link
              href="/vendor/dashboard"
              style={{
                background: "#f1f5f9",
                color: "#0f172a",
                padding: "0.6rem 1.1rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: "600",
                textDecoration: "none",
                border: "1px solid #cbd5e1"
              }}
            >
              ← Dashboard
            </Link>

            <a
              href="#submit-form"
              style={{
                background: "#1f5a43",
                color: "#ffffff",
                padding: "0.6rem 1.25rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: "600",
                textDecoration: "none"
              }}
            >
              New Submission +
            </a>
          </div>
        </div>

        {/* 4 Stat Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Total Submissions</div>
            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#0f172a", margin: "0.35rem 0" }}>
              {invoices.length} Invoices
            </div>
            <div style={{ fontSize: "0.775rem", color: "#94a3b8" }}>Recorded in account intake log</div>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Approved Volume</div>
            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1f5a43", margin: "0.35rem 0" }}>
              {approvedBags} Bags
            </div>
            <div style={{ fontSize: "0.775rem", color: "#94a3b8" }}>Credited towards milestone slab</div>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>In Review</div>
            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#d97706", margin: "0.35rem 0" }}>
              {pendingCount} Pending
            </div>
            <div style={{ fontSize: "0.775rem", color: "#94a3b8" }}>Verification in 24-48 hours</div>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Rejected / Revision</div>
            <div style={{ fontSize: "1.75rem", fontWeight: "700", color: rejectedCount > 0 ? "#dc2626" : "#0f172a", margin: "0.35rem 0" }}>
              {rejectedCount} Items
            </div>
            <div style={{ fontSize: "0.775rem", color: "#94a3b8" }}>Require proof re-upload</div>
          </div>
        </div>

        {/* Main Grid: Left Column & Right Sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: "1.5rem" }}>
          
          {/* Main Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Invoice Submission Form Panel */}
            <div id="submit-form" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a" }}>Submit Invoice Proof</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Enter commercial bill parameters and upload clear receipt proof.</div>
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "#1f5a43", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "0.25rem 0.6rem", borderRadius: "4px" }}>
                  Intake Active
                </span>
              </div>

              <form onSubmit={submitInvoice} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label htmlFor={invoiceDateId} style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.35rem" }}>
                      Invoice Date *
                    </label>
                    <input
                      id={invoiceDateId}
                      name="invoiceDate"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      required
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.875rem",
                        color: "#0f172a",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor={invoiceNumberId} style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.35rem" }}>
                      Invoice Number *
                    </label>
                    <input
                      id={invoiceNumberId}
                      name="invoiceNumber"
                      type="text"
                      placeholder="e.g. SNT-INV-9821"
                      required
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.875rem",
                        color: "#0f172a",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label htmlFor={quantityId} style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.35rem" }}>
                      SNT Bag Quantity *
                    </label>
                    <input
                      id={quantityId}
                      name="quantity"
                      type="number"
                      min="1"
                      placeholder="Total bags purchased (e.g. 50)"
                      required
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.875rem",
                        color: "#0f172a",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor={shopRefId} style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.35rem" }}>
                      Shop / Retail Outlet Reference *
                    </label>
                    <input
                      id={shopRefId}
                      name="shopReference"
                      type="text"
                      defaultValue={dashboard?.user.shopName ?? ""}
                      placeholder="Your shop or firm name"
                      required
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.875rem",
                        color: "#0f172a",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                </div>

                {/* Upload File Box */}
                <div>
                  <label htmlFor={proofFileId} style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.35rem" }}>
                    Upload Commercial Bill Proof (Photo / PDF) *
                  </label>
                  <div
                    style={{
                      border: "2px dashed #cbd5e1",
                      borderRadius: "8px",
                      padding: "1.25rem",
                      textAlign: "center",
                      background: selectedFile ? "#f0fdf4" : "#f8fafc",
                      borderColor: selectedFile ? "#86efac" : "#cbd5e1",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <input
                      id={proofFileId}
                      name="proof"
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setSelectedFile(file || null);
                        setFileName(file ? file.name : null);
                      }}
                      required
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer"
                      }}
                    />
                    <div style={{ pointerEvents: "none" }}>
                      <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.35rem" }}>📄</span>
                      <strong style={{ fontSize: "0.9rem", color: "#0f172a", display: "block" }}>
                        {fileName ? fileName : "Click to browse or drop bill image/PDF here"}
                      </strong>
                      <span style={{ fontSize: "0.775rem", color: "#64748b", marginTop: "0.2rem", display: "block" }}>
                        {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • ${selectedFile.type}` : "Supports JPG, PNG or PDF format up to 8 MB"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Optional Notes */}
                <div>
                  <label htmlFor={notesId} style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#334155", marginBottom: "0.35rem" }}>
                    Notes for Admin Verification (Optional)
                  </label>
                  <textarea
                    id={notesId}
                    name="notes"
                    rows={2}
                    placeholder="Provide distributor name, batch number, or order reference details..."
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.875rem",
                      color: "#0f172a",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                {message && (
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      background: message.startsWith("✅") ? "#f0fdf4" : "#fef2f2",
                      color: message.startsWith("✅") ? "#166534" : "#991b1b",
                      border: message.startsWith("✅") ? "1px solid #bbf7d0" : "1px solid #fecaca"
                    }}
                  >
                    {message}
                  </div>
                )}

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <button
                    type="submit"
                    disabled={busy}
                    style={{
                      background: busy ? "#94a3b8" : "#1f5a43",
                      color: "#ffffff",
                      border: "none",
                      padding: "0.7rem 1.5rem",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      cursor: busy ? "not-allowed" : "pointer"
                    }}
                  >
                    {busy ? "Submitting Invoice..." : "Submit Invoice for Review →"}
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      setFileName(null);
                      setSelectedFile(null);
                      setMessage("");
                    }}
                    style={{
                      background: "transparent",
                      color: "#64748b",
                      border: "1px solid #cbd5e1",
                      padding: "0.7rem 1.25rem",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    Clear Form
                  </button>
                </div>

              </form>
            </div>

            {/* Submitted Invoices Log & History */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a" }}>Submitted Invoices History</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Live record of submitted bill entries and approval status</div>
                </div>

                {/* Filter and Search Bar */}
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  <input
                    id={searchInputId}
                    type="text"
                    placeholder="Search invoice #..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.8rem",
                      outline: "none"
                    }}
                  />
                  <select
                    id={filterSelectId}
                    aria-label="Filter invoices by status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.8rem",
                      outline: "none",
                      background: "#ffffff",
                      color: "#334155"
                    }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="claimed">Claimed</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <th style={{ padding: "0.75rem 1rem" }}>Date</th>
                      <th style={{ padding: "0.75rem 1rem" }}>Invoice No.</th>
                      <th style={{ padding: "0.75rem 1rem" }}>Quantity</th>
                      <th style={{ padding: "0.75rem 1rem" }}>Shop Ref</th>
                      <th style={{ padding: "0.75rem 1rem" }}>Proof File</th>
                      <th style={{ padding: "0.75rem 1rem" }}>Status</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Bag Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((row) => (
                        <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "0.85rem 1rem", color: "#64748b", whiteSpace: "nowrap" }}>
                            {new Date(row.invoiceDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                          <td style={{ padding: "0.85rem 1rem", fontWeight: "600", color: "#0f172a" }}>
                            {row.invoiceNumber}
                          </td>
                          <td style={{ padding: "0.85rem 1rem", color: "#334155", fontWeight: "500" }}>
                            {row.quantity} bags
                          </td>
                          <td style={{ padding: "0.85rem 1rem", color: "#64748b" }}>
                            {row.shopReference || "—"}
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            {row.proofFileUrl ? (
                              <a
                                href={row.proofFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#1f5a43", fontWeight: "600", textDecoration: "underline", fontSize: "0.8rem" }}
                              >
                                {row.proofFileName ? row.proofFileName : "View Proof ↗"}
                              </a>
                            ) : (
                              <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>No File</span>
                            )}
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                padding: "0.2rem 0.55rem",
                                borderRadius: "4px",
                                textTransform: "capitalize",
                                background: row.status === "accepted" || row.status === "claimed" ? "#f0fdf4" : row.status === "rejected" ? "#fef2f2" : "#fffbeb",
                                color: row.status === "accepted" || row.status === "claimed" ? "#166534" : row.status === "rejected" ? "#991b1b" : "#92400e",
                                border: row.status === "accepted" || row.status === "claimed" ? "1px solid #bbf7d0" : row.status === "rejected" ? "1px solid #fecaca" : "1px solid #fef08a"
                              }}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td style={{ padding: "0.85rem 1rem", textAlign: "right", fontWeight: "600", color: row.status === "accepted" || row.status === "claimed" ? "#1f5a43" : "#94a3b8" }}>
                            {row.status === "accepted" || row.status === "claimed" ? `+${row.quantity} Bags` : "Pending"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} style={{ padding: "2.5rem", textAlign: "center", color: "#64748b" }}>
                          {invoices.length === 0
                            ? "No invoices submitted yet. Use the form above to submit your first invoice proof."
                            : "No invoices matched your current search or status filter."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Quick Navigation */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
              <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid #f1f5f9" }}>
                Quick Navigation
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {actionItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "0.85rem",
                      background: "#f8fafc",
                      border: "1px solid #f1f5f9",
                      borderRadius: "6px",
                      textDecoration: "none",
                      transition: "border-color 0.2s ease"
                    }}
                  >
                    <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#0f172a" }}>{item.title}</div>
                    <div style={{ fontSize: "0.775rem", color: "#64748b", marginTop: "0.2rem" }}>{item.text}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Verification Checklist */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.25rem" }}>
              <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid #f1f5f9" }}>
                Verification Guidelines
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {checklist.map((item, index) => (
                  <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        color: "#1f5a43",
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "4px"
                      }}
                    >
                      0{index + 1}
                    </span>
                    <p style={{ fontSize: "0.8rem", color: "#475569", margin: 0, lineHeight: 1.4 }}>{item}</p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "1rem",
                  padding: "0.85rem",
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "6px",
                  fontSize: "0.775rem",
                  color: "#1e40af",
                  lineHeight: 1.4
                }}
              >
                <strong>📌 Verification Note:</strong> Submissions are verified against distributor dispatch logs. Approved bag counts directly upgrade your campaign milestone tier.
              </div>
            </div>

            {/* Verification Visual Card */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{ position: "relative", height: "140px" }}>
                <Image src={invoiceGalleryImages[0].src} alt={invoiceGalleryImages[0].alt} fill sizes="30vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1rem" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>Commercial Proof Audit</div>
                <div style={{ fontSize: "0.775rem", color: "#64748b", marginTop: "0.25rem" }}>
                  Verification team cross-checks invoice numbers against distributor billing records.
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}


