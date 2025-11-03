/**
 * Hand-drawn style doodle components
 */

export const CameraDoodle = ({ className = "", size = 60 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 60 60" 
    fill="none" 
    className={className}
    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
  >
    <circle cx="30" cy="35" r="12" stroke="currentColor" strokeWidth="3" fill="none" />
    <rect x="18" y="15" width="24" height="30" rx="4" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="30" cy="30" r="8" fill="currentColor" opacity="0.3" />
    <path d="M 25 10 Q 30 5 35 10" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="24" cy="20" r="2" fill="currentColor" />
    
    {/* Happy face */}
    <circle cx="26" cy="28" r="1.5" fill="currentColor" />
    <circle cx="34" cy="28" r="1.5" fill="currentColor" />
    <path d="M 26 32 Q 30 34 34 32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const StarDoodle = ({ className = "", size = 40 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 40 40" 
    fill="none" 
    className={className}
  >
    <path 
      d="M 20 5 L 23 15 L 33 15 L 25 22 L 28 32 L 20 26 L 12 32 L 15 22 L 7 15 L 17 15 Z" 
      fill="currentColor" 
      opacity="0.6"
    />
    <circle cx="18" cy="14" r="1.5" fill="currentColor" />
    <circle cx="22" cy="14" r="1.5" fill="currentColor" />
    <path d="M 17 17 Q 20 19 23 17" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

export const HeartDoodle = ({ className = "", size = 50 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 50 50" 
    fill="none" 
    className={className}
  >
    <path 
      d="M 25 40 C 25 40, 10 30, 10 20 C 10 15, 13 12, 17 12 C 21 12, 25 16, 25 16 C 25 16, 29 12, 33 12 C 37 12, 40 15, 40 20 C 40 30, 25 40, 25 40 Z" 
      fill="currentColor" 
      opacity="0.7"
    />
    
    {/* Arms */}
    <path d="M 15 25 L 10 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M 35 25 L 40 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    
    {/* Happy face */}
    <circle cx="20" cy="22" r="1.5" fill="#fff" />
    <circle cx="30" cy="22" r="1.5" fill="#fff" />
    <path d="M 20 26 Q 25 28 30 26" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const SparklesDoodle = ({ className = "", size = 30 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 30 30" 
    fill="none" 
    className={className}
  >
    <path d="M 15 3 L 16 14 L 15 3 L 14 14 L 15 3" fill="currentColor" opacity="0.6" />
    <path d="M 3 15 L 14 16 L 3 15 L 14 14 L 3 15" fill="currentColor" opacity="0.6" />
    <path d="M 27 15 L 16 16 L 27 15 L 16 14 L 27 15" fill="currentColor" opacity="0.6" />
    <path d="M 15 27 L 16 16 L 15 27 L 14 16 L 15 27" fill="currentColor" opacity="0.6" />
    <circle cx="15" cy="15" r="3" fill="currentColor" opacity="0.8" />
  </svg>
);

export const BlobDoodle = ({ className = "", color = "currentColor" }) => (
  <svg 
    width="200" 
    height="200" 
    viewBox="0 0 200 200" 
    className={className}
    style={{ position: 'absolute', opacity: 0.15, pointerEvents: 'none' }}
  >
    <path 
      d="M 50 100 Q 50 50, 100 50 T 150 100 T 100 150 T 50 100" 
      fill={color} 
      opacity="0.3"
    />
  </svg>
);

export const SquiggleDoodle = ({ className = "" }) => (
  <svg 
    width="100" 
    height="20" 
    viewBox="0 0 100 20" 
    className={className}
    style={{ opacity: 0.4 }}
  >
    <path 
      d="M 0 10 Q 25 5, 50 10 T 100 10" 
      stroke="currentColor" 
      strokeWidth="3" 
      fill="none" 
      strokeLinecap="round"
    />
  </svg>
);
