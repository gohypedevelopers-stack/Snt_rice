"use client";

import type { ReactNode } from "react";
import { FormEvent, useEffect, useState } from "react";

type AdminGateProps = {
  children: ReactNode;
};

export function AdminGate({ children }: AdminGateProps) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [loginType, setLoginType] = useState<"key" | "credentials">("credentials");
  const [secret, setSecret] = useState("");
  const [email, setEmail] = useState("admin@sntrice.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => setAuthorized(data.user?.role === "admin"))
      .catch(() => setAuthorized(false));
  }, []);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);

    const payload = loginType === "key" ? { secret } : { email, password };

    const response = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setError(data.error ?? "The credentials or admin key are not correct.");
      return;
    }

    setAuthorized(true);
  }

  if (authorized === null) {
    return (
      <div className="admin-gate-wrap">
        <div className="admin-gate panel panel--strong">
          <p className="section-heading__eyebrow">Admin access</p>
          <h1 className="admin-gate__title">Checking your session</h1>
          <p className="admin-gate__copy">Connecting to the secured SNT Rice operations console.</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="admin-gate-wrap">
        <div className="admin-gate panel panel--strong">
          <p className="section-heading__eyebrow">Admin access</p>
          <h1 className="admin-gate__title">Unlock the campaign console</h1>
          <p className="admin-gate__copy">
            Authenticate using Admin Email & Password or the security key to manage submissions, retailers, and rewards.
          </p>

          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <button
              type="button"
              className={`btn ${loginType === "credentials" ? "btn--dark" : "btn--light"}`}
              style={{ flex: 1, padding: "8px 12px", fontSize: "0.85rem" }}
              onClick={() => { setLoginType("credentials"); setError(""); }}
            >
              Email & Password
            </button>
            <button
              type="button"
              className={`btn ${loginType === "key" ? "btn--dark" : "btn--light"}`}
              style={{ flex: 1, padding: "8px 12px", fontSize: "0.85rem" }}
              onClick={() => { setLoginType("key"); setError(""); }}
            >
              Admin Security Key
            </button>
          </div>

          <form onSubmit={unlock}>
            {loginType === "credentials" ? (
              <>
                <div className="field">
                  <label htmlFor="admin-email">Admin Email</label>
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sntrice.com"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="admin-password">Password</label>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </>
            ) : (
              <div className="field">
                <label htmlFor="admin-key">Access secret key</label>
                <input
                  id="admin-key"
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder="Enter the SNT_ADMIN_KEY"
                  required
                />
              </div>
            )}

            {error ? <p className="form-error">{error}</p> : null}

            <div className="admin-gate__actions">
              <button type="submit" className="btn btn--dark" disabled={busy}>
                {busy ? "Unlocking..." : "Unlock console"}
              </button>
              <p className="admin-gate__hint">
                {loginType === "credentials"
                  ? "Default credentials: admin@sntrice.com / AdminPass@2026"
                  : "Use the campaign admin key (default: SNT@2026)."}
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
