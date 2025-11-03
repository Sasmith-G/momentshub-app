import { Moon, Sun } from 'lucide-react';

/**
 * Theme Toggle Component
 * Smooth animation between light and dark modes
 */
const ThemeToggle = ({ theme, onToggle, className = '' }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-gray-200 hover:bg-gray-300'
      } ${className}`}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun Icon (Light Mode) */}
      <Sun
        size={20}
        className={`absolute transition-all duration-300 text-yellow-500 ${
          theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-0'
        }`}
      />

      {/* Moon Icon (Dark Mode) */}
      <Moon
        size={20}
        className={`absolute transition-all duration-300 text-blue-400 ${
          theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
