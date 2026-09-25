import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from 'next-i18next';

const Header = () => {
  const { t } = useTranslation('common');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
  }, [typeof window === 'undefined' ? '' : window.location.pathname]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || mobileOpen ? 'bg-black/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif text-white tracking-widest uppercase" onClick={closeMenu}>
          Royal Flight
        </Link>

        <div className="flex items-center gap-6">
          {/* Navegación desktop: secciones de la home SIEMPRE con /# para que funcionen desde cualquier página */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#services" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              {t('services')}
            </Link>
            <Link href="/trip-support" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              {t('tripSupportNav')}
            </Link>
            <Link href="/permits" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              {t('service_permits_title')}
            </Link>
            <Link href="/#gallery" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              {t('gallery')}
            </Link>
            <Link href="/#contact" className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase">
              {t('contact')}
            </Link>
          </nav>
          <LanguageToggle />

          {/* Botón hamburguesa (visible solo móvil) */}
          <button
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-white"
          >
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-0' : ''}`} />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <nav
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/95 backdrop-blur-sm container mx-auto px-6 pt-2 pb-4 flex flex-col">
          <Link href="/#services" onClick={closeMenu} className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase py-3 border-b border-white/10">
            {t('services')}
          </Link>
          <Link href="/trip-support" onClick={closeMenu} className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase py-3 border-b border-white/10">
            {t('tripSupportNav')}
          </Link>
          <Link href="/permits" onClick={closeMenu} className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase py-3 border-b border-white/10">
            {t('service_permits_title')}
          </Link>
          <Link href="/#gallery" onClick={closeMenu} className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase py-3 border-b border-white/10">
            {t('gallery')}
          </Link>
          <Link href="/#contact" onClick={closeMenu} className="text-white/80 hover:text-white transition-colors text-sm tracking-widest uppercase py-3">
            {t('contact')}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
