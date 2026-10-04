import type { Metadata, Viewport } from "next";
import type React from "react";
import "./globals.css";
import eccoozsEMark from "@/assets/eccoozs-public/eccoozs-e-mark-90d0d033.png";
import { GoogleAnalyticsConsent } from "@/components/analytics/GoogleAnalyticsConsent";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://eccoozs.com"),
  title: { default: "ECCOOZS | Social Media, Community, Culture & Opportunity", template: "%s" },
  description:
    "ECCOOZS is a Black American-centered social platform for conversation, discovery, culture, community, business, creators, and opportunity.",
  alternates: { canonical: "https://eccoozs.com" },
  openGraph: {
    title: "ECCOOZS | Culture. Community. Connection.",
    description: "A social platform for conversation, discovery, culture, community, business, creators, and opportunity.",
    url: "https://eccoozs.com",
    siteName: "ECCOOZS",
    type: "website",
  },
  icons: {
    icon: [{ url: eccoozsEMark.src, type: "image/png" }],
    shortcut: [{ url: eccoozsEMark.src, type: "image/png" }],
    apple: [{ url: eccoozsEMark.src, type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#040c1c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          id="eccoozs-consent-default"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function(){ dataLayer.push(arguments); };
              window.gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                functionality_storage: 'granted',
                security_storage: 'granted',
                wait_for_update: 500
              });
            `,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ECCOOZS Technologies LLC",
              alternateName: "ECCOOZS",
              url: "https://eccoozs.com",
              logo: "https://eccoozs.com/eccoozs-wordmark-blue-v2-640.png",
              sameAs: [
                process.env.NEXT_PUBLIC_ECCOOZS_INSTAGRAM,
                process.env.NEXT_PUBLIC_ECCOOZS_FACEBOOK,
                process.env.NEXT_PUBLIC_ECCOOZS_TIKTOK,
                process.env.NEXT_PUBLIC_ECCOOZS_YOUTUBE,
                process.env.NEXT_PUBLIC_ECCOOZS_THREADS,
                process.env.NEXT_PUBLIC_ECCOOZS_X
              ].filter(Boolean)
            }).replace(/</g, "\\u003c")
          }}
        />
        {children}
        <GoogleAnalyticsConsent />
        <SiteAnalytics />
      </body>
    </html>
  );
}
