"use client";

import type { ReactNode } from "react";
import { FormEvent, useEffect, useState } from "react";

type AdminGateProps = {
  children: ReactNode;
};

export function AdminGate({ children }: AdminGateProps) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => setAuthorized(data.user?.role === "admin"))
      .catch(() => setAuthorized(false));
  }, []);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret })
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? "The admin key is not correct.");
      return;
    }

    setAuthorized(true);
  }

  if (authorized === null) {
    return <div className="admin-gate-wrap"><div className="admin-gate panel panel--strong"><p className="section-heading__eyebrow">Admin access</p><h1 className="admin-gate__title">Checking your session</h1><p className="admin-gate__copy">Connecting to the secured SNT Rice operations console.</p></div></div>;
  }

  if (!authorized) {
    return (
      <div className="admin-gate-wrap">
        <div className="admin-gate panel panel--strong">
          <p className="section-heading__eyebrow">Admin access</p>
          <h1 className="admin-gate__title">Unlock the campaign console</h1>
          <p className="admin-gate__copy">
            Use the internal password gate to review submissions, registrations, slab management, and support tickets.
          </p>

          <form onSubmit={unlock}>
          <div className="field">
            <label htmlFor="admin-key">Access key</label>
            <input
              id="admin-key"
              type="password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              placeholder="Enter the admin key"
            />
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <div className="admin-gate__actions">
            <button type="submit" className="btn btn--dark">
              Unlock console
            </button>
            <p className="admin-gate__hint">Use the campaign admin key configured on the server.</p>
          </div>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
