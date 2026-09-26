"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  analyticsConsentGranted,
  destinationCategory,
  initializeCampaignAttribution,
  pageCategory,
  safeAnalyticsUrl,
  trackEccoozsEvent,
} from "@/lib/analytics";

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;
const ENGAGEMENT_MILESTONES = [30, 60, 180] as const;

function normalizedText(element: Element): string {
  return (element.textContent || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const pageViewSent = useRef<string | null>(null);

  useEffect(() => {
    initializeCampaignAttribution();

    const category = pageCategory(pathname);

    const sendPageView = () => {
      if (!analyticsConsentGranted()) return;
      if (pageViewSent.current === pathname) return;

      pageViewSent.current = pathname;
      trackEccoozsEvent("eccoozs_page_view", {
        page_path: pathname,
        page_category: category,
        page_title: document.title,
      });
    };

    sendPageView();

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<{ choice?: string }>).detail;
      if (detail?.choice === "granted") sendPageView();
    };

    window.addEventListener("eccoozs:analytics-consent", onConsent);

    const reached = new Set<number>();
    let scrollFrame = 0;

    const onScroll = () => {
      if (!analyticsConsentGranted()) return;
      if (scrollFrame) return;

      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;

        const doc = document.documentElement;
        const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
        const percent = Math.min(
          100,
          Math.round((window.scrollY / scrollable) * 100)
        );

        for (const threshold of SCROLL_THRESHOLDS) {
          if (percent < threshold || reached.has(threshold)) continue;

          reached.add(threshold);
          trackEccoozsEvent("eccoozs_scroll_depth", {
            page_path: pathname,
            page_category: category,
            scroll_percent: threshold,
          });

          if (threshold === 50 && category === "history") {
            trackEccoozsEvent("history_engagement", {
              page_path: pathname,
              engagement_type: "50_percent_scroll",
            });
          }

          if (threshold === 50 && category === "bellmont") {
            trackEccoozsEvent("bellmont_engagement", {
              page_path: pathname,
              engagement_type: "50_percent_scroll",
            });
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const timers = ENGAGEMENT_MILESTONES.map((seconds) =>
      window.setTimeout(() => {
        if (document.visibilityState !== "visible") return;

        trackEccoozsEvent("eccoozs_engagement", {
          page_path: pathname,
          page_category: category,
          engaged_seconds: seconds,
        });
      }, seconds * 1000)
    );

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const actionable = target.closest("a, button");
      if (!actionable) return;

      const linkText = normalizedText(actionable);
      const elementType = actionable.tagName.toLowerCase();

      if (actionable instanceof HTMLAnchorElement) {
        const href = actionable.href;
        const destination = destinationCategory(href);
        const targetUrl = safeAnalyticsUrl(href);

        trackEccoozsEvent("eccoozs_click", {
          page_path: pathname,
          page_category: category,
          element_type: elementType,
          link_text: linkText,
          destination_category: destination,
          target_url: targetUrl,
        });

        if (
          ["social", "bellmont", "history", "commerce", "learning"].includes(
            destination
          )
        ) {
          trackEccoozsEvent("ecosystem_destination_click", {
            page_path: pathname,
            destination_category: destination,
            target_url: targetUrl,
            link_text: linkText,
          });
        }

        if (destination === "social") {
          trackEccoozsEvent("social_entry_click", {
            page_path: pathname,
            target_url: targetUrl,
            link_text: linkText,
          });
        }

        if (destination === "commerce") {
          trackEccoozsEvent("house_of_eccoozs_referral", {
            page_path: pathname,
            source_category: category,
            target_url: targetUrl,
            link_text: linkText,
          });
        }

        return;
      }

      trackEccoozsEvent("eccoozs_click", {
        page_path: pathname,
        page_category: category,
        element_type: elementType,
        link_text: linkText,
      });
    };

    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("eccoozs:analytics-consent", onConsent);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pathname]);

  return null;
}
