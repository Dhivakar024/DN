import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const HEART_ICONS = ['💖', '💕', '🌸', '✨', '💗', '🤍', '⭐'];

export const FloatingHearts = () => {
  // Generate random particles once
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      icon: HEART_ICONS[i % HEART_ICONS.length],
      left: Math.random() * 100, // percentage
      size: Math.random() * 16 + 14, // 14px to 30px
      duration: Math.random() * 8 + 8, // 8s to 16s
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.3,
      xMove: (Math.random() - 0.5) * 60,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background ambient gradient blur circles */}
      <div className="bg-mesh-glow" />

      {/* Floating Hearts & Sparkles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            filter: 'drop-shadow(0 2px 8px rgba(255,182,193,0.3))',
          }}
          initial={{ y: '105vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            x: [0, p.xMove, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.icon}
        </motion.div>
      ))}
    </div>
  );
};
