import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { useTranslation } from 'next-i18next';

const totalImages = 23;
const previewImages = 6;

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialImage?: number;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, initialImage = 1 }) => {
  const { t } = useTranslation('common');
  const [currentImage, setCurrentImage] = useState(initialImage);
  const [viewMode, setViewMode] = useState<'grid' | 'lightbox'>('grid');

  const nextImage = () => {
    setCurrentImage((prev) => (prev >= totalImages ? 1 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev <= 1 ? totalImages : prev - 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') onClose();
  };

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
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-serif text-white tracking-widest uppercase">
                {t('gallery')}
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'lightbox' : 'grid')}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                  title={viewMode === 'grid' ? 'View slideshow' : 'View grid'}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full overflow-y-auto px-4 md:px-6 pb-6"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                      {Array.from({ length: totalImages }, (_, i) => i + 1).map((num) => (
                        <motion.div
                          key={num}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: num * 0.02 }}
                          onClick={() => {
                            setCurrentImage(num);
                            setViewMode('lightbox');
                          }}
                          className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                        >
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                          <img
                            src={`/images/img${num}.jpeg`}
                            alt={`Gallery ${num}`}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-white/70 text-xs z-20">
                            {num}/{totalImages}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="lightbox"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center relative px-4"
                  >
                    {/* Previous Button */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 md:left-8 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    {/* Image */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImage}
                        src={`/images/img${currentImage}.jpeg`}
                        alt={`Gallery ${currentImage}`}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="max-h-[80vh] max-w-[90vw] md:max-w-[80vw] object-contain rounded-lg"
                      />
                    </AnimatePresence>

                    {/* Next Button */}
                    <button
                      onClick={nextImage}
                      className="absolute right-4 md:right-8 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full">
                      <span className="text-white font-medium">{currentImage}</span>
                      <span className="text-white/50 mx-2">/</span>
                      <span className="text-white/50">{totalImages}</span>
                    </div>
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

interface GallerySectionProps {
  onOpenModal: (imageNum?: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenModal }) => {
  const { t } = useTranslation('common');

  return (
    <section id="gallery" className="py-24 bg-zinc-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-serif text-center text-white mb-16 tracking-widest uppercase"
        >
          {t('gallery')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: previewImages }, (_, i) => i + 1).map((num) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: num * 0.1 }}
              onClick={() => onOpenModal(num)}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={`/images/img${num}.jpeg`}
                alt={`Gallery Image ${num}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => onOpenModal()}
            className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 group"
          >
            <Grid className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="uppercase tracking-widest text-sm">{t('viewFullGallery')}</span>
            <span className="text-white/50 text-sm">({totalImages} {t('photos')})</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryModal;
