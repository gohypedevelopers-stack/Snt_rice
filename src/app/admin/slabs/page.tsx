"use client";

import { useEffect, useState } from "react";

type RewardSlab = { level: string; target: number; gift: string; tone: string };

export default function AdminSlabsPage() {
  const [slabs, setSlabs] = useState<RewardSlab[]>([]);
  const [redemptionOpen, setRedemptionOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { fetch("/api/rewards").then((response) => response.json()).then((data) => { setSlabs(data.rewards?.rewardSlabs ?? []); setRedemptionOpen(data.rewards?.redemptionOpen ?? false); }); }, []);

  function updateSlab(index: number, key: keyof RewardSlab, value: string) {
    setSlabs((current) => current.map((slab, slabIndex) => slabIndex === index ? { ...slab, [key]: key === "target" ? Number(value) : value } : slab));
  }

  async function saveRewards() {
    const response = await fetch("/api/rewards", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rewardSlabs: slabs, redemptionOpen }) });
    const data = await response.json();
    setMessage(response.ok ? "Reward settings saved. Retailer pages now use these values." : data.error ?? "Could not save reward settings.");
  }

  return <>
    <section className="admin-toolbar"><div><h1 className="admin-toolbar__title">Reward control</h1><p className="admin-toolbar__copy">Set the live slab thresholds, gift labels, and redemption release state used across the retailer portal.</p></div><div className="admin-toolbar__actions"><span className="badge badge--gold">Connected settings</span><span className={redemptionOpen ? "status status--accepted" : "status status--locked"}>{redemptionOpen ? "Redemption open" : "Redemption locked"}</span></div></section>
    <section className="admin-panel"><div className="admin-panel__title"><span className="section-heading__eyebrow">Campaign settings</span><h2>Reward ladder</h2><p className="admin-panel__text">Changes are saved to the shared campaign store and reflected in milestones and redeem views.</p></div><div className="admin-reward-editor">{slabs.map((slab, index) => <div className="admin-reward-editor__row" key={`${slab.level}-${index}`}><span className="admin-reward-editor__number">{String(index + 1).padStart(2, "0")}</span><div className="field"><label htmlFor={`level-${index}`}>Level label</label><input id={`level-${index}`} value={slab.level} onChange={(event) => updateSlab(index, "level", event.target.value)} /></div><div className="field"><label htmlFor={`target-${index}`}>Target bags</label><input id={`target-${index}`} type="number" min="1" value={slab.target} onChange={(event) => updateSlab(index, "target", event.target.value)} /></div><div className="field"><label htmlFor={`tone-${index}`}>Tier label</label><input id={`tone-${index}`} value={slab.tone} onChange={(event) => updateSlab(index, "tone", event.target.value)} /></div><div className="field admin-reward-editor__gift"><label htmlFor={`gift-${index}`}>Gift description</label><input id={`gift-${index}`} value={slab.gift} onChange={(event) => updateSlab(index, "gift", event.target.value)} /></div></div>)}</div><div className="admin-settings-row"><label className="admin-toggle"><input type="checkbox" checked={redemptionOpen} onChange={(event) => setRedemptionOpen(event.target.checked)} /><span>Release reward redemption to retailers</span></label><button type="button" className="btn btn--dark" onClick={saveRewards}>Save campaign settings</button></div>{message ? <p className="form-success admin-feedback">{message}</p> : null}</section>
  </>;
}
