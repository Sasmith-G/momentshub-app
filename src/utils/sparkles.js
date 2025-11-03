/**
 * Creates sparkle effect at mouse position
 */
export const createSparkle = (x, y) => {
  const colors = ['#A8DADC', '#FFB5C5', '#C9A9E9', '#FFE5B4', '#B4E7CE', '#FFC8DD'];
  const emojis = ['✨', '⭐', '💫', '🌟', '💖'];
  
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement('div');
    const isEmoji = Math.random() > 0.5;
    
    if (isEmoji) {
      sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      sparkle.className = 'sparkle';
    } else {
      sparkle.className = 'sparkle';
      sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      sparkle.style.width = '8px';
      sparkle.style.height = '8px';
      sparkle.style.borderRadius = '50%';
    }
    
    const angle = (Math.PI * 2 * i) / 5;
    const distance = 30 + Math.random() * 20;
    
    sparkle.style.left = x + Math.cos(angle) * distance + 'px';
    sparkle.style.top = y + Math.sin(angle) * distance + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
    }, 600);
  }
};

/**
 * Creates confetti explosion
 */
export const createConfetti = () => {
  const colors = ['#FF6B9D', '#C77DFF', '#00B4D8', '#FFD60A', '#06FFA5'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.style.animationDuration = 2 + Math.random() * 2 + 's';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
};
