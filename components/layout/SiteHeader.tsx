import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="no-print fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-charcoal via-charcoal/70 to-transparent px-6 py-5 backdrop-blur-sm sm:px-8">
      <a
        href="#hero"
        className="font-display text-sm font-medium tracking-tight text-soft-white/90 transition-colors hover:text-soft-white"
      >
        {profile.name}
      </a>
      <nav aria-label="Utility" className="flex items-center gap-5 text-xs text-warm-gray">
        <Link href="/resume" className="transition-colors hover:text-soft-white">
          Résumé
        </Link>
        <a href="#contact" className="transition-colors hover:text-soft-white">
          Connect
        </a>
      </nav>
    </header>
  );
}
