"use client"
import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const { setTheme, theme } = useTheme();
  
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="relative inline-flex items-center justify-center w-10 h-10
                   border border-[rgb(var(--soft-gold))] rounded-lg
                   bg-transparent
                   transition-all duration-300
                   hover:scale-105 hover:shadow-[0_0_8px_rgb(var(--soft-gold))]"
        aria-label="Toggle theme"
      >
        <Sun className="w-5 h-5 text-[rgb(var(--soft-gold))] dark:text-transparent
                       transform transition-all duration-300
                       dark:scale-0 dark:rotate-180" />
        <Moon className="absolute w-5 h-5 text-transparent dark:text-[rgb(var(--soft-gold))]
                        transform transition-all duration-300
                        scale-0 rotate-180 dark:scale-100 dark:rotate-0" />
      </button>
    );
  };

export default ThemeToggle;