import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const WillYouBeMineScreen = ({ onNext }) => {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMsg, setNoMsg] = useState('');
  const [showHeadline, setShowHeadline] = useState(false);
  const [showHappyMsg, setShowHappyMsg] = useState(false);

  // Intro text sequence: "Can I ask you something...? 👀" -> "Will you be mine? 💕"
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeadline(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Handle NO button playful dodge & message
  const handleNoInteraction = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    // Calculate small random playful offset (keeping within container bounds)
    const randomX = (Math.random() - 0.5) * 120;
    const randomY = (Math.random() - 0.5) * 60;
    setNoPos({ x: randomX, y: randomY });

    // Set playful message
    if (nextCount === 1) {
      setNoMsg("Are you sure? 🥺");
    } else if (nextCount === 2) {
      setNoMsg("Think again... 👀💕");
    } else {
      setNoMsg("Okay okay... I'll wait 😭💕");
    }

    // Mini heart burst on dodge
    confetti({
      particleCount: 12,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#ff758f', '#ffccd5'],
      scalar: 0.9,
    });
  };

  // Handle YES button click & celebration
  const handleYesClick = () => {
    setAccepted(true);

    // 1. Massive heart burst & confetti explosion
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#ff758f', '#ff4d6d', '#ffccd5', '#ffe5d9', '#f5efff'],
      scalar: 1.3,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#ff758f', '#ffccd5', '#ffe5d9'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#ff758f', '#ffccd5', '#ffe5d9'],
      });
    }, 250);

    // 2. Reveal final "You made me really happy ❤️" message after 2 seconds
    setTimeout(() => {
      setShowHappyMsg(true);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="romantic-card relative z-10 overflow-visible"
    >
      {/* Subtle Celebration Screen Glow */}
      {accepted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.4] }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-pink-300/30 rounded-[32px] pointer-events-none blur-2xl"
        />
      )}

      {/* Main Illustration */}
      <div className="illustration-wrapper relative">
        <div className="illustration-glow" />
        <motion.img
          src="/assets/will_you_be_mine.jpg"
          alt="Will You Be Mine Proposal Illustration"
          className="illustration-img"
          animate={
            accepted
              ? { scale: [1, 1.15, 0.98, 1.08, 1], y: [0, -8, 0] }
              : { scale: [1, 1.03, 1], y: [0, -4, 0] }
          }
          transition={
            accepted
              ? { duration: 0.8 }
              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }
        />

        {/* Floating Heart Overlay */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 left-1 text-2xl select-none"
        >
          💖
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.25, 1], y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.5 }}
          className="absolute top-0 right-1 text-2xl select-none"
        >
          💕
        </motion.div>
      </div>

      {/* Main Question / Celebration Text */}
      {!accepted ? (
        <motion.div className="w-full text-center">
          <AnimatePresence mode="wait">
            {!showHeadline ? (
              <motion.h1
                key="q-intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="romantic-title text-2xl sm:text-3xl leading-snug"
              >
                Can I ask you something...? 👀
              </motion.h1>
            ) : (
              <motion.h1
                key="q-main"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="romantic-title text-3xl sm:text-4xl leading-snug text-pink-600"
              >
                Will you be mine? 💕
              </motion.h1>
            )}
          </AnimatePresence>

          <p className="romantic-subtitle text-sm sm:text-base mt-1 mb-5">
            Just say what's in your heart... 🥺
          </p>

          {/* Interactive YES / NO Buttons */}
          <div className="flex items-center justify-center gap-3 w-full my-2 relative min-h-[60px]">
            {/* YES Button */}
            <motion.button
              type="button"
              onClick={handleYesClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="yes-btn"
            >
              <span>YES</span>
              <span>💕</span>
            </motion.button>

            {/* NO Button (Playful dodge) */}
            <motion.button
              type="button"
              onMouseEnter={handleNoInteraction}
              onClick={handleNoInteraction}
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="no-btn"
            >
              <span>NO</span>
              <span>🙈</span>
            </motion.button>
          </div>

          {/* Playful NO message toast */}
          <AnimatePresence>
            {noMsg && (
              <motion.p
                key={noMsg}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-semibold text-pink-500 mt-3"
              >
                {noMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Celebration State after YES */
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center"
        >
          <h1 className="romantic-title text-3xl sm:text-4xl leading-snug text-pink-600 mb-1">
            YAYYYYY! 💕🥹
          </h1>
          <p className="romantic-subtitle text-sm sm:text-base mb-4 font-semibold">
            I knew there was something special about you...
          </p>

          <AnimatePresence>
            {showHappyMsg && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-base font-bold text-pink-500 my-4 flex items-center justify-center gap-1"
              >
                You made me really happy ❤️
              </motion.p>
            )}
          </AnimatePresence>

          {/* After YES — Final Floating Pill CTA */}
          <motion.button
            type="button"
            onClick={onNext}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: showHappyMsg ? 0.3 : 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="floating-pill-cta mt-4"
          >
            <span>There's one last surprise...</span>
            <span className="text-xl">💌</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
