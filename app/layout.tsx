import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/newsreader";
import { getSite } from "@/lib/content";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const siteUrl = getSiteUrl();

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Research & Analysis — Data Science Club",
    template: "%s — Data Science Club",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: `${site.name} · ${site.committee}` }],
  keywords: [
    "data science research",
    "applied machine learning",
    "time-series forecasting",
    "causal inference",
    "health systems",
    "open source",
    "student research",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "Research & Analysis — Data Science Club",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Research & Analysis — Data Science Club",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: `${site.name} — ${site.committee}`,
  description: site.description,
  url: siteUrl,
  email: site.email,
  sameAs: [site.github, site.linkedin],
  address: {
    "@type": "PostalAddress",
    name: site.location,
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
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-serif text-ink antialiased">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 border border-ink bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-background transition-transform focus:translate-y-0"
        >
          Skip to content
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
