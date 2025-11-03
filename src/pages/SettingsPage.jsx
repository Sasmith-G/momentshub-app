import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SettingsPage = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card-background/80 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* --- FIXED: Changed 'profile' to 'dashboard' --- */}
            <button onClick={() => onNavigate('dashboard')} className="text-text-secondary hover:text-primary-action">
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-lg font-bold text-text-primary">Settings</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-card-background rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-6 text-text-primary">Appearance</h3>
          <div className="flex items-center justify-between">
            <span className="text-text-primary font-medium">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center h-8 w-14 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors"
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform ${
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
              <span
                className={`absolute left-2 text-yellow-500 transition-opacity ${
                  theme === 'light' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Sun size={16} />
              </span>
              <span
                className={`absolute right-2 text-primary-action transition-opacity ${
                  theme === 'dark' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Moon size={16} />
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;