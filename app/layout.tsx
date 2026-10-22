import type { Metadata } from "next";
import {
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
  Archivo_Black,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { ThemeProvider } from "./providers";
import { Nav } from "@/components/nav";
import { SideNav } from "@/components/side-nav";
import { CmdPalette } from "@/components/cmd-palette";
import { Footer } from "@/components/footer";
import { EasterEggs } from "@/components/easter-eggs";
import { KbdNotification } from "@/components/kbd-notification";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Ansh Kumar — anshk.tech",
  description:
    "Full-stack builder, hardware hacker, engineer. CLI tools, circuits, and a frankly unreasonable amount of side-projects.",
  openGraph: {
    title: "Ansh Kumar — anshk.tech",
    description:
      "Full-stack builder, hardware hacker, engineer. CLI tools, circuits, and a frankly unreasonable amount of side-projects.",
    url: siteConfig.url,
    siteName: "anshk.tech",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        inter.variable,
        instrumentSerif.variable,
        jetbrainsMono.variable,
        archivoBlack.variable
      )}
    >
      <body className="dotgrid font-sans antialiased bg-paper text-ink min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CmdPalette />
          <EasterEggs />
          <KbdNotification />
          <div className="noise" aria-hidden />

          <div className="flex min-h-screen max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 relative">
            <SideNav />
            <div className="flex-1 w-full min-w-0 pb-10">
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
