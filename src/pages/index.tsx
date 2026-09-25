import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import SEO, { SITE_URL } from '@/components/seo/SEO';
import ContactForm from '@/components/contact/ContactForm';
import CharterModal from '@/components/charter/CharterModal';
import GalleryModal, { GallerySection } from '@/components/gallery/GalleryModal';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { Plane, Fuel, FileCheck, Utensils, Mail, Phone, User, MapPin } from 'lucide-react';
import { GetStaticProps } from 'next';

const SERVICE_CITIES = [
  'Bogotá',
  'Lima',
  'Cartagena',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Guatemala City',
  'San Salvador',
  'Tapachula',
  'Cozumel',
];

const SERVED_COUNTRIES = [
  'Colombia',
  'Perú',
  'Ecuador',
  'Brasil',
  'Chile',
  'Bolivia',
  'Panamá',
  'Nicaragua',
  'Guatemala',
  'El Salvador',
  'México',
  'Cuba',
  'Curazao',
  'Estados Unidos',
];

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Royal Flight Support',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/og-image.jpg`,
  email: 'Ops@royal-flightsupport.com',
  telephone: '+573002827853',
  founder: {
    '@type': 'Person',
    name: 'Santiago Prieto Durán',
    jobTitle: 'CEO',
  },
  areaServed: SERVED_COUNTRIES.map((name) => ({ '@type': 'Country', name })),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'flight operations and sales',
    email: 'Ops@royal-flightsupport.com',
    telephone: '+573002827853',
    availableLanguage: ['English', 'Spanish'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Aviation services in Latin America',
    itemListElement: [
      { position: 1, '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Trip Support', serviceType: 'Flight trip support' } },
      { position: 2, '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'FBO & Ground Handling', serviceType: 'FBO and ground handling services' } },
      { position: 3, '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Overflight Permits', serviceType: 'Overflight permit services' } },
      { position: 4, '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landing Permits', serviceType: 'Landing permit services' } },
      { position: 5, '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Jet Fuel Supply', serviceType: 'Jet A-1 fuel supply' } },
      { position: 6, '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Private Charter', serviceType: 'Private jet charter' } },
      { position: 7, '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'In-Flight Catering', serviceType: 'In-flight catering' } },
    ],
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Royal Flight Support',
  inLanguage: ['en', 'es'],
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function Home() {
  const { t } = useTranslation('common');
  const [charterModalOpen, setCharterModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [initialGalleryImage, setInitialGalleryImage] = useState(1);

  useEffect(() => {
    // Ensure page starts at top unless there is a hash link
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const services = [
    { icon: <Plane className="w-8 h-8" />, title: t('service_charter_title'), desc: t('service_charter_desc'), link: null, action: () => setCharterModalOpen(true) },
    { icon: <FileCheck className="w-8 h-8" />, title: t('service_permits_title'), desc: t('service_permits_desc'), link: '/permits', action: null },
    { icon: <Fuel className="w-8 h-8" />, title: t('service_fuel_title'), desc: t('service_fuel_desc'), link: null, action: null },
    { icon: <Utensils className="w-8 h-8" />, title: t('service_catering_title'), desc: t('service_catering_desc'), link: null, action: null },
  ];

  return (
    <>
      <SEO
        title={t('seo_home_title')}
        description={t('seo_home_desc')}
        keywords={t('seo_home_keywords')}
        path=""
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />
      <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Placeholder for video/image */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop" 
            alt="Private Jet" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif text-white mb-6 tracking-widest uppercase"
          >
            Royal Flight Support
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-300 tracking-wide uppercase"
          >
            {t('tagline')}
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif text-center text-white mb-16 tracking-widest uppercase"
          >
            {t('services')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((service, index) => {
              const content = (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-center group ${service.link || service.action ? 'cursor-pointer' : ''}`}
                  onClick={service.action || undefined}
                >
                  <div className="mb-6 inline-block p-4 border border-white/20 rounded-full group-hover:border-white transition-colors duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3 uppercase tracking-wide">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.desc}</p>
                  {(service.link || service.action) && (
                    <span className="text-white/50 text-xs mt-2 block group-hover:text-white transition-colors">
                      {t('clickToView')} →
                    </span>
                  )}
                </motion.div>
              );
              return service.link ? (
                <Link key={index} href={service.link}>{content}</Link>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage / FBO & Trip Support section */}
      <section id="coverage" className="py-24 bg-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif text-center text-white mb-6 tracking-widest uppercase"
          >
            {t('coverage_title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-center max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {t('coverage_desc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {SERVICE_CITIES.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1 px-4 py-2 border border-[#D4AF37]/40 text-white/80 text-xs uppercase tracking-widest"
              >
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                {city}
              </span>
            ))}
          </motion.div>

          <p className="text-gray-500 text-xs text-center mb-10 uppercase tracking-widest">
            {SERVED_COUNTRIES.join(' · ')}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/trip-support"
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 uppercase text-sm tracking-widest"
            >
              {t('coverage_view_services')} →
            </Link>
            <Link
              href="/permits"
              className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 uppercase text-sm tracking-widest"
            >
              {t('coverage_view_permits')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection
        onOpenModal={(imageNum) => {
          if (imageNum) setInitialGalleryImage(imageNum);
          setGalleryModalOpen(true);
        }} 
      />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif text-center text-white mb-16 tracking-widest uppercase"
          >
            {t('contact')}
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ContactForm />
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white space-y-8 p-8 border border-white/10 rounded-lg bg-white/5"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-1 text-white">Santiago Prieto Durán</h3>
                  <p className="text-gray-400 text-sm uppercase tracking-wider">CEO</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <a href="mailto:Ops@royal-flightsupport.com" className="text-gray-300 hover:text-white transition-colors break-all">
                    Ops@royal-flightsupport.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <a href="tel:+573002827853" className="text-gray-300 hover:text-white transition-colors">
                    +57 300 282 7853
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Charter Modal */}
      <CharterModal isOpen={charterModalOpen} onClose={() => setCharterModalOpen(false)} />
      
      {/* Gallery Modal */}
      <GalleryModal 
        isOpen={galleryModalOpen} 
        onClose={() => setGalleryModalOpen(false)} 
        initialImage={initialGalleryImage}
        />
        </Layout>
        </>
        );
        }

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
