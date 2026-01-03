import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from 'next-i18next';

const Header = () => {
  const { t } = useTranslation('common');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif text-white tracking-widest uppercase">
          Royal Flight
        </Link>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              {t('services')}
            </Link>
            <Link href="/permits" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              {t('service_permits_title')}
            </Link>
            <Link href="#gallery" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              {t('gallery')}
            </Link>
            <Link href="#contact" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              {t('contact')}
            </Link>
          </nav>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
