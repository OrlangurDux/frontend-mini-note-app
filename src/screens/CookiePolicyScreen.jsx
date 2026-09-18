import { NextSeo } from 'next-seo';
import { LegalDocument } from '../components/legal/LegalDocument';
import { cookiePolicy } from '../lib/legal/cookiePolicy';

export function CookiePolicyScreen({ t, mode, lang }) {
  const doc = cookiePolicy[lang] || cookiePolicy.en;
  return (
    <>
      <NextSeo title={doc.title} description={doc.intro} />
      <LegalDocument mode={mode} t={t} doc={doc} relatedLinks={[
        { href: '/privacy', label: t.footerPrivacy },
        { href: '/personal-data', label: t.footerPersonalData },
      ]} />
    </>
  );
}
