import type { Metadata } from "next";
import WelcomeV6Client from "./WelcomeV6Client";

export const metadata: Metadata = {
  title: "ECCOOZS Social | Black American-Centered Social Media & Community",
  description:
    "ECCOOZS is a Foundational Black American-centered, community-first general social network for conversation, discovery, culture, business discovery, creator opportunity, and live audio, welcoming respectful participation from people of all backgrounds.",
  alternates: { canonical: "https://eccoozs.com/welcome" },
  keywords: [
    "ECCOOZS",
    "Black social media platform",
    "Black social network",
    "social media for Black Americans",
    "Facebook alternative",
    "new social media platform",
    "community social network",
  ],
  openGraph: {
    title: "ECCOOZS Social | Community. Conversation. Culture. Opportunity.",
    description:
      "A Foundational Black American-centered, community-first general social network built for conversation, discovery, culture, business discovery, creator opportunity, and live audio, welcoming respectful participation from people of all backgrounds.",
    url: "https://eccoozs.com/welcome",
    siteName: "ECCOOZS",
    type: "website",
    images: [{
      url: "/blog/black-centered-social-platform.png",
      width: 1672,
      height: 941,
      alt: "ECCOOZS social community",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECCOOZS Social",
    description:
      "A Foundational Black American-centered social platform that welcomes respectful participation from people of all backgrounds.",
    images: ["/blog/black-centered-social-platform.png"],
  },
};

export default function WelcomePage() {
  const socialJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://eccoozs.com/welcome#social",
    name: "ECCOOZS Social",
    alternateName: "ECCOOZS",
    url: "https://eccoozs.com/welcome",
    applicationCategory: "SocialNetworkingApplication",
    operatingSystem: "Web",
    description:
      "ECCOOZS is a Foundational Black American-centered, community-first general social network built for conversation, discovery, culture, business discovery, creator opportunity, and live audio through Soundrooms, welcoming respectful participation from people of all backgrounds.",
    provider: { "@id": "https://eccoozs.com/#organization" },
    isPartOf: { "@id": "https://eccoozs.com/#website" },
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(socialJsonLd).replace(/</g, "\\u003c") }}
      />
      <WelcomeV6Client />
    </>
  );
}
