import { SITE_URL } from '../config';

const OG_IMAGE = {
  url: SITE_URL + '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'MiniNote — Your second brain, finally fast.',
};

// Rendered once via <DefaultSeo> in _app.jsx. Per-page <NextSeo> (see
// LandingScreen/NotesScreen/ProfileScreen/NoteDetailScreen) overrides
// title/description/noindex as needed — next-seo merges the two, with the
// page-level tags winning.
export const DEFAULT_SEO = {
  titleTemplate: '%s - MiniNote',
  defaultTitle: 'MiniNote — Your second brain, finally fast.',
  description: 'MiniNote is a quiet, focused notebook for thinking, planning, and shipping. Capture ideas in a keystroke, organize them without folders, find anything in milliseconds — online or off.',
  canonical: SITE_URL,
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'MiniNote',
    title: 'MiniNote — Your second brain, finally fast.',
    description: 'A quiet, focused notebook for thinking, planning, and shipping. Markdown notes, offline-first sync, search that stays fast.',
    images: [OG_IMAGE],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

// SoftwareApplication JSON-LD for the landing page only — app screens are
// behind auth (noindex) and gain nothing from structured data.
export function softwareAppJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MiniNote',
    url: SITE_URL,
    image: OG_IMAGE.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any (Web, PWA)',
    description: DEFAULT_SEO.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}
