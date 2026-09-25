import React from 'react';
import dynamic from 'next/dynamic';
import SEO, { SITE_URL } from '@/components/seo/SEO';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import { permitsData, countryNames } from '../data/permits';

// Dynamically import the map component with no SSR (required for react-simple-maps)
const PermitsMap = dynamic(() => import('../components/permits/PermitsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-black/50 rounded-xl flex items-center justify-center">
      <div className="text-white/50">Loading map...</div>
    </div>
  ),
});

const PermitsPage = () => {
  const { t } = useTranslation('common');

  const faqs = [
    { q: t('permits_faq1_q'), a: t('permits_faq1_a') },
    { q: t('permits_faq2_q'), a: t('permits_faq2_a') },
    { q: t('permits_faq3_q'), a: t('permits_faq3_a') },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('breadcrumbHome'), item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: t('permitsAndHandling'), item: `${SITE_URL}/permits` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <SEO
        title={t('seo_permits_title')}
        description={t('seo_permits_desc')}
        keywords={t('seo_permits_keywords')}
        path="/permits"
        jsonLd={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Layout>
      <div className="min-h-screen bg-black pt-24">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-serif text-center text-white mb-4 tracking-widest uppercase">
              {t('permitsAndHandling')}
            </h1>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
              {t('permitsDescription')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PermitsMap />
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#D4AF37]" />
              <span className="text-white/70 text-sm">{t('permitCountries')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white border-2 border-[#D4AF37]" />
              <span className="text-white/70 text-sm">{t('clickForDetails')}</span>
            </div>
          </motion.div>

          {/* Permit coverage by country (text list for SEO) */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-center text-white mb-4 tracking-widest uppercase">
              {t('permits_h2_list')}
            </h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-10">
              {t('permits_list_desc')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(permitsData).map((iso) => {
                const data = permitsData[iso];
                return (
                  <div key={iso} className="p-6 border border-white/10 bg-white/5 rounded-lg hover:border-[#D4AF37]/50 transition-colors">
                    <h3 className="text-xl font-serif text-white mb-3 uppercase tracking-wide">
                      {countryNames[iso] || iso}
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      {data.overflight && (
                        <li className="text-[#D4AF37]">✓ {t('label_overflight')}</li>
                      )}
                      {data.landing && (
                        <li className="text-[#D4AF37]">✓ {t('label_landing')}</li>
                      )}
                      {data.handling && (
                        <li>
                          <span className="text-[#D4AF37]">✓ {t('label_handling')}:</span>{' '}
                          {data.handling.map((h) => `${h.name} (${h.code})`).join(', ')}
                        </li>
                      )}
                      {data.other?.map((o) => (
                        <li key={o}>• {o}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* FAQ (visible + FAQPage schema) */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-center text-white mb-10 tracking-widest uppercase">
              {t('ts_faq_h2')}
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              {faqs.map((f) => (
                <div key={f.q} className="border border-white/10 bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-2">{f.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default PermitsPage;
