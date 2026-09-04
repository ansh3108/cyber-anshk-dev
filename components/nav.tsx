"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Nav() {
  return (
    <nav className="flex items-center justify-between py-12 md:py-16">
      <Link href="/" className="font-serif text-2xl tracking-tight hover:opacity-50 transition-opacity">
        {siteConfig.username}
      </Link>
    </nav>
  );
}
