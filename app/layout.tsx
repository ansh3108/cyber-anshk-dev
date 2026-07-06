import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ansh Kumar — Builder",
  description:
    "Full-stack builder crafting decentralized systems, open-source tools, and hardware. Rust · Solana · TypeScript · PCB Design.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(geist.variable, jetbrainsMono.variable)}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}