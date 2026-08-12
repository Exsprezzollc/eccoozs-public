import type { Metadata } from "next";
import WelcomeV6Client from "./WelcomeV6Client";

export const metadata: Metadata = {
  title: "Eccoozs — Culture. Conversation. Community.",
  description: "ECCOOZS — Culture. Conversation. Community.",
};

export default function WelcomePage() {
  return <WelcomeV6Client />;
}
