import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://shahinmirshekari.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Design × Marketing × Analytics`,
    template: `%s — ${profile.name}`,
  },
  description: profile.heroSummary,
  keywords: [
    "Shahin Mirshekari",
    "Manager, Commercial Analytics",
    "Commercial Analytics",
    "Marketing Analytics",
    "Power BI",
    "Data Visualization",
    "Business Analytics",
    "Katz Graduate School of Business",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    url: siteUrl,
    title: `${profile.name} — Design × Marketing × Analytics`,
    description: profile.heroSummary,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Design × Marketing × Analytics`,
    description: profile.heroSummary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.currentTitle,
  description: profile.heroSummary,
  url: siteUrl,
  sameAs: profile.sameAs.filter((url) => !url.includes("PLACEHOLDER")),
  knowsAbout: [
    "Data Analytics",
    "Marketing Analytics",
    "Data Visualization",
    "Business Intelligence",
    "Information Design",
    "Community Leadership",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-charcoal text-soft-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-soft-white focus:px-4 focus:py-2 focus:text-charcoal"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
