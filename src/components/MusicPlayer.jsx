import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// Single global Audio instance across the entire application lifespan
let globalAudio = null;

export const MusicPlayer = ({ isUnlocked }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize global audio instance once
  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio('/music/kadhaipoma.mp3');
      globalAudio.loop = true;
      globalAudio.preload = 'auto';
    }
  }, []);

  // Start music automatically when password is unlocked
  useEffect(() => {
    if (isUnlocked && globalAudio && !hasStarted) {
      globalAudio.play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.log('Autoplay restriction, user interaction required:', err);
        });
    }
  }, [isUnlocked, hasStarted]);

  // Toggle play / pause smoothly
  const togglePlay = () => {
    if (!globalAudio) return;

    if (isPlaying) {
      globalAudio.pause();
      setIsPlaying(false);
    } else {
      globalAudio.play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => console.log('Audio play error:', err));
    }
  };

  return (
    <motion.button
      type="button"
      onClick={togglePlay}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 z-50 w-11 h-11 rounded-full bg-white/85 backdrop-blur-md border border-pink-200 shadow-md flex items-center justify-center text-pink-600 cursor-pointer select-none"
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
    >
      <motion.div
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={isPlaying ? { duration: 5, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-pink-500" />
        ) : (
          <VolumeX className="w-5 h-5 text-pink-300" />
        )}
      </motion.div>
    </motion.button>
  );
};
