"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type AuthMode = "email_login" | "email_register" | "otp" | "otp_verify";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("email_login");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [shopName, setShopName] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (window.location.search.includes("google_not_configured")) {
      window.setTimeout(() => setMessage("Google sign-in needs its OAuth credentials configured in the environment."), 0);
    }
  }, []);

  async function handleEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const response = await fetch("/api/auth/login-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setMessage(data.error ?? "Login failed. Check your email and password.");
      return;
    }

    router.push("/vendor/dashboard");
    router.refresh();
  }

  async function handleEmailRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const response = await fetch("/api/auth/register-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, phone, shopName, city })
    });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setMessage(data.error ?? "Registration failed.");
      return;
    }

    router.push("/vendor/dashboard");
    router.refresh();
  }

  async function requestOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone })
    });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setMessage(data.error ?? "We could not send the OTP.");
      return;
    }

    setDevCode(data.devCode ?? "");
    setMode("otp_verify");
  }

  async function verifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code, name, shopName, city })
    });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setMessage(data.error ?? "That code could not be verified.");
      return;
    }

    router.push("/vendor/dashboard");
    router.refresh();
  }

  return (
    <div className="auth-page">
      <section className="auth-shell container">
        <div className="auth-copy">
          <p className="auth-eyebrow">SNT Rice retailer access</p>
          <h1>One portal for invoices, progress, and rewards.</h1>
          <p>
            Log in with Email/Password, WhatsApp OTP, or Google to manage your retailer workspace. Every approved invoice and reward update stays saved in your Neon cloud database.
          </p>
          <div className="auth-proof">
            <span>01</span>
            <div><strong>Instant Login & Registration</strong><small>Choose Email/Password, WhatsApp OTP, or Google SSO.</small></div>
          </div>
          <div className="auth-proof">
            <span>02</span>
            <div><strong>Submit invoice proof</strong><small>Upload your bill and track verification status in real-time.</small></div>
          </div>
          <div className="auth-proof">
            <span>03</span>
            <div><strong>Track reward readiness</strong><small>Approved bags calculate your target tier progress.</small></div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card__top">
            <div>
              <p className="auth-eyebrow">Retailer portal</p>
              <h2>
                {mode === "email_login"
                  ? "Sign In with Email"
                  : mode === "email_register"
                  ? "Create Retailer Account"
                  : mode === "otp"
                  ? "WhatsApp Sign In"
                  : "Enter OTP Code"}
              </h2>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          {mode !== "otp_verify" ? (
            <div style={{ display: "flex", gap: "6px", marginBottom: "20px", background: "rgba(0,0,0,0.05)", padding: "4px", borderRadius: "8px" }}>
              <button
                type="button"
                className={`btn ${mode === "email_login" ? "btn--dark" : "btn--light"}`}
                style={{ flex: 1, padding: "8px 12px", fontSize: "0.85rem" }}
                onClick={() => { setMode("email_login"); setMessage(""); }}
              >
                Email Login
              </button>
              <button
                type="button"
                className={`btn ${mode === "email_register" ? "btn--dark" : "btn--light"}`}
                style={{ flex: 1, padding: "8px 12px", fontSize: "0.85rem" }}
                onClick={() => { setMode("email_register"); setMessage(""); }}
              >
                Register
              </button>
              <button
                type="button"
                className={`btn ${mode === "otp" ? "btn--dark" : "btn--light"}`}
                style={{ flex: 1, padding: "8px 12px", fontSize: "0.85rem" }}
                onClick={() => { setMode("otp"); setMessage(""); }}
              >
                WhatsApp OTP
              </button>
            </div>
          ) : null}

          {/* Email Login Form */}
          {mode === "email_login" ? (
            <form onSubmit={handleEmailLogin} className="auth-form">
              <div className="field">
                <label htmlFor="email">Email address</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vendor@example.com" required />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <button className="btn btn--dark auth-submit" type="submit" disabled={busy}>
                {busy ? "Signing in..." : "Sign In with Email"}
              </button>
              <div className="auth-divider"><span>or</span></div>
              <a className="btn btn--light auth-submit" href="/api/auth/google">Continue with Google</a>
            </form>
          ) : null}

          {/* Email Registration Form */}
          {mode === "email_register" ? (
            <form onSubmit={handleEmailRegister} className="auth-form">
              <div className="field">
                <label htmlFor="reg-email">Email address</label>
                <input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vendor@example.com" required />
              </div>
              <div className="field">
                <label htmlFor="reg-password">Password</label>
                <input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" minLength={6} required />
              </div>
              <div className="auth-form__grid">
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Rahim Khan" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone number</label>
                  <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required />
                </div>
              </div>
              <div className="auth-form__grid">
                <div className="field">
                  <label htmlFor="shop-name">Shop name</label>
                  <input id="shop-name" value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Rahim Traders" required />
                </div>
                <div className="field">
                  <label htmlFor="city">City</label>
                  <input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Pune" required />
                </div>
              </div>
              <button className="btn btn--dark auth-submit" type="submit" disabled={busy}>
                {busy ? "Creating account..." : "Register & Open Workspace"}
              </button>
            </form>
          ) : null}

          {/* WhatsApp OTP Request Form */}
          {mode === "otp" ? (
            <form onSubmit={requestOtp} className="auth-form">
              <div className="field">
                <label htmlFor="otp-phone">WhatsApp mobile number</label>
                <input id="otp-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required />
              </div>
              <div className="auth-form__grid">
                <div className="field">
                  <label htmlFor="otp-name">Your name</label>
                  <input id="otp-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Rahim Khan" required />
                </div>
                <div className="field">
                  <label htmlFor="otp-shop">Shop name</label>
                  <input id="otp-shop" value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Rahim Traders" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="otp-city">City</label>
                <input id="otp-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Pune" required />
              </div>
              <button className="btn btn--dark auth-submit" type="submit" disabled={busy}>
                {busy ? "Sending code..." : "Continue with WhatsApp OTP"}
              </button>
              <div className="auth-divider"><span>or</span></div>
              <a className="btn btn--light auth-submit" href="/api/auth/google">Continue with Google</a>
            </form>
          ) : null}

          {/* OTP Verification Form */}
          {mode === "otp_verify" ? (
            <form onSubmit={verifyOtp} className="auth-form">
              <div className="auth-otp-note">
                <span>Code sent to</span>
                <strong>{phone}</strong>
                <button type="button" onClick={() => setMode("otp")}>Change number</button>
              </div>
              <div className="field">
                <label htmlFor="otp">6-digit verification code</label>
                <input id="otp" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" required />
              </div>
              {devCode ? <p className="auth-dev-code">Development OTP: <strong>{devCode}</strong></p> : null}
              <button className="btn btn--dark auth-submit" type="submit" disabled={busy}>
                {busy ? "Opening workspace..." : "Open retailer workspace"}
              </button>
              <button className="btn btn--light auth-submit" type="button" onClick={() => setMode("otp")}>Back</button>
            </form>
          ) : null}

          {message ? <p className="form-error auth-message">{message}</p> : null}
          <p className="auth-footer">Need help? <Link href="/vendor/helpdesk">Visit the helpdesk</Link></p>
        </div>
      </section>
    </div>
  );
}
