"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "otp">("details");
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
    setStep("otp");
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
          <h1>One login for invoices, progress, and rewards.</h1>
          <p>
            Verify your WhatsApp number to create or open your retailer workspace. Every approved invoice and reward
            update stays attached to this account.
          </p>
          <div className="auth-proof">
            <span>01</span>
            <div><strong>Verify your number</strong><small>OTP access keeps the retailer account simple.</small></div>
          </div>
          <div className="auth-proof">
            <span>02</span>
            <div><strong>Submit invoice proof</strong><small>Upload the bill and follow its review status.</small></div>
          </div>
          <div className="auth-proof">
            <span>03</span>
            <div><strong>Track reward readiness</strong><small>Approved bags update your live slab position.</small></div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card__top">
            <div><p className="auth-eyebrow">Retailer portal</p><h2>{step === "details" ? "Sign in or register" : "Enter your OTP"}</h2></div>
            <span className="auth-card__step">{step === "details" ? "01 / 02" : "02 / 02"}</span>
          </div>

          {step === "details" ? (
            <form onSubmit={requestOtp} className="auth-form">
              <div className="field"><label htmlFor="phone">WhatsApp mobile number</label><input id="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91 98765 43210" required /></div>
              <div className="auth-form__grid">
                <div className="field"><label htmlFor="name">Your name</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Rahim Khan" required /></div>
                <div className="field"><label htmlFor="shop-name">Shop name</label><input id="shop-name" value={shopName} onChange={(event) => setShopName(event.target.value)} placeholder="Rahim Traders" required /></div>
              </div>
              <div className="field"><label htmlFor="city">City</label><input id="city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Pune" required /></div>
              <button className="btn btn--dark auth-submit" type="submit" disabled={busy}>{busy ? "Sending code..." : "Continue with WhatsApp OTP"}</button>
              <div className="auth-divider"><span>or</span></div>
              <a className="btn btn--light auth-submit" href="/api/auth/google">Continue with Google</a>
              <p className="auth-note">Google sign-in becomes active when the campaign owner adds Google OAuth credentials.</p>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="auth-form">
              <div className="auth-otp-note"><span>Code sent to</span><strong>{phone}</strong><button type="button" onClick={() => setStep("details")}>Change number</button></div>
              <div className="field"><label htmlFor="otp">6-digit verification code</label><input id="otp" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value)} placeholder="123456" required /></div>
              {devCode ? <p className="auth-dev-code">Local development OTP: <strong>{devCode}</strong></p> : null}
              <button className="btn btn--dark auth-submit" type="submit" disabled={busy}>{busy ? "Opening workspace..." : "Open retailer workspace"}</button>
              <button className="btn btn--light auth-submit" type="button" onClick={() => setStep("details")}>Back</button>
            </form>
          )}

          {message ? <p className="form-error auth-message">{message}</p> : null}
          <p className="auth-footer">Need help? <Link href="/vendor/helpdesk">Visit the helpdesk</Link></p>
        </div>
      </section>
    </div>
  );
}
