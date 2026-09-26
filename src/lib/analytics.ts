const CONSENT_STORAGE_KEY = "eccoozs.analytics.consent";
const CONSENT_COOKIE = "eccoozs_analytics_consent";
const CAMPAIGN_SESSION_KEY = "eccoozs.analytics.campaign";

export type AnalyticsParams = Record<
  string,
  string | number | boolean | null | undefined
>;

type CampaignContext = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  initial_referrer?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function analyticsConsentGranted(): boolean {
  if (typeof window === "undefined") return false;

  try {
    if (window.localStorage.getItem(CONSENT_STORAGE_KEY) === "granted") {
      return true;
    }
  } catch {
    // Cookie fallback below.
  }

  return document.cookie
    .split("; ")
    .some((entry) => entry === `${CONSENT_COOKIE}=granted`);
}

function readCampaignFromUrl(): CampaignContext {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const context: CampaignContext = {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_term: params.get("utm_term") || undefined,
    landing_page: window.location.pathname,
    initial_referrer: document.referrer || undefined,
  };

  return context;
}

export function initializeCampaignAttribution(): CampaignContext {
  if (typeof window === "undefined") return {};

  const current = readCampaignFromUrl();
  const hasCampaign =
    current.utm_source ||
    current.utm_medium ||
    current.utm_campaign ||
    current.utm_content ||
    current.utm_term;

  try {
    const existing = window.sessionStorage.getItem(CAMPAIGN_SESSION_KEY);

    if (!existing || hasCampaign) {
      window.sessionStorage.setItem(
        CAMPAIGN_SESSION_KEY,
        JSON.stringify(current)
      );
      return current;
    }

    return JSON.parse(existing) as CampaignContext;
  } catch {
    return current;
  }
}

export function getCampaignAttribution(): CampaignContext {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.sessionStorage.getItem(CAMPAIGN_SESSION_KEY);
    if (stored) return JSON.parse(stored) as CampaignContext;
  } catch {
    // Fall through to the URL-derived context.
  }

  return readCampaignFromUrl();
}

export function pageCategory(pathname: string): string {
  if (pathname === "/") return "corporate";
  if (pathname.startsWith("/welcome")) return "social";
  if (pathname.startsWith("/bellmont")) return "bellmont";
  if (pathname.startsWith("/history")) return "history";
  if (pathname.startsWith("/house-of-eccoozs")) return "commerce";
  if (pathname.startsWith("/learning")) return "learning";
  if (pathname.startsWith("/apps")) return "learning_app";
  if (
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/conduct") ||
    pathname.startsWith("/support")
  ) {
    return "legal_support";
  }
  return "other";
}

export function destinationCategory(href: string): string {
  if (typeof window === "undefined") return "unknown";

  try {
    const url = new URL(href, window.location.href);
    const host = url.hostname.replace(/^www\./, "");
    const path = url.pathname;

    if (host === "eccoozs.com") return pageCategory(path);
    if (host === "eccoozslearning.com") return "learning";
    if (host === "eccoozstechnologies.com") return "corporate";
    if (host.includes("shopify") || host.includes("houseofeccoozs")) {
      return "commerce";
    }

    return url.origin === window.location.origin ? pageCategory(path) : "external";
  } catch {
    return "unknown";
  }
}

export function safeAnalyticsUrl(href: string): string {
  if (typeof window === "undefined") return "";

  try {
    const url = new URL(href, window.location.href);

    if (!["http:", "https:"].includes(url.protocol)) {
      return url.protocol.replace(":", "");
    }

    if (url.origin === window.location.origin) {
      return url.pathname;
    }

    return `${url.origin}${url.pathname}`;
  } catch {
    return "";
  }
}

export function trackEccoozsEvent(
  eventName: string,
  params: AnalyticsParams = {}
) {
  if (typeof window === "undefined") return;
  if (!analyticsConsentGranted()) return;
  if (!window.gtag) return;

  const campaign = getCampaignAttribution();

  window.gtag("event", eventName, {
    ...campaign,
    ...params,
  });
}
