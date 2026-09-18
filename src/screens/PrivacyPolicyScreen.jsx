import { NextSeo } from 'next-seo';
import { LegalDocument } from '../components/legal/LegalDocument';
import { privacyPolicy } from '../lib/legal/privacyPolicy';

export function PrivacyPolicyScreen({ t, mode, lang }) {
  const doc = privacyPolicy[lang] || privacyPolicy.en;
  return (
    <>
      <NextSeo title={doc.title} description={doc.intro} />
      <LegalDocument mode={mode} t={t} doc={doc} relatedLinks={[
        { href: '/cookies', label: t.footerCookies },
        { href: '/personal-data', label: t.footerPersonalData },
      ]} />
    </>
  );
}
