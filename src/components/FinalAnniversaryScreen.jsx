import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PHOTO_CONFIG } from '../config/photoConfig';
import { EXACT_PERSONAL_MESSAGE } from '../config/personalMessage';

export const FinalAnniversaryScreen = () => {
  const [letterOpened, setLetterOpened] = useState(false);
  const [showEnding, setShowEnding] = useState(false);

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

    // Heart burst on opening letter
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff758f', '#ff4d6d', '#ffccd5', '#ffe5d9'],
      scalar: 1.25,
    });

    // Reveal final ending badge after short delay
    setTimeout(() => {
      setShowEnding(true);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="screen5-scroll-container"
    >
      <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-8 relative z-10">

        {/* 1. Opening Header & Envelope Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="romantic-card w-full py-8 text-center"
        >
          {/* Envelope Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.95, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl shadow-md"
            style={{ background: 'linear-gradient(135deg, #ffe4e9, #ffd8be)' }}
          >
            💌✨
          </motion.div>

          <h1 className="romantic-title text-2xl sm:text-3xl text-pink-600 leading-snug">
            Happy One Year Anniversary 🤍
          </h1>
          <p className="romantic-subtitle text-sm sm:text-base mb-0">
            To my favorite person... 🥺💕
          </p>
        </motion.div>

        {/* 2. Photo Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          <h2 className="font-heading font-semibold text-lg text-pink-600 mb-4 tracking-wide flex items-center gap-1.5">
            <span>Our Precious Memories</span>
            <span>📸</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
            {PHOTO_CONFIG.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4 }}
                className={`polaroid-card ${photo.rotation}`}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  className="polaroid-img"
                />
                <span className="polaroid-caption">{photo.caption}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3. Personal Message Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full flex flex-col items-center mt-4"
        >
          {!letterOpened ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="romantic-card w-full py-8 text-center"
            >
              <span className="text-3xl mb-2 block">💌</span>
              <p className="romantic-subtitle text-base font-semibold mb-6">
                There's something I want you to read... 💌
              </p>
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
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="personal-letter-card w-full"
            >
              <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-5">
                <span className="font-heading font-bold text-pink-600 text-lg flex items-center gap-1.5">
                  <span>For My Dhiva</span>
                  <span>💌</span>
                </span>
                <span className="text-xs text-pink-400 font-medium">August ❤️</span>
              </div>

              {/* EXACT VERBATIM PERSONAL MESSAGE */}
              <div className="personal-letter-text">
                {EXACT_PERSONAL_MESSAGE}
              </div>

              {/* Special Highlight Elements after Message */}
              <div className="mt-8 pt-6 border-t border-pink-200/60 text-center">
                <h3 className="font-heading text-2xl font-bold text-pink-600 mb-1">
                  Happy One Year Anniversary ❤️
                </h3>
                <p className="font-heading text-lg font-semibold text-pink-500">
                  I Love You Forever 🥺🤍
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 4. Final Ending Animation Badge: "Forever & Always 🤍" */}
        {showEnding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full text-center my-6 py-6 px-8 rounded-full bg-white/90 border border-pink-200 shadow-lg backdrop-blur-md flex items-center justify-center gap-2"
          >
            <span className="font-heading text-xl sm:text-2xl font-bold text-pink-600 heartbeat-anim">
              Forever & Always 🤍
            </span>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};
