import type { Metadata } from "next";
import WelcomeV6Client from "./WelcomeV6Client";

export const metadata: Metadata = {
  title: "ECCOOZS — Culture. Community. Connection.",
  description:
    "Explore ECCOOZS — a growing ecosystem for culture, community, connection, learning, and business discovery.",
};

export default function WelcomePage() {
  return <WelcomeV6Client />;
}
