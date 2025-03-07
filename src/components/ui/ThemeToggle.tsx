"use client"
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsAnimating(true);
    setTheme(theme === 'dark' ? 'light' : 'dark');
    
    // Hacer scroll al principio de la página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Navegar a la página /cars
    router.push('/cars');
    
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      className="relative inline-flex items-center justify-center w-10 h-10
                   border border-[var(--brand)] rounded-lg
                   bg-transparent
                   transition-all duration-700
                   hover:rounded-full hover:scale-125
                   hover:shadow-[0_0_25px_var(--brand)]
                   hover:rotate-[720deg]"
    >
      <Sun
        className="w-5 h-5 text-[var(--brand)] dark:text-transparent
                     transform transition-all duration-500
                     dark:scale-0 dark:rotate-180
                     filter drop-shadow-[0_0_8px_var(--brand)]
                     brightness-125"
      />

      <div className={`absolute w-7 h-7
                       transform transition-all duration-500
                       scale-0 dark:scale-100
                       filter drop-shadow-[0_0_8px_var(--brand)]
                       ${isAnimating ? 'animate-spin' : ''}`}>
        <Image
          src="/images/textures/turbo.png"
          alt="Dark mode"
          width={28}
          height={28}
          className="object-cover w-full h-full rounded-full
                       brightness-125"
        />
      </div>
    </button>
  );
};

export default ThemeToggle;