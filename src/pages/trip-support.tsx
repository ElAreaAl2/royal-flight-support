import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { ShieldCheck, Users, FileCheck, MapPin, Fuel, Plane } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SEO, { SITE_URL } from '@/components/seo/SEO';

const COVERAGE = [
  {
    country: 'Colombia',
    airports: 'Bogotá El Dorado (SKBO) · Cartagena (SKCG) · Medellín (SKRG) · Cali (SKCL) · Barranquilla (SKBQ)',
  },
  { country: 'Perú', airports: 'Lima Jorge Chávez (SPJC)' },
  { country: 'Guatemala', airports: 'Guatemala City (MGGT) · Mundo Maya (MGMM)' },
  { country: 'El Salvador', airports: 'San Salvador (MSLP) · Ilopango (MSSS)' },
  { country: 'México', airports: 'Tapachula (MMTP) · Cozumel (MMCZ)' },
];

const PERMIT_COUNTRIES =
  'Panamá · Cuba · Ecuador · Perú · Brasil · Colombia · Nicaragua · Chile · Guatemala · Bolivia · El Salvador · Estados Unidos · México · Curazao';

const TripSupportPage = () => {
  const { t } = useTranslation('common');

  const services = [
    { icon: <ShieldCheck className="w-8 h-8" />, title: t('ts_service1_title'), desc: t('ts_service1_desc') },
    { icon: <Users className="w-8 h-8" />, title: t('ts_service2_title'), desc: t('ts_service2_desc') },
    { icon: <FileCheck className="w-8 h-8" />, title: t('ts_service3_title'), desc: t('ts_service3_desc') },
    { icon: <MapPin className="w-8 h-8" />, title: t('ts_service4_title'), desc: t('ts_service4_desc') },
    { icon: <Fuel className="w-8 h-8" />, title: t('ts_service5_title'), desc: t('ts_service5_desc') },
    { icon: <Plane className="w-8 h-8" />, title: t('ts_service6_title'), desc: t('ts_service6_desc') },
  ];

  const faqs = [
    { q: t('ts_faq1_q'), a: t('ts_faq1_a') },
    { q: t('ts_faq2_q'), a: t('ts_faq2_a') },
    { q: t('ts_faq3_q'), a: t('ts_faq3_a') },
    { q: t('ts_faq4_q'), a: t('ts_faq4_a') },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('breadcrumbHome'), item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: t('tripSupportNav'), item: `${SITE_URL}/trip-support` },
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
        title={t('seo_trip_title')}
        description={t('seo_trip_desc')}
        keywords={t('seo_trip_keywords')}
        path="/trip-support"
        jsonLd={[breadcrumbJsonLd, faqJsonLd]}
      />
      <Layout>
        <div className="min-h-screen bg-black pt-24">
          <div className="container mx-auto px-6 py-12">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 tracking-widest uppercase">
                {t('ts_h1')}
              </h1>
              <p className="text-white/60 max-w-3xl mx-auto leading-relaxed">{t('ts_intro')}</p>
            </motion.div>

            {/* Services grid */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-serif text-center text-white mb-12 tracking-widest uppercase">
                {t('ts_services_h2')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="text-center p-8 border border-white/10 bg-white/5 rounded-lg hover:border-[#D4AF37]/50 transition-colors duration-500"
                  >
                    <div className="mb-5 inline-block p-4 border border-white/20 rounded-full text-[#D4AF37]">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-serif text-white mb-3 uppercase tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Coverage by airport */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-serif text-center text-white mb-4 tracking-widest uppercase">
                {t('ts_coverage_h2')}
              </h2>
              <p className="text-white/60 text-center max-w-3xl mx-auto mb-10">
                {t('ts_coverage_desc')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {COVERAGE.map((entry) => (
                  <div
                    key={entry.country}
                    className="p-6 border border-white/10 bg-white/5 rounded-lg"
                  >
                    <h3 className="text-lg font-serif text-[#D4AF37] mb-2 uppercase tracking-wide flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {entry.country}
                    </h3>
                    <p className="text-gray-400 text-sm">{entry.airports}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 border border-[#D4AF37]/40 bg-[#D4AF37]/5 rounded-lg text-center">
                <h3 className="text-lg font-serif text-white mb-2 uppercase tracking-wide">
                  {t('ts_regional')}
                </h3>
                <p className="text-gray-300 text-sm">{PERMIT_COUNTRIES}</p>
              </div>
            </motion.section>

            {/* FAQ */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20"
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

            {/* CTA */}
            <div className="text-center pb-12">
              <Link
                href="/#contact"
                className="inline-block px-8 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 uppercase text-sm tracking-widest"
              >
                {t('ts_cta')} →
              </Link>
            </div>
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

export default TripSupportPage;
