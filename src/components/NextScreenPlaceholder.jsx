import React from 'react';
import { motion } from 'framer-motion';

export const NextScreenPlaceholder = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="romantic-card relative z-20 text-center py-12 px-6"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl shadow-md"
        style={{ background: 'linear-gradient(135deg, #ffe4e9, #ffd8be)' }}
      >
        💌✨
      </motion.div>

      <h2 className="romantic-title text-3xl mb-2 text-pink-600">
        Final Surprise Incoming... 💖
      </h2>
      <p className="romantic-subtitle max-w-xs mx-auto mb-6 text-base leading-relaxed">
        The most special part of your secret surprise is currently being prepared...
      </p>
    </motion.div>
  );
};
