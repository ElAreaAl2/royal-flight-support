import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Users, MapPin, ChevronRight } from 'lucide-react';
import { useTranslation } from 'next-i18next';

interface AircraftCategory {
  id: number;
  nameKey: string;
  taglineKey: string;
  capacityKey: string;
  rangeKey: string;
  aircraft: string[];
  image: string;
}

const categories: AircraftCategory[] = [
  {
    id: 1,
    nameKey: 'cat1_name',
    taglineKey: 'cat1_tagline',
    capacityKey: 'cat1_capacity',
    rangeKey: 'cat1_range',
    aircraft: ['Cessna Citation Mustang', 'Embraer Phenom 100', 'Eclipse 550', 'HondaJet HA-420'],
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    nameKey: 'cat2_name',
    taglineKey: 'cat2_tagline',
    capacityKey: 'cat2_capacity',
    rangeKey: 'cat2_range',
    aircraft: ['Cessna Citation CJ1/CJ2/CJ3/CJ4', 'Embraer Phenom 300', 'Beechcraft Premier 1A', 'Learjet 31/35'],
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    nameKey: 'cat3_name',
    taglineKey: 'cat3_tagline',
    capacityKey: 'cat3_capacity',
    rangeKey: 'cat3_range',
    aircraft: ['Hawker 800XP/850XP', 'Cessna Citation XLS/XLS+', 'Learjet 40/45', 'Gulfstream G150'],
    image: 'https://images.unsplash.com/photo-1559268950-2d7ceb2efa3a?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    nameKey: 'cat4_name',
    taglineKey: 'cat4_tagline',
    capacityKey: 'cat4_capacity',
    rangeKey: 'cat4_range',
    aircraft: ['Bombardier Challenger 300/350', 'Gulfstream G200', 'Embraer Legacy 450/500', 'Cessna Citation X'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop'
  },
  {
    id: 5,
    nameKey: 'cat5_name',
    taglineKey: 'cat5_tagline',
    capacityKey: 'cat5_capacity',
    rangeKey: 'cat5_range',
    aircraft: ['Bombardier Challenger 604/605/650', 'Gulfstream G450/G550', 'Dassault Falcon 900EX/2000', 'Embraer Legacy 600/650'],
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&h=600&fit=crop'
  },
  {
    id: 6,
    nameKey: 'cat6_name',
    taglineKey: 'cat6_tagline',
    capacityKey: 'cat6_capacity',
    rangeKey: 'cat6_range',
    aircraft: ['Gulfstream G650/G650ER', 'Bombardier Global 6000/7500', 'Dassault Falcon 7X/8X', 'Gulfstream G700'],
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop'
  }
];

interface CharterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CharterModal: React.FC<CharterModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState<AircraftCategory | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-zinc-900 z-50 overflow-hidden rounded-lg border border-white/10"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-black/80 backdrop-blur-md border-b border-white/10 p-6 z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif text-white tracking-widest uppercase">
                    {t('privateCharter')}
                  </h2>
                  <p className="text-white/50 text-sm mt-1">{t('selectCategory')}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="h-full overflow-y-auto pt-28 pb-8 px-6">
              <AnimatePresence mode="wait">
                {!selectedCategory ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedCategory(category)}
                        className="group cursor-pointer"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                          <img
                            src={category.image}
                            alt={t(category.nameKey)}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <div className="flex items-center gap-2 text-gold text-xs mb-2">
                              <Plane className="w-3 h-3" />
                              <span className="uppercase tracking-wider">{t('category')} {category.id}</span>
                            </div>
                            <h3 className="text-xl font-serif text-white group-hover:text-gold transition-colors">
                              {t(category.nameKey)}
                            </h3>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-white/60 text-sm italic">{t(category.taglineKey)}</p>
                          <div className="flex items-center gap-4 text-white/40 text-xs">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {t(category.capacityKey)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {t(category.rangeKey)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="max-w-4xl mx-auto"
                  >
                    {/* Back button */}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      <span className="text-sm uppercase tracking-wider">{t('backToCategories')}</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                        <img
                          src={selectedCategory.image}
                          alt={t(selectedCategory.nameKey)}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2 text-gold text-xs mb-3">
                          <Plane className="w-4 h-4" />
                          <span className="uppercase tracking-wider">{t('category')} {selectedCategory.id}</span>
                        </div>
                        <h3 className="text-3xl font-serif text-white mb-2">{t(selectedCategory.nameKey)}</h3>
                        <p className="text-white/60 text-lg italic mb-6">{t(selectedCategory.taglineKey)}</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <Users className="w-5 h-5 text-gold mb-2" />
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t('capacity')}</p>
                            <p className="text-white font-medium">{t(selectedCategory.capacityKey)}</p>
                          </div>
                          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <MapPin className="w-5 h-5 text-gold mb-2" />
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t('range')}</p>
                            <p className="text-white font-medium">{t(selectedCategory.rangeKey)}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white/40 text-xs uppercase tracking-wider mb-4">{t('availableAircraft')}</h4>
                          <div className="space-y-2">
                            {selectedCategory.aircraft.map((plane, idx) => (
                              <motion.div
                                key={plane}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-3 p-3 bg-white/5 rounded border border-white/10 hover:border-gold/50 transition-colors"
                              >
                                <div className="w-2 h-2 rounded-full bg-gold" />
                                <span className="text-white">{plane}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-12 text-center p-8 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-lg border border-gold/20"
                    >
                      <h4 className="text-xl font-serif text-white mb-2">{t('readyToFly')}</h4>
                      <p className="text-white/60 mb-4">{t('contactForQuote')}</p>
                      <a
                        href="/#contact"
                        onClick={onClose}
                        className="inline-block bg-gold text-black font-bold py-3 px-8 rounded hover:bg-white transition-colors uppercase tracking-widest text-sm"
                      >
                        {t('requestQuote')}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CharterModal;
