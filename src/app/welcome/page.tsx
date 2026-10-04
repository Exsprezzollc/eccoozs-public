import type { Metadata } from "next";
import WelcomeV6Client from "./WelcomeV6Client";

export const metadata: Metadata = {
  title: "ECCOOZS Social | Black American-Centered Social Media & Community",
  description:
    "ECCOOZS is a Black American-centered social media platform for community, conversation, discovery, creators, businesses, culture, and opportunity.",
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
      "A Black American-centered social platform built for community, conversation, discovery, creators, businesses, and opportunity.",
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
      "A Black American-centered social platform built for community, conversation, discovery, creators, businesses, and opportunity.",
    images: ["/blog/black-centered-social-platform.png"],
  },
};

export default function WelcomePage() {
  return <WelcomeV6Client />;
}
