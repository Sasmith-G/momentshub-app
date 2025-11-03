/**
 * Simple client-side rate limiter using localStorage
 * Prevents users from spamming actions
 */

const RATE_LIMIT_PREFIX = 'rateLimit_';

/**
 * Check if an action is rate limited
 * @param {string} action - The action name (e.g., 'upload', 'comment')
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} - True if action is allowed, false if rate limited
 */
export const checkRateLimit = (action, maxAttempts = 5, windowMs = 60000) => {
  const key = `${RATE_LIMIT_PREFIX}${action}`;
  const now = Date.now();
  
  // Get existing attempts from localStorage
  const stored = localStorage.getItem(key);
  let attempts = stored ? JSON.parse(stored) : [];
  
  // Filter out old attempts outside the time window
  attempts = attempts.filter(timestamp => now - timestamp < windowMs);
  
  // Check if rate limit exceeded
  if (attempts.length >= maxAttempts) {
    return false;
  }
  
  // Add current attempt
  attempts.push(now);
  localStorage.setItem(key, JSON.stringify(attempts));
  
  return true;
};

/**
 * Clear rate limit for an action
 * @param {string} action - The action name
 */
export const clearRateLimit = (action) => {
  const key = `${RATE_LIMIT_PREFIX}${action}`;
  localStorage.removeItem(key);
};

/**
 * Get remaining attempts for an action
 * @param {string} action - The action name
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {number} - Number of remaining attempts
 */
export const getRemainingAttempts = (action, maxAttempts = 5, windowMs = 60000) => {
  const key = `${RATE_LIMIT_PREFIX}${action}`;
  const now = Date.now();
  
  const stored = localStorage.getItem(key);
  let attempts = stored ? JSON.parse(stored) : [];
  
  attempts = attempts.filter(timestamp => now - timestamp < windowMs);
  
  return Math.max(0, maxAttempts - attempts.length);
};
