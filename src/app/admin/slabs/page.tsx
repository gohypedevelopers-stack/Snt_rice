"use client";

import { useEffect, useState } from "react";

type RewardSlab = { level: string; target: number; gift: string; tone: string };

export default function AdminSlabsPage() {
  const [slabs, setSlabs] = useState<RewardSlab[]>([]);
  const [redemptionOpen, setRedemptionOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchSlabs();
  }, []);

  async function fetchSlabs() {
    try {
      setLoading(true);
      const response = await fetch("/api/rewards");
      const data = await response.json();
      if (response.ok && data.rewards) {
        setSlabs(data.rewards.rewardSlabs ?? []);
        setRedemptionOpen(data.rewards.redemptionOpen ?? false);
      }
    } catch (err) {
      setErrorMsg("Failed to load reward slabs.");
    } finally {
      setLoading(false);
    }
  }

  function updateSlab(index: number, key: keyof RewardSlab, value: string) {
    setSlabs((current) =>
      current.map((slab, slabIndex) =>
        slabIndex === index
          ? { ...slab, [key]: key === "target" ? Math.max(1, Number(value) || 0) : value }
          : slab
      )
    );
  }

  function addSlab() {
    const nextLevelNum = slabs.length + 1;
    const newSlab: RewardSlab = {
      level: `Level ${nextLevelNum}`,
      target: (slabs[slabs.length - 1]?.target || 0) + 50,
      gift: "New Reward Item",
      tone: "General"
    };
    setSlabs([...slabs, newSlab]);
    setMessage("New slab tier added. Save changes to apply.");
  }

  function deleteSlab(index: number) {
    if (slabs.length <= 1) {
      setErrorMsg("You must maintain at least one reward slab.");
      return;
    }
    const slabToDelete = slabs[index];
    if (confirm(`Are you sure you want to delete "${slabToDelete.level}"?`)) {
      setSlabs(slabs.filter((_, i) => i !== index));
      setMessage(`Deleted "${slabToDelete.level}". Save changes to apply.`);
      setErrorMsg("");
    }
  }

  async function saveRewards() {
    setSaving(true);
    setMessage("");
    setErrorMsg("");

    try {
      const response = await fetch("/api/rewards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rewardSlabs: slabs, redemptionOpen })
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Reward slabs and redemption settings saved successfully.");
        if (data.rewards) {
          setSlabs(data.rewards.rewardSlabs ?? []);
          setRedemptionOpen(data.rewards.redemptionOpen ?? false);
        }
      } else {
        setErrorMsg(data.error ?? "Could not save reward settings.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  }

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
          <div style={{ fontSize: "1.125rem", fontWeight: "700", color: "#0f172a" }}>Reward Slabs</div>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Configure slab levels, bag targets, and reward items for retailers</div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: "600",
              padding: "0.35rem 0.75rem",
              borderRadius: "4px",
              background: redemptionOpen ? "#f0fdf4" : "#f8fafc",
              color: redemptionOpen ? "#166534" : "#64748b",
              border: redemptionOpen ? "1px solid #bbf7d0" : "1px solid #cbd5e1"
            }}
          >
            {redemptionOpen ? "Redemption Open" : "Redemption Locked"}
          </span>
          <button
            type="button"
            onClick={addSlab}
            style={{
              fontSize: "0.85rem",
              fontWeight: "600",
              padding: "0.45rem 1rem",
              borderRadius: "6px",
              background: "#1f5a43",
              color: "#ffffff",
              border: "none",
              cursor: "pointer"
            }}
          >
            + Add Slab Tier
          </button>
        </div>
      </div>

      {message && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", padding: "0.75rem 1rem", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.875rem" }}>
          {message}
        </div>
      )}

      {errorMsg && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "0.75rem 1rem", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.875rem" }}>
          {errorMsg}
        </div>
      )}

      {/* Main Table Form */}
      <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "0.85rem 1.25rem" }}>Level Label</th>
              <th style={{ padding: "0.85rem 1rem" }}>Target Bags</th>
              <th style={{ padding: "0.85rem 1rem" }}>Reward Gift Item</th>
              <th style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                  Loading reward slabs...
                </td>
              </tr>
            ) : (
              slabs.map((slab, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "0.85rem 1.25rem" }}>
                    <input
                      type="text"
                      value={slab.level}
                      onChange={(e) => updateSlab(index, "level", e.target.value)}
                      placeholder="e.g. Level 1"
                      style={{
                        width: "100%",
                        padding: "0.4rem 0.6rem",
                        fontSize: "0.875rem",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px"
                      }}
                    />
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <input
                      type="number"
                      min="1"
                      value={slab.target}
                      onChange={(e) => updateSlab(index, "target", e.target.value)}
                      placeholder="50"
                      style={{
                        width: "120px",
                        padding: "0.4rem 0.6rem",
                        fontSize: "0.875rem",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px"
                      }}
                    />
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <input
                      type="text"
                      value={slab.gift}
                      onChange={(e) => updateSlab(index, "gift", e.target.value)}
                      placeholder="e.g. Premium Appliance"
                      style={{
                        width: "100%",
                        padding: "0.4rem 0.6rem",
                        fontSize: "0.875rem",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px"
                      }}
                    />
                  </td>
                  <td style={{ padding: "0.85rem 1.25rem", textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => deleteSlab(index)}
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "4px",
                        border: "1px solid #fca5a5",
                        background: "#ffffff",
                        color: "#dc2626",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer Actions */}
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem", color: "#334155", fontWeight: "500" }}>
            <input
              type="checkbox"
              checked={redemptionOpen}
              onChange={(e) => setRedemptionOpen(e.target.checked)}
              style={{ width: "16px", height: "16px" }}
            />
            Release reward redemption to retailers
          </label>

          <button
            type="button"
            onClick={saveRewards}
            disabled={saving}
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              padding: "0.55rem 1.25rem",
              borderRadius: "6px",
              background: "#1f5a43",
              color: "#ffffff",
              border: "none",
              cursor: saving ? "not-allowed" : "pointer"
            }}
          >
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}


