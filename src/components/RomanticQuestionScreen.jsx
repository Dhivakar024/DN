import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const RomanticQuestionScreen = ({ onNext }) => {
  const [btnText, setBtnText] = useState('TRY AGAIN 💕');
  const [isBouncing, setIsBouncing] = useState(false);
  const [characterReacting, setCharacterReacting] = useState(false);
  const [showStayToast, setShowStayToast] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Trigger heart burst on main button click
  const handleTryAgainClick = () => {
    setHasInteracted(true);
    setCharacterReacting(true);
    setIsBouncing(true);

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff758f', '#ff4d6d', '#ffccd5', '#ffe5d9'],
      scalar: 1.1,
    });

    setBtnText('Okay okay... 😳');

    setTimeout(() => {
      setBtnText('TRY AGAIN 💕');
      setIsBouncing(false);
      setCharacterReacting(false);
    }, 1100);
  };

  // Trigger subtle stay interaction
  const handleStayClick = () => {
    setHasInteracted(true);
    setShowStayToast(true);

    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#ff758f', '#ffccd5', '#f5efff'],
      scalar: 0.9,
    });

    setTimeout(() => {
      setShowStayToast(false);
    }, 2800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="romantic-card relative z-10 overflow-visible"
    >
      {/* Cute Romantic Character Illustration */}
      <motion.div
        className="illustration-wrapper float-anim relative"
        animate={characterReacting ? { scale: [1, 1.18, 0.95, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="illustration-glow" />
        <img
          src="/assets/playful_couple.jpg"
          alt="Playful Cute Couple Illustration"
          className="illustration-img"
        />

        {/* Floating Heart reaction overlay */}
        <AnimatePresence>
          {characterReacting && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.5 }}
              animate={{ opacity: 1, y: -25, scale: 1.3 }}
              exit={{ opacity: 0, y: -45, scale: 0.8 }}
              transition={{ duration: 0.7 }}
              className="absolute -top-3 right-2 text-2xl pointer-events-none select-none"
            >
              💖
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Text with Smooth Fade-Up */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full text-center"
      >
        <h1 className="romantic-title text-2xl sm:text-3xl leading-snug">
          Why did you come here? 👀
        </h1>
        <p className="romantic-subtitle text-sm sm:text-base mb-5">
          I have something to ask you...
        </p>
      </motion.div>

      {/* Main Interactive Button */}
      <motion.button
        type="button"
        onClick={handleTryAgainClick}
        animate={isBouncing ? { scale: [1, 1.12, 0.95, 1.05, 1] } : {}}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="romantic-btn my-1"
      >
        <span>{btnText}</span>
      </motion.button>

      {/* Optional Second Interaction */}
      <motion.button
        type="button"
        onClick={handleStayClick}
        className="subtle-text-btn"
      >
        Maybe I should stay... 👀
      </motion.button>

      {/* Floating Toast Notification when Stay clicked */}
      <AnimatePresence>
        {showStayToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.85 }}
            transition={{ duration: 0.3 }}
            className="toast-badge"
          >
            I knew you'd stay 💗
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue to Virtual Hug Button */}
      {onNext && (
        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="mt-4 text-xs font-semibold text-pink-500 hover:text-pink-600 bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-full border border-pink-200 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>Give me a hug! 🫂</span>
          <span>→</span>
        </motion.button>
      )}
    </motion.div>
  );
};
