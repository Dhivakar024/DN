import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const RomanticQuestionScreen = ({ onNext }) => {
  // Reveal state sequence: 'intro' | 'surprise_opened' | 'come_closer' | 'closer_done'
  const [stage, setStage] = useState('intro');
  const [showReady, setShowReady] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [characterReacting, setCharacterReacting] = useState(false);

  // Delayed reveal of "Are you ready? 👀"
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Step 1: Handle "Open the little surprise 💌" tap
  const handleOpenSurprise = () => {
    setIsOpening(true);
    setIsZoomed(true);

    // Floating heart particles
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#ff758f', '#ffccd5', '#ffe5d9'],
      scalar: 1.1,
    });

    // After 1.2s envelope opens
    setTimeout(() => {
      setStage('surprise_opened');
      setIsOpening(false);
    }, 1200);

    // After ~2.2s reveal "Come a little closer... 🫂"
    setTimeout(() => {
      setStage('come_closer');
    }, 2200);
  };

  // Step 2: Handle "Come here 🫂" tap
  const handleComeHereTap = () => {
    setCharacterReacting(true);

    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ff758f', '#ff4d6d', '#ffccd5', '#f5efff'],
      scalar: 1.25,
    });

    setTimeout(() => {
      setStage('closer_done');
      setCharacterReacting(false);
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="romantic-card relative z-10 select-none py-6 px-4 sm:px-6 w-full max-w-[440px] my-auto"
    >
      {/* Responsive Illustration with Zoom & Reaction */}
      <motion.div
        className="illustration-wrapper float-anim relative mx-auto my-2"
        style={{
          width: 'min(72vw, 260px)',
          height: 'min(72vw, 260px)',
          maxWidth: '320px',
          maxHeight: '320px',
        }}
        animate={
          isZoomed
            ? { scale: [1, 1.12, 1.05] }
            : characterReacting
            ? { scale: [1, 1.15, 0.96, 1.08, 1], y: [0, -6, 0] }
            : {}
        }
        transition={{ duration: 0.7 }}
      >
        <div className="illustration-glow" />
        <img
          src="/assets/playful_couple.jpg"
          alt="Cute Romantic Couple Illustration"
          className="illustration-img"
        />

        {/* Floating Heart overlay on reaction */}
        <AnimatePresence>
          {(isOpening || characterReacting) && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.5 }}
              animate={{ opacity: 1, y: -28, scale: 1.3 }}
              exit={{ opacity: 0, y: -45, scale: 0.8 }}
              transition={{ duration: 0.7 }}
              className="absolute -top-3 right-2 text-2xl pointer-events-none select-none"
            >
              💖
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Headline & Story Text */}
      <div className="w-full text-center my-3">
        <h1
          className="romantic-title font-heading font-bold text-pink-600 leading-snug"
          style={{ fontSize: 'clamp(22px, 6.5vw, 32px)' }}
        >
          Yay... you found me! 🥹💕
        </h1>

        <p
          className="romantic-subtitle font-body text-gray-700 font-medium my-2"
          style={{ fontSize: 'clamp(14px, 3.8vw, 17px)' }}
        >
          But wait... I have something special for you...
        </p>

        <AnimatePresence>
          {showReady && stage === 'intro' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-500 font-semibold font-heading text-sm sm:text-base mt-1"
            >
              Are you ready? 👀
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Envelope Reveal Container */}
      <AnimatePresence>
        {(stage === 'surprise_opened' || stage === 'come_closer') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full text-center bg-white/70 backdrop-blur-md border border-pink-200 rounded-2xl py-3 px-4 my-2 shadow-sm"
          >
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl mb-1"
            >
              💌
            </motion.div>
            <p className="text-xs sm:text-sm font-semibold text-pink-600">
              {stage === 'surprise_opened'
                ? 'Okay... one more little thing 🥺'
                : 'Come a little closer... 🫂'}
            </p>
          </motion.div>
        )}

        {stage === 'closer_done' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full text-center bg-white/70 backdrop-blur-md border border-pink-200 rounded-2xl py-3 px-4 my-2 shadow-sm"
          >
            <p className="text-xs sm:text-sm font-semibold text-pink-600">
              That's better... 🥹💕
            </p>
            <p className="text-xs sm:text-sm font-bold text-pink-500 mt-1">
              Ready for your virtual hug?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical Interactive CTA Flow */}
      <div className="w-full flex flex-col items-center gap-3 mt-3">

        {/* Step A: "Open the little surprise 💌" */}
        {stage === 'intro' && (
          <motion.button
            type="button"
            onClick={handleOpenSurprise}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="floating-pill-cta"
            style={{ width: 'min(100%, 340px)', minHeight: '52px' }}
            aria-label="Open the little surprise"
          >
            <span>{isOpening ? 'Opening... 💕' : 'Open the little surprise 💌'}</span>
          </motion.button>
        )}

        {/* Step B: "Come here 🫂" */}
        {stage === 'come_closer' && (
          <motion.button
            type="button"
            onClick={handleComeHereTap}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="floating-pill-cta"
            style={{ width: 'min(100%, 340px)', minHeight: '52px' }}
            aria-label="Come here"
          >
            <span>Come here 🫂</span>
          </motion.button>
        )}

        {/* Step C: "YES, GIVE ME THE HUG 🫂" */}
        {stage === 'closer_done' && (
          <motion.button
            type="button"
            onClick={onNext}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="floating-pill-cta"
            style={{ width: 'min(100%, 340px)', minHeight: '52px' }}
            aria-label="Yes, give me the hug"
          >
            <span>YES, GIVE ME THE HUG 🫂</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
