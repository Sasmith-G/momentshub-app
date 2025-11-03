/**
 * Validation utilities to prevent XSS and malicious input
 */

/**
 * Sanitize text input (prevent XSS)
 * @param {string} text - The text to sanitize
 * @returns {string} - Sanitized text
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  
  // Remove HTML tags
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate caption length
 * @param {string} caption - The caption text
 * @param {number} maxLength - Maximum allowed length
 * @returns {{valid: boolean, error: string}}
 */
export const validateCaption = (caption, maxLength = 500) => {
  if (!caption || caption.trim().length === 0) {
    return { valid: false, error: 'Caption cannot be empty' };
  }
  
  if (caption.length > maxLength) {
    return { valid: false, error: `Caption must be ${maxLength} characters or less` };
  }
  
  return { valid: true, error: '' };
};

/**
 * Validate comment text
 * @param {string} text - The comment text
 * @param {number} maxLength - Maximum allowed length
 * @returns {{valid: boolean, error: string}}
 */
export const validateComment = (text, maxLength = 500) => {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Comment cannot be empty' };
  }
  
  if (text.length > maxLength) {
    return { valid: false, error: `Comment must be ${maxLength} characters or less` };
  }
  
  return { valid: true, error: '' };
};

/**
 * Validate group name
 * @param {string} name - The group name
 * @returns {{valid: boolean, error: string}}
 */
export const validateGroupName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Group name cannot be empty' };
  }
  
  if (name.length < 3) {
    return { valid: false, error: 'Group name must be at least 3 characters' };
  }
  
  if (name.length > 50) {
    return { valid: false, error: 'Group name must be 50 characters or less' };
  }
  
  return { valid: true, error: '' };
};

/**
 * Validate invite code format
 * @param {string} code - The invite code
 * @returns {{valid: boolean, error: string}}
 */
export const validateInviteCode = (code) => {
  if (!code || code.trim().length === 0) {
    return { valid: false, error: 'Invite code cannot be empty' };
  }
  
  if (code.length !== 6) {
    return { valid: false, error: 'Invite code must be exactly 6 characters' };
  }
  
  if (!/^[A-Z0-9]+$/.test(code)) {
    return { valid: false, error: 'Invite code must contain only uppercase letters and numbers' };
  }
  
  return { valid: true, error: '' };
};

/**
 * Validate file type for images
 * @param {File} file - The file to validate
 * @returns {{valid: boolean, error: string}}
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'File must be an image (JPG, PNG, GIF, or WebP)' };
  }
  
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }
  
  return { valid: true, error: '' };
};
