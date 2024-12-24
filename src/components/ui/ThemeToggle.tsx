"use client"
import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();


  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 text-gray-800 dark:text-transparent transform transition-all duration-300 ease-in-out dark:scale-0 dark:rotate-180" />
      <Moon className="absolute w-5 h-5 text-transparent dark:text-gray-200 transform transition-all duration-300 ease-in-out scale-0 rotate-180 dark:scale-100 dark:rotate-0" />
    </button>
  );
};

export default ThemeToggle;