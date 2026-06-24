import Head from 'next/head';
import { DomainProvider } from '../contexts/DomainContext';
import { AuthProvider } from '../contexts/AuthContext';
import { CategoriesProvider } from '../contexts/CategoriesContext';

export default function App({ Component, pageProps }) {
  return (
    <DomainProvider>
      <AuthProvider>
       <CategoriesProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>{'html, body, #__next { height: 100%; } body { margin: 0; } *:focus-visible { outline: 2px solid #1976d2; outline-offset: 2px; border-radius: 4px; }'}</style>
        </Head>
        <Component {...pageProps} />
       </CategoriesProvider>
      </AuthProvider>
    </DomainProvider>
  );
}
