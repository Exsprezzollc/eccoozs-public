"use client";

import { FormEvent, useState } from "react";

type Status = {
  type: "idle" | "ok" | "err";
  message: string;
};

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reserved, setReserved] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get("email") || "").trim();
    const is18OrOver = formData.get("is_18_or_over") === "on";
    const honeypot = String(formData.get("company_url") || "").trim();

    setStatus({ type: "idle", message: "" });

    if (honeypot) {
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "err", message: "Please enter a valid email address." });
      return;
    }

    if (!is18OrOver) {
      setStatus({
        type: "err",
        message: "Please confirm that you are 18 or older to continue.",
      });
      return;
    }

    const params = new URLSearchParams(window.location.search);

    const payload = {
      email,
      full_name: String(formData.get("full_name") || "").trim() || null,
      audience_type: String(formData.get("audience_type") || "founding_member"),
      business_name: String(formData.get("business_name") || "").trim() || null,
      website: String(formData.get("website") || "").trim() || null,
      city: String(formData.get("city") || "").trim() || null,
      region: String(formData.get("region") || "").trim() || null,
      age_confirmed: is18OrOver,
      is_18_or_over: is18OrOver,
      source: "eccoozs.com",
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          type: "err",
          message: result?.message || result?.error || "Something went wrong. Please try again.",
        });
        return;
      }

      setReserved(true);
      setStatus({
        type: "ok",
        message: result?.message || "You're on the founding waitlist. We'll be in touch.",
      });
      form.reset();

      window.setTimeout(() => {
        setReserved(false);
      }, 4000);
    } catch {
      setStatus({ type: "err", message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="wlForm"
      noValidate
      onSubmit={handleSubmit}
      suppressHydrationWarning
    >
      <div className="wl-honeypot" aria-hidden="true" suppressHydrationWarning>
        <label htmlFor="company_url">Company URL</label>
        <input
          autoComplete="off"
          id="company_url"
          name="company_url"
          suppressHydrationWarning
          tabIndex={-1}
          type="text"
        />
      </div>

      <div className="wl-field">
        <label className="wl-label" htmlFor="wl-email">Email Address</label>
        <input
          autoComplete="email"
          className="wl-input"
          id="wl-email"
          name="email"
          placeholder="you@example.com"
          required
          suppressHydrationWarning
          type="email"
        />
      </div>

      <div className="wl-field">
        <label className="wl-label" htmlFor="wl-name">
          Name <span className="wl-opt">, optional</span>
        </label>
        <input
          autoComplete="name"
          className="wl-input"
          id="wl-name"
          name="full_name"
          placeholder="Your name"
          suppressHydrationWarning
          type="text"
        />
      </div>

      <div className="wl-field">
        <label className="wl-label" htmlFor="wl-aud">I Am Joining As</label>
        <select
          className="wl-select"
          defaultValue="founding_member"
          id="wl-aud"
          name="audience_type"
          suppressHydrationWarning
        >
          <option value="founding_member">Founding Member</option>
          <option value="creator">Creator</option>
          <option value="business_owner">Business Owner</option>
          <option value="advertiser_sponsor">Advertiser / Sponsor</option>
          <option value="beta_tester">Beta Tester</option>
          <option value="press_partner">Press / Partner</option>
        </select>
      </div>

      <div className="wl-row wl-field">
        <div>
          <label className="wl-label" htmlFor="wl-biz">
            Business <span className="wl-opt">, optional</span>
          </label>
          <input
            autoComplete="organization"
            className="wl-input"
            id="wl-biz"
            name="business_name"
            placeholder="Business name"
            suppressHydrationWarning
            type="text"
          />
        </div>

        <div>
          <label className="wl-label" htmlFor="wl-web">
            Website <span className="wl-opt">, optional</span>
          </label>
          <input
            autoComplete="url"
            className="wl-input"
            id="wl-web"
            name="website"
            placeholder="https://"
            suppressHydrationWarning
            type="url"
          />
        </div>
      </div>

      <div className="wl-row wl-field">
        <div>
          <label className="wl-label" htmlFor="wl-city">
            City <span className="wl-opt">, optional</span>
          </label>
          <input
            autoComplete="address-level2"
            className="wl-input"
            id="wl-city"
            name="city"
            placeholder="City"
            suppressHydrationWarning
            type="text"
          />
        </div>

        <div>
          <label className="wl-label" htmlFor="wl-region">
            State / Region <span className="wl-opt">, optional</span>
          </label>
          <input
            autoComplete="address-level1"
            className="wl-input"
            id="wl-region"
            name="region"
            placeholder="State / Region"
            suppressHydrationWarning
            type="text"
          />
        </div>
      </div>

      <div className="wl-check">
        <input
          id="wl-age"
          name="is_18_or_over"
          required
          suppressHydrationWarning
          type="checkbox"
        />
        <label htmlFor="wl-age">
          I confirm that I am 18 or older and want to join the ECCOOZS founding waitlist.
        </label>
      </div>

      <button className="wl-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Reservingâ€¦" : reserved ? "You're on the list!" : "Reserve My Spot"}
      </button>

      <p aria-live="polite" className={`wl-msg ${status.type === "idle" ? "" : status.type}`} role="status">
        {status.message}
      </p>
    </form>
  );
}
