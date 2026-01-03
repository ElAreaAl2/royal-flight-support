import React from 'react';
import { useRouter } from 'next/router';

const LanguageToggle = () => {
  const router = useRouter();
  const { locale, asPath } = router;

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    router.push(asPath, asPath, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 uppercase text-sm tracking-widest"
    >
      {locale === 'en' ? 'ES' : 'EN'}
    </button>
  );
};

export default LanguageToggle;