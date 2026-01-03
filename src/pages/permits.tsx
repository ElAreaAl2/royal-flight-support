import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';

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

  return (
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
        </div>
      </div>
    </Layout>
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
