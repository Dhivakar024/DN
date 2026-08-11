import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { validatePassword, PASSWORD_CONFIG } from '../config/passwordConfig';

export const PasswordScreen = ({ onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const secretLen = PASSWORD_CONFIG.secretPassword.length; // Default 3 for "143"

  // Handle PIN verification
  const checkPin = (currentPin) => {
    if (validatePassword(currentPin)) {
      setIsSuccess(true);
      setError(false);

      // Heart burst confetti
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff758f', '#ff4d6d', '#ffb6c1', '#f5efff', '#ffd8be'],
        scalar: 1.2,
      });

      setTimeout(() => {
        onSuccess();
      }, 700);
    } else {
      setError(true);
      setShakeKey((prev) => prev + 1);

      // Clear PIN after shake
      setTimeout(() => {
        setPin('');
      }, 500);
    }
  };

  // Handle digit press
  const handleNumberPress = (digit) => {
    if (isSuccess || pin.length >= secretLen) return;
    setError(false);

    const newPin = pin + digit;
    setPin(newPin);

    // Auto-check if pin reaches secret password length
    if (newPin.length === secretLen) {
      setTimeout(() => {
        checkPin(newPin);
      }, 200);
    }
  };

  // Handle delete last digit
  const handleDelete = () => {
    if (isSuccess || pin.length === 0) return;
    setError(false);
    setPin((prev) => prev.slice(0, -1));
  };

  // Handle manual confirm button
  const handleConfirm = () => {
    if (isSuccess || pin.length === 0) return;
    checkPin(pin);
  };

  // Allow physical keyboard typing for convenience
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        handleNumberPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Enter') {
        handleConfirm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="romantic-card relative z-10 select-none py-7 px-5"
    >
      {/* Cute Romantic Illustration */}
      <div className="illustration-wrapper float-anim mb-4" style={{ width: '150px', height: '150px' }}>
        <div className="illustration-glow" />
        <img
          src="/assets/couple.jpg"
          alt="Cute Romantic Couple Illustration"
          className="illustration-img"
        />
      </div>

      {/* Main Header Text */}
      <div className="text-center mb-4">
        <h1 className="romantic-title text-2xl flex items-center justify-center gap-1.5 mb-1">
          <span>Enter the secret code</span>
          <span>🔐</span>
        </h1>
        <p className="romantic-subtitle text-xs sm:text-sm mb-0">
          Only you know the way in... 💕
        </p>
      </div>

      {/* PIN Heart Indicators */}
      <motion.div
        key={shakeKey}
        animate={error ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="pin-indicators-container"
      >
        {Array.from({ length: secretLen }).map((_, idx) => {
          const isFilled = idx < pin.length;
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                scale: isFilled ? [1, 1.3, 1] : 1,
                color: isFilled || isSuccess ? '#ff4d6d' : '#e2cad8',
              }}
              transition={{ duration: 0.2 }}
              className="pin-slot"
            >
              {isFilled || isSuccess ? '♥' : '♡'}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="error-msg text-xs mb-3 font-semibold text-pink-600"
          >
            Oops... try again 🥺
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Romantic Numeric Dial Pad */}
      <div className="keypad-grid">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <motion.button
            key={num}
            type="button"
            onClick={() => handleNumberPress(num)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            className="keypad-btn"
          >
            {num}
          </motion.button>
        ))}

        {/* Bottom Row: ⌫ | 0 | ✓ */}
        <motion.button
          type="button"
          onClick={handleDelete}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.9 }}
          className="keypad-btn keypad-btn-action"
          aria-label="Delete last digit"
        >
          ⌫
        </motion.button>

        <motion.button
          type="button"
          onClick={() => handleNumberPress('0')}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.9 }}
          className="keypad-btn"
        >
          0
        </motion.button>

        <motion.button
          type="button"
          onClick={handleConfirm}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.9 }}
          className="keypad-btn keypad-btn-confirm"
          aria-label="Confirm PIN"
        >
          ✓
        </motion.button>
      </div>
    </motion.div>
  );
};
