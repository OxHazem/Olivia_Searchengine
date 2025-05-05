import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'purple', name: 'Purple', icon: Palette },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/80 backdrop-blur-lg rounded-full shadow-lg p-2 flex items-center space-x-2">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`p-2 rounded-full transition-all duration-300 ${
                currentTheme === theme.id
                  ? 'bg-indigo-100 text-indigo-600 scale-110'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title={theme.name}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSwitcher; 