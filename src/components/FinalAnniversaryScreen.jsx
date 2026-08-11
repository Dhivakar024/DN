import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PHOTO_CONFIG } from '../config/photoConfig';
import { EXACT_PERSONAL_MESSAGE } from '../config/personalMessage';

export const FinalAnniversaryScreen = () => {
  const [letterOpened, setLetterOpened] = useState(false);

  // Trigger romantic heart burst on opening Screen 5
  useEffect(() => {
    confetti({
      particleCount: 40,
      spread: 80,
      origin: { y: 0.4 },
      colors: ['#ff758f', '#ff4d6d', '#ffccd5', '#ffe5d9', '#f5efff'],
      scalar: 1.2,
    });
  }, []);

  // Handle letter open click
  const handleOpenLetter = () => {
    setLetterOpened(true);

    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff758f', '#ff4d6d', '#ffccd5', '#ffe5d9'],
      scalar: 1.25,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="screen5-scroll-container"
    >
      <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-8 relative z-10">

        {/* 1. Photo Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
            {PHOTO_CONFIG.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.2 }}
                className={`polaroid-card ${photo.rotation}`}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  className="polaroid-img"
                  style={{
                    objectPosition: photo.objectPosition || 'center center',
                    height: photo.cardHeight || '160px',
                  }}
                />
                <span className="polaroid-caption">{photo.caption}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 2. Personal Letter Section (ONLY Exact Message) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full flex flex-col items-center my-2"
        >
          {!letterOpened ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="romantic-card w-full py-8 text-center"
            >
              <span className="text-3xl mb-2 block">💌</span>
              <button
                type="button"
                onClick={handleOpenLetter}
                className="floating-pill-cta"
              >
                <span>Open My Letter</span>
                <span>💕</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="personal-letter-card w-full"
            >
              {/* EXACT VERBATIM PERSONAL MESSAGE ONLY */}
              <div className="personal-letter-text">
                {EXACT_PERSONAL_MESSAGE}
              </div>
            </motion.div>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
};
