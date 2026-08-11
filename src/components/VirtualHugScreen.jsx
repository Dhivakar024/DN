import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const VirtualHugScreen = ({ onNext }) => {
  // Hug state machine: 'initial' | 'delivered' | 'awaiting_yes' | 'yes_clicked'
  const [hugStage, setHugStage] = useState('initial');
  const [isHugging, setIsHugging] = useState(false);
  const [characterHappy, setCharacterHappy] = useState(false);

  // Stage 1: Tap "GET YOUR HUG 🫂"
  const handleGetHugClick = () => {
    setIsHugging(true);
    setHugStage('delivered');

    // Soft heart burst
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#ff758f', '#ff4d6d', '#ffccd5', '#ffe5d9', '#f5efff'],
      scalar: 1.2,
    });

    // After 1.8 seconds, transform button into "YES... 🥹💕"
    setTimeout(() => {
      setHugStage('awaiting_yes');
      setIsHugging(false);
    }, 1800);
  };

  // Stage 2: Tap "YES... 🥹💕"
  const handleYesClick = () => {
    setCharacterHappy(true);
    setHugStage('yes_clicked');

    // Another celebratory heart burst
    confetti({
      particleCount: 40,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff758f', '#ff4d6d', '#ffccd5', '#ffe5d9'],
      scalar: 1.25,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="romantic-card relative z-10 overflow-visible"
    >
      {/* Subtle Screen Glow Effect during hug */}
      {isHugging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.3] }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-pink-300/20 rounded-[32px] pointer-events-none blur-xl"
        />
      )}

      {/* Warm Virtual Hug Illustration */}
      <div className="illustration-wrapper relative">
        <div className="illustration-glow" />

        <motion.img
          src="/assets/hugging_couple.jpg"
          alt="Warm Virtual Hug Illustration"
          className="illustration-img"
          initial={{ scale: 0.9 }}
          animate={
            isHugging
              ? { scale: [1, 1.14, 0.98, 1.08, 1], y: [0, -8, 0] }
              : characterHappy
              ? { scale: [1, 1.1, 1], y: [0, -6, 0] }
              : { scale: [1, 1.03, 1], y: [0, -4, 0] }
          }
          transition={
            isHugging
              ? { duration: 0.8 }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
        />

        {/* Floating Hearts around characters */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 left-1 text-2xl select-none"
        >
          💖
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.25, 1], y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}
          className="absolute top-0 right-1 text-2xl select-none"
        >
          💕
        </motion.div>
      </div>

      {/* Main Text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full text-center"
      >
        <h1 className="romantic-title text-2xl sm:text-3xl leading-snug">
          Come here... 🫂
        </h1>
        <p className="romantic-subtitle text-sm sm:text-base mb-4">
          Sending you a virtual hug 💕
        </p>
      </motion.div>

      {/* Dynamic Interaction Button Flow */}
      <div className="w-full">
        {/* Stage 1: GET YOUR HUG 🫂 */}
        {hugStage === 'initial' && (
          <motion.button
            type="button"
            onClick={handleGetHugClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="romantic-btn"
          >
            <span>GET YOUR HUG 🫂</span>
          </motion.button>
        )}

        {/* Stage 2: HUG DELIVERED 💕 */}
        {hugStage === 'delivered' && (
          <motion.button
            type="button"
            disabled
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            className="romantic-btn opacity-95 cursor-default"
          >
            <span>HUG DELIVERED 💕</span>
          </motion.button>
        )}

        {/* Stage 3: YES... 🥹💕 */}
        {hugStage === 'awaiting_yes' && (
          <motion.button
            type="button"
            onClick={handleYesClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [1, 1.04, 1] }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="romantic-btn"
          >
            <span>YES... 🥹💕</span>
          </motion.button>
        )}
      </div>

      {/* Subtext Messages based on interaction */}
      <AnimatePresence mode="wait">
        {(hugStage === 'delivered' || hugStage === 'awaiting_yes') && (
          <motion.p
            key="msg-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-pink-500 my-3 flex items-center justify-center gap-1"
          >
            Did you feel that? 🥺💕
          </motion.p>
        )}

        {hugStage === 'yes_clicked' && (
          <motion.p
            key="msg-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold text-pink-600 my-3 flex items-center justify-center gap-1 leading-snug"
          >
            Aww... then I have one more question for you 👀
          </motion.p>
        )}
      </AnimatePresence>

      {/* Screen 3 Final Floating Pill CTA: "One more thing... 💌" */}
      {hugStage === 'yes_clicked' && (
        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="floating-pill-cta mt-2"
        >
          <span>One more thing...</span>
          <span className="text-xl">💌</span>
        </motion.button>
      )}
    </motion.div>
  );
};
