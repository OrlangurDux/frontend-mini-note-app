import { useEffect } from 'react';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { DomainProvider } from '../contexts/DomainContext';
import { AuthProvider } from '../contexts/AuthContext';
import { NetworkProvider } from '../contexts/NetworkContext';
import { CategoriesProvider } from '../contexts/CategoriesContext';
import { DEFAULT_SEO } from '../lib/seo';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Dev mode's HMR bundles under /_next/static aren't content-hashed the
    // way a production build is — the service worker's cache-first strategy
    // for that path assumes immutability, so in dev it can pin a stale
    // bundle against a live server and spin into a reload loop. Production
    // only.
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  return (
    <DomainProvider>
      <AuthProvider>
       <NetworkProvider>
        <CategoriesProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>{'html, body, #__next { height: 100%; } body { margin: 0; } *:focus-visible { outline: 2px solid #1976d2; outline-offset: 2px; border-radius: 4px; }'}</style>
        </Head>
        <DefaultSeo {...DEFAULT_SEO} />
        <Component {...pageProps} />
        </CategoriesProvider>
       </NetworkProvider>
      </AuthProvider>
    </DomainProvider>
  );
}
