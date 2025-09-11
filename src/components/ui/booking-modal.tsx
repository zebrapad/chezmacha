import React from 'react';
import { Button } from './button';
import { useState } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { getEventImageUrl, hasImageForEventDate } from '@/lib/image-utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  eventPlace: string;
  eventStatus?: string;
}

interface PersonCountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (count: number) => void;
  eventTitle: string;
}

// Animated Counter Component
const AnimatedCounter: React.FC<{
  initialCount: number;
  onConfirm: (count: number) => void;
  onClose: () => void;
  eventTitle: string;
}> = ({ initialCount, onConfirm, onClose, eventTitle }) => {
  const [count, setCount] = useState(initialCount);
  const [prevCount, setPrevCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);

  // Spring animation for smooth count transitions
  const springCount = useSpring(count, { stiffness: 100, damping: 15 });
  
  // Color transformation based on count
  const backgroundColor = useTransform(
    springCount,
    [0, 50, 100],
    ['rgb(245, 245, 245)', 'rgb(219, 234, 254)', 'rgb(196, 181, 253)']
  );
  
  const textColor = useTransform(
    springCount,
    [0, 50, 100],
    ['rgb(23, 23, 23)', 'rgb(30, 64, 175)', 'rgb(91, 33, 182)']
  );

  const increment = () => {
    setPrevCount(count);
    setCount(prev => Math.min(10, prev + 1));
    triggerAnimation();
  };
  
  const decrement = () => {
    setPrevCount(count);
    setCount(prev => Math.max(1, prev - 1));
    triggerAnimation();
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Convert count to padded string for digit animation with proper negative handling
  const formatNumber = (num: number) => {
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    const paddedNum = absNum.toString().padStart(3, '0');
    return { digits: paddedNum.split(''), isNegative };
  };

  const currentFormatted = formatNumber(count);
  const previousFormatted = formatNumber(prevCount);
  
  const currentDigits = currentFormatted.digits;
  const previousDigits = previousFormatted.digits;
  const showNegativeSign = currentFormatted.isNegative;
  const showPreviousNegativeSign = previousFormatted.isNegative;

  const handleConfirm = () => {
    onConfirm(count);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-lg overflow-hidden max-w-md w-full"
        animate={{ 
          scale: isAnimating ? 1.02 : 1,
          rotateX: isAnimating ? 2 : 0,
          opacity: 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        initial={{ scale: 0.9, opacity: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10"
        >
          ×
        </button>

        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgb(59, 130, 246) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgb(147, 51, 234) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgb(34, 197, 94) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgb(59, 130, 246) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative text-center">
          <h3 className="text-xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>
            Nombre de personnes
          </h3>
          
          <p className="text-gray-600 mb-6">
            Pour combien de personnes souhaitez-vous réserver pour <strong className="text-gray-800">{eventTitle}</strong> ?
          </p>
          
          <div className="relative flex items-center justify-center gap-6 mb-6">
            {/* Decrease Button with Ripple Effect */}
            <motion.button
              onClick={decrement}
              className="relative w-14 h-14 bg-white hover:bg-gray-100 text-gray-700 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-md overflow-hidden group border-2 border-gray-200"
              whileHover={{ scale: 1.05, rotateZ: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Decrease counter"
            >
              <motion.div
                className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-20"
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={{ rotateZ: isAnimating && count < prevCount ? [0, -180, 0] : 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-700"
              >
                −
              </motion.span>
            </motion.button>

            {/* Enhanced Counter Display */}
            <div className="relative">
              {/* 3D Counter Display */}
              <motion.div 
                className="min-w-[140px] h-20 bg-white rounded-2xl border-2 border-gray-300 flex items-center justify-center relative overflow-hidden shadow-inner"
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
                animate={{ 
                  rotateY: isAnimating ? [0, 5, 0] : 0,
                  boxShadow: isAnimating 
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
                    : "0 10px 25px -5px rgba(0, 0, 0, 0.1), inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                  animate={{ 
                    x: isAnimating ? [-100, 200] : -100,
                    opacity: isAnimating ? [0, 0.3, 0] : 0
                  }}
                  transition={{ duration: 0.6 }}
                />

                <div className="flex items-center justify-center relative z-10">
                  {/* Negative Sign */}
                  <AnimatePresence>
                    {showNegativeSign && (
                      <motion.span
                        key="negative-sign"
                        className="text-3xl font-bold font-mono text-black"
                        initial={{ opacity: 0, scale: 0.7, x: 15, rotateX: 90 }}
                        animate={{ opacity: 1, scale: 1, x: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.7, x: 15, rotateX: -90 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        −
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Digits */}
                  <div className="flex">
                    {currentDigits.map((digit, index) => {
                      const hasChanged = digit !== previousDigits[index] || showNegativeSign !== showPreviousNegativeSign;
                      const isIncreasing = count > prevCount;
                      
                      return (
                        <div key={index} className="relative w-6 h-10 flex items-center justify-center overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={`${index}-${digit}-${showNegativeSign}`}
                              className="text-3xl font-bold font-mono absolute text-black"
                              initial={hasChanged ? {
                                y: isIncreasing ? -40 : 40,
                                opacity: 0,
                                scale: 0.7,
                                rotateX: isIncreasing ? 90 : -90
                              } : {
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                rotateX: 0
                              }}
                              animate={{
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                rotateX: 0
                              }}
                              exit={hasChanged ? {
                                y: isIncreasing ? 40 : -40,
                                opacity: 0,
                                scale: 0.7,
                                rotateX: isIncreasing ? -90 : 90
                              } : {
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                rotateX: 0
                              }}
                              transition={{
                                duration: 0.4,
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                            >
                              {digit}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Increase Button with Enhanced Animation */}
            <motion.button
              onClick={increment}
              className="relative w-14 h-14 bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-md overflow-hidden group border-2 border-yellow-500"
              whileHover={{ scale: 1.05, rotateZ: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Increase counter"
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={{ 
                  rotateZ: isAnimating && count > prevCount ? [0, 180, 0] : 0,
                  scale: isAnimating && count > prevCount ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                +
              </motion.span>
            </motion.button>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            {count === 1 ? '1 personne' : `${count} personnes`}
          </p>
          
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              className="flex-1 bg-white hover:bg-gray-100 text-gray-700 rounded-2xl border-2 border-gray-200 font-bold shadow-md"
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl border-2 border-yellow-500 font-bold shadow-md"
            >
              Continuer
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  eventTitle,
  eventDate,
  eventPlace,
  eventStatus,
}) => {

  if (!isOpen) return null;

  // Extract date from eventDate (format: "04 SEP 2025")
  const getEventMedia = () => {
    // Parse the event date to extract YYYY-MM-DD format
    const dateParts = eventDate.split(' ');
    if (dateParts.length >= 3) {
      const day = dateParts[0].padStart(2, '0');
      const month = dateParts[1];
      const year = dateParts[2];
      
      // Convert month name to number
      const monthMap: { [key: string]: string } = {
        'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
        'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08',
        'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
      };
      
      const monthNum = monthMap[month] || '09';
      const dateString = `${year}-${monthNum}-${day}`;
      
      // Use the robust image detection system
      if (hasImageForEventDate(dateString)) {
        return {
          src: getEventImageUrl(dateString),
          type: 'image'
        };
      }
    }
    
    // Fallback to vizorek image if no specific date media found
    return {
      src: `/asset/event/optimized_vizorek.jpg?v=${Date.now()}`,
      type: 'image'
    };
  };

  const isVideo = (src: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
  };

  const getMediaWithFallback = (baseDate: string) => {
    const possibleExtensions = ['.mp4', '.webm', '.mov', '.jpeg', '.jpg', '.png'];
    
    // For now, return the .jpeg version, but you can extend this to try different extensions
    // In a real implementation, you might want to check which file actually exists
    return `/asset/guest/${baseDate}.jpeg`;
  };

  const handleTicketTypeSelect = (ticketType: 'normal' | 'solidarity') => {
    // Redirect directly to Stripe based on ticket type
    if (ticketType === 'normal') {
      // Entrée normale - Standard price
      const stripeUrl = 'https://buy.stripe.com/7sY3cvaNh8695Ml1b8bfO02';
      window.open(stripeUrl, '_blank');
    } else if (ticketType === 'solidarity') {
      // Entrée solidaire - Reduced price
      const stripeUrl = 'https://buy.stripe.com/4gM28r5sXeux6Qp6vsbfO01';
      window.open(stripeUrl, '_blank');
    }
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg max-w-4xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>
            {eventTitle}
          </h3>
          
          <div className="mb-6">
            {(() => {
              const media = getEventMedia();
              // Only show video if explicitly set as video type
              const isVideoFile = media.type === 'video';
              
              if (isVideoFile) {
                return (
                  <video 
                    src={media.src}
                    className="w-full h-[32rem] object-contain rounded-lg bg-black"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                );
              } else {
                return (
                  <img 
                    src={media.src} 
                    alt={`Event booking for ${eventTitle}`} 
                    className="w-full h-[32rem] object-contain rounded-lg bg-black"
                  />
                );
              }
            })()}
          </div>
          
          {eventStatus !== 'CLOSED' && (
            <div className="mb-6">
              <p className="text-gray-300 text-lg mb-4 text-center">
                <strong>Choisis ton type de billet</strong>
              </p>
              
              <div className="space-y-3 max-w-md mx-auto">
                {/* Normal Ticket Option */}
                <button
                  onClick={() => handleTicketTypeSelect('normal')}
                  className="w-full p-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl border-2 border-zinc-600 hover:border-yellow-500 transition-all duration-200 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">Entrée normale</h4>
                      <p className="text-sm text-gray-400">Prix standard</p>
                    </div>
                    <div className="text-yellow-500 text-2xl ml-4">🎫</div>
                  </div>
                </button>

                {/* Solidarity Ticket Option */}
                <button
                  onClick={() => handleTicketTypeSelect('solidarity')}
                  className="w-full p-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl border-2 border-zinc-600 hover:border-green-500 transition-all duration-200 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">Entrée solidaire</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Ta place + 1 place offerte à un senior pour une soirée stand-up en maison de repos
                      </p>
                    </div>
                    <div className="text-green-500 text-2xl ml-4">🤝</div>
                  </div>
                </button>
              </div>
            </div>
          )}
          
          {eventStatus === 'CLOSED' && (
            <div className="mb-6">
              <p className="text-gray-400 text-lg mb-2 text-center">
                <strong>Cet événement est terminé</strong>
              </p>
              <p className="text-gray-500 text-sm text-center">
                Qui étaient nos humoristes du jour?
              </p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};
