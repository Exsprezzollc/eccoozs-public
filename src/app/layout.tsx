import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ECCOOZS",
    template: "%s | ECCOOZS",
  },
  description: "ECCOOZS public waitlist. Express. Explore. Elevate.",
  icons: {
    icon: [
      {
        url: "/brand/eccoozs-wordmark-blue-v2-640.png?v=10",
        type: "image/png",
      },
    ],
    shortcut: "/brand/eccoozs-wordmark-blue-v2-640.png?v=10",
    apple: "/brand/eccoozs-wordmark-blue-v2-640.png?v=10",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}





