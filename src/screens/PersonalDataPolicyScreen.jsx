import { NextSeo } from 'next-seo';
import { LegalDocument } from '../components/legal/LegalDocument';
import { personalDataPolicy } from '../lib/legal/personalDataPolicy';

export function PersonalDataPolicyScreen({ t, mode, lang }) {
  const doc = personalDataPolicy[lang] || personalDataPolicy.en;
  return (
    <>
      <NextSeo title={doc.title} description={doc.intro} />
      <LegalDocument mode={mode} t={t} doc={doc} relatedLinks={[
        { href: '/privacy', label: t.footerPrivacy },
        { href: '/cookies', label: t.footerCookies },
      ]} />
    </>
  );
}
