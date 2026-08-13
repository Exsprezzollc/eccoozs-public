import type { Metadata, Viewport } from "next";
import type React from "react";
import "./globals.css";
import eccoozsEMark from "@/assets/eccoozs-public/eccoozs-e-mark-90d0d033.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://eccoozs.com"),
  title: "ECCOOZS",
  description:
    "Explore ECCOOZS — a growing ecosystem for culture, community, connection, learning, and business discovery.",
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
      <body>{children}</body>
    </html>
  );
}
