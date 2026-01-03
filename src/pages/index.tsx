import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/contact/ContactForm';
import CharterModal from '@/components/charter/CharterModal';
import GalleryModal, { GallerySection } from '@/components/gallery/GalleryModal';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { Plane, Fuel, FileCheck, Utensils, Mail, Phone, User } from 'lucide-react';
import { GetStaticProps } from 'next';

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
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Operations</p>
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
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
