import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [partyMode, setPartyMode] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'party-mode');
    
    if (partyMode) {
      root.classList.add('party-mode');
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme, partyMode]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    setPartyMode(false);
  };

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount === 5) {
      activatePartyMode();
      setLogoClickCount(0);
    }

    // Reset counter after 2 seconds of inactivity
    setTimeout(() => {
      setLogoClickCount(0);
    }, 2000);
  };

  const activatePartyMode = () => {
    setPartyMode(true);
    
    // Import confetti dynamically
    import('../utils/sparkles').then(({ createConfetti }) => {
      createConfetti();
    });

    // Party mode lasts 30 seconds
    setTimeout(() => {
      setPartyMode(false);
    }, 30000);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      partyMode, 
      handleLogoClick,
      activatePartyMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
