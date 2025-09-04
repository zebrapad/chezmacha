import React from 'react';
import { Button } from './button';
import { useState } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  eventPlace: string;
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
          rotateX: isAnimating ? 2 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
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
}) => {
  const [showPersonCount, setShowPersonCount] = React.useState(false);
  const [personCount, setPersonCount] = React.useState(1);

  if (!isOpen) return null;

  // Extract date from eventDate (format: "04 SEP 2025")
  const getEventMedia = () => {
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
      const mediaDate = `${year}-${monthNum}-${day}`;
      
      // Check if we have a specific media file for this date
      const availableMedia = ['2025-09-04', '2025-09-18', '2025-09-19', '2025-09-28'];
      if (availableMedia.includes(mediaDate)) {
        // Use image for all events (no more video)
        return {
          src: `/asset/guest/${mediaDate}.jpeg`,
          type: 'image'
        };
      }
    }
    
    // Fallback to vizorek image if no specific date media found
    return {
      src: '/asset/event/optimized_vizorek.jpg',
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

  const handleWhatsAppClick = () => {
    setShowPersonCount(true);
  };

  const handlePersonCountConfirm = (count: number) => {
    setPersonCount(count);
    setShowPersonCount(false);
    
    // Create message with person count
    const personText = count === 1 ? '1 personne' : `${count} personnes`;
    const message = `Bonjour! Je souhaite réserver ${personText} pour l'événement "${eventTitle}" le ${eventDate} à ${eventPlace}.`;
    
    // Detect if user is on mobile or desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let whatsappUrl;
    
    if (isMobile) {
      // Mobile: Open WhatsApp app
      whatsappUrl = `https://wa.me/32498616960?text=${encodeURIComponent(message)}`;
    } else {
      // Desktop: Open WhatsApp Web
      whatsappUrl = `https://web.whatsapp.com/send?phone=32498616960&text=${encodeURIComponent(message)}`;
    }
    
    window.open(whatsappUrl, '_blank');
  };

  const handlePersonCountClose = () => {
    setShowPersonCount(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg max-w-md w-full p-6 relative">
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
              const isVideoFile = media.type === 'video' || isVideo(media.src);
              
              if (isVideoFile) {
                return (
                  <video 
                    src={media.src}
                    className="w-full h-64 object-contain rounded-lg bg-black"
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
                    className="w-full h-64 object-contain rounded-lg bg-black"
                  />
                );
              }
            })()}
          </div>
          
          <div className="mb-6">
            <p className="text-gray-300 text-lg mb-2">
              <strong>Réserve ta place au</strong>
            </p>
            <Button
              onClick={handleWhatsAppClick}
              variant="yellow"
              size="lg"
              className="w-full text-lg font-bold flex items-center justify-center gap-3"
            >
              <div className="bg-transparent p-2 rounded-full">
                <svg 
                  className="w-8 h-8" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              0498616960
            </Button>
          </div>
          
          <p className="text-gray-400 text-sm">
            Cliquez sur le bouton pour nous contacter sur WhatsApp
          </p>
        </div>
      </div>
      
      {showPersonCount && (
        <AnimatedCounter
          initialCount={personCount}
          onConfirm={handlePersonCountConfirm}
          onClose={handlePersonCountClose}
          eventTitle={eventTitle}
        />
      )}
    </div>
  );
};
