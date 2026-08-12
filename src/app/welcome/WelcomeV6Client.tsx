"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { welcomeV6Markup } from "./welcomeV6Markup";
import { welcomeV6Styles } from "./welcomeV6Styles";

declare global {
  interface Window {
    lucide?: { createIcons: () => void };
  }
}

export default function WelcomeV6Client() {
  const [iconsReady, setIconsReady] = useState(false);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    revealItems.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.04}s`;
      observer.observe(el);
    });

    if (iconsReady) window.lucide?.createIcons();

    const form = document.getElementById("waitlistForm") as HTMLFormElement | null;

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault();
      if (!form) return;

      const message = document.getElementById("waitlistMessage");
      const button = document.getElementById("waitlistSubmit") as HTMLButtonElement | null;
      const data = new FormData(form);
      const email = String(data.get("email") || "").trim().toLowerCase();
      const age = data.get("is_18_or_over") === "on";
      const honeypot = String(data.get("company_url") || "").trim();

      const show = (type: "" | "ok" | "err", text: string) => {
        if (!message) return;
        message.className = `waitlist-msg ${type}`.trim();
        message.textContent = text;
      };

      if (honeypot) return;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        show("err", "Please enter a valid email address.");
        return;
      }
      if (!age) {
        show("err", "Please confirm that you are 18 or older.");
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const payload = {
        email,
        full_name: String(data.get("full_name") || "").trim() || null,
        audience_type: String(data.get("audience_type") || "founding_member"),
        business_name: String(data.get("business_name") || "").trim() || null,
        website: String(data.get("website") || "").trim() || null,
        city: String(data.get("city") || "").trim() || null,
        region: String(data.get("region") || "").trim() || null,
        is_18_or_over: true,
        age_confirmed: true,
        source: "eccoozs.com",
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null,
      };

      if (button) {
        button.disabled = true;
        button.textContent = "Reserving…";
      }
      show("", "Submitting your waitlist request…");

      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json().catch(() => ({}));

        if (response.ok) {
          form.reset();
          show("ok", result?.message || "You are on the ECCOOZS founding waitlist.");
          if (button) button.textContent = "You're on the list!";
        } else {
          show("err", result?.message || result?.error || "Something went wrong while saving your spot. Please try again.");
          if (button) button.textContent = "Reserve My Spot";
        }
      } catch (error) {
        console.error(error);
        show("err", "Network error. Please try again.");
        if (button) button.textContent = "Reserve My Spot";
      } finally {
        if (button) button.disabled = false;
      }
    };

    form?.addEventListener("submit", handleSubmit);

    return () => {
      observer.disconnect();
      form?.removeEventListener("submit", handleSubmit);
    };
  }, [iconsReady]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: welcomeV6Styles }} />
      <Script
        src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"
        strategy="afterInteractive"
        onLoad={() => setIconsReady(true)}
      />
      <div className="eccoozs-v6-root" dangerouslySetInnerHTML={{ __html: welcomeV6Markup }} />
    </>
  );
}
