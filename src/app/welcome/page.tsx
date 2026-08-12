import type { Metadata } from "next";
import WelcomeV6Client from "./WelcomeV6Client";

export const metadata: Metadata = {
  title: "Eccoozs \u2014 Culture. Conversation. Community.",
  description: "ECCOOZS \u2014 Culture. Conversation. Community.",
};

export default function WelcomePage() {
  return <WelcomeV6Client />;
}
