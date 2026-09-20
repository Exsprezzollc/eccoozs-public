"use client";

import { useEffect, useState } from "react";
import styles from "./GoogleAnalyticsConsent.module.css";

const MEASUREMENT_ID = "G-MK8CE7ED6J";
const STORAGE_KEY = "eccoozs.analytics.consent";

type AnalyticsConsent = "granted" | "denied" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }
}

function setGoogleConsent(analyticsStorage: "granted" | "denied") {
  ensureGtag();

  window.gtag?.("consent", "update", {
    analytics_storage: analyticsStorage,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function loadGoogleAnalytics() {
  ensureGtag();

  if (!document.querySelector("script[data-eccoozs-ga4]")) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.dataset.eccoozsGa4 = "true";
    document.head.appendChild(script);
  }

  if (!document.documentElement.dataset.eccoozsGaConfigured) {
    window.gtag?.("js", new Date());
    window.gtag?.("config", MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    document.documentElement.dataset.eccoozsGaConfigured = "true";
  }
}

export function GoogleAnalyticsConsent() {
  const [choice, setChoice] = useState<AnalyticsConsent>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    ensureGtag();

    window.gtag?.("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
      wait_for_update: 500,
    });

    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initialChoice: AnalyticsConsent =
      stored === "granted" || stored === "denied" ? stored : null;

    setChoice(initialChoice);
    setReady(true);

    if (initialChoice === "granted") {
      setGoogleConsent("granted");
      loadGoogleAnalytics();
    } else {
      setGoogleConsent("denied");
    }
  }, []);

  function saveChoice(nextChoice: Exclude<AnalyticsConsent, null>) {
    window.localStorage.setItem(STORAGE_KEY, nextChoice);
    setChoice(nextChoice);
    setSettingsOpen(false);
    setGoogleConsent(nextChoice);

    if (nextChoice === "granted") {
      loadGoogleAnalytics();
    }
  }

  if (!ready) {
    return null;
  }

  const showPanel = choice === null || settingsOpen;

  return (
    <>
      {showPanel ? (
        <section
          className={styles.panel}
          aria-label="ECCOOZS privacy choices"
          role="dialog"
          aria-live="polite"
        >
          <div className={styles.copy}>
            <strong>Privacy choices</strong>
            <p>
              ECCOOZS uses essential storage to operate the site. With your
              permission, we also use optional analytics to understand visits,
              traffic sources, and page engagement. We do not enable Google
              advertising personalization.
            </p>
            <a href="/privacy">Read our Privacy Policy</a>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={() => saveChoice("denied")}
            >
              Essential only
            </button>
            <button
              type="button"
              className={styles.primary}
              onClick={() => saveChoice("granted")}
            >
              Allow analytics
            </button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          className={styles.reopen}
          onClick={() => setSettingsOpen(true)}
          aria-label="Open privacy choices"
        >
          Privacy choices
        </button>
      )}
    </>
  );
}
