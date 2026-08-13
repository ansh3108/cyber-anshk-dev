import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarLeft } from "@/components/SidebarLeft";
import { SidebarRight } from "@/components/SidebarRight";
import TargetCursor from "@/components/TargetCursor";
import { CommandPalette } from "@/components/CommandPalette";

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
    <html lang="en" className={cn(geist.variable, jetbrainsMono.variable, "dark")}>
      <body className="font-sans antialiased bg-[#151618] text-[#F4F4F5] min-h-screen relative selection:bg-[#9B8CFF]/20">
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor={true}
          parallaxOn={true}
          cursorColor="#A1A1AA"
          cursorColorOnTarget="#9B8CFF"
          targetSelector=".cursor-target"
        />
        <CommandPalette />

        {/* Subtle Ambient Lighting */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.025)_0%,transparent_70%)] mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(110,168,255,0.015)_0%,transparent_70%)] mix-blend-screen" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(17,18,20,0.95)_100%)] pointer-events-none" />
        </div>

        <div className="flex min-h-screen grain relative z-10">
          <SidebarLeft />
          <main className="flex-1 md:ml-20 flex justify-center w-full pt-16 md:pt-0">
            <div className="w-full max-w-[1600px] flex mx-auto">
              <div className="flex-1 px-4 md:px-12 py-6 w-full max-w-full xl:max-w-[calc(100%-340px)]">
                {children}
              </div>
              <SidebarRight />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}