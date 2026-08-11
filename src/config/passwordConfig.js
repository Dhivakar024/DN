/**
 * Secret Surprise Configuration
 * Easily update the password and romantic texts here!
 */

export const PASSWORD_CONFIG = {
  // Secret password (change this to your custom password anytime)
  secretPassword: "143",
  
  // Custom message hints or texts
  hints: {
    wrongPassword: "Oops! Try again 💗",
    successHeading: "Unlocking your surprise...",
    successSubtext: "Sending all my love! ✨"
  }
};

/**
 * Validates the entered password against configured secret password.
 * Case-insensitive & trimmed for smooth user experience.
 */
export const validatePassword = (input) => {
  if (!input) return false;
  return input.trim().toLowerCase() === PASSWORD_CONFIG.secretPassword.toLowerCase();
};
