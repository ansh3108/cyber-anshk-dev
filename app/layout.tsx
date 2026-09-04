import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./providers";
import { Nav } from "@/components/nav";
import { SideNav } from "@/components/side-nav";
import { CmdPalette } from "@/components/cmd-palette";
import { Footer } from "@/components/footer";
import { EasterEggs } from "@/components/easter-eggs";
import { KbdNotification } from "@/components/kbd-notification";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ansh Kumar — anshk.dev",
  description: "Full-stack builder, hardware hacker, engineer.",
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
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, instrumentSerif.variable, jetbrainsMono.variable)}>
      <body className="font-sans antialiased bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 min-h-screen selection:bg-black/10 dark:selection:bg-white/10 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CmdPalette />
          <EasterEggs />
          <KbdNotification />
          
          <div className="flex min-h-screen max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 relative">
            <SideNav />
            <div className="flex-1 w-full min-w-0 pb-24">
              <Nav />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}