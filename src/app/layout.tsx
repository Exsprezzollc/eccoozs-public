// ✅ FILE: src/app/layout.tsx

// ✅ FILE: src/app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import type React from "react";

import ClientProviders from "./ClientProviders";
import { AdsConfigProvider } from "@/lib/ads-config-store";
import { PostComposerProvider } from "@/components/Post/PostComposerProvider";
import ScreenTimeHeartbeatClient from "@/components/layout/ScreenTimeHeartbeatClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://eccoozs.com"),
  title: "ECCOOZS",
  description: "Explore. Express. Elevate.",
  icons: {
    icon: [
      {
        url: "/favicon.ico?v=8",
        sizes: "any",
      },
      {
        url: "/icon.svg?v=8",
        type: "image/svg+xml",
      },
    ],
    shortcut: ["/favicon.ico?v=8"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <AdsConfigProvider>
          <PostComposerProvider>
            <ClientProviders>
              <ScreenTimeHeartbeatClient />
              {children}
            </ClientProviders>
          </PostComposerProvider>
        </AdsConfigProvider>
      </body>
    </html>
  );
}