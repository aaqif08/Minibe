import type { Metadata, Viewport } from "next";
import { IBM_Plex_Serif, Manrope } from "next/font/google";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import "./globals.css";

// Only the cuts the design uses: light (+ italic) for quotes/leads,
// regular for menu names, bold for display. Latin covers "MINIBÉ".
const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: {
    default: site.seo.title,
    template: `%s — ${site.name}`,
  },
  description: site.seo.description,
  alternates: { canonical: "/" },
  keywords: [
    "MINIBÉ",
    "Minibe Bengaluru",
    "dessert dining Bangalore",
    "experiential dessert dining",
    "tasting menu Bengaluru",
    "Chef Jenny",
    "Andaman",
    "dessert tasting menu",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  alternateName: `${site.name} — ${site.tagline} ${site.by}`,
  description: site.seo.description,
  url: site.seo.url,
  image: `${site.seo.url}/opengraph-image.jpg`,
  servesCuisine: ["Dessert", "Tasting menu"],
  acceptsReservations: site.links.reserve,
  founder: [{ "@type": "Person", name: "Chef Jenny" }],
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.links.maps,
  sameAs: [site.links.instagram, site.links.maps],
  ...(site.phone ? { telephone: site.phone } : {}),
  ...(site.hours.schedule?.length
    ? {
        openingHoursSpecification: site.hours.schedule.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days,
          opens: h.open,
          closes: h.close,
        })),
      }
    : {}),
};

// Adds the `motion` class before first paint so reveal targets start hidden
// only when animations will actually run (respects prefers-reduced-motion).
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plexSerif.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-orange focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
