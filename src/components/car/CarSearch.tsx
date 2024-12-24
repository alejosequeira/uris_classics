"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react'; // Asegúrate de tener lucide-react instalado

interface CarSearchProps {
  onSearch: (searchTerm: string) => void;
  variant?: 'default' | 'hero';
  className?: string;
}

const CarSearch: React.FC<CarSearchProps> = ({ 
  onSearch, 
  variant = 'default',
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const styles = {
    default: {
      container: "w-full max-w-4xl mx-auto",
      form: "relative",
      input: `w-full px-6 py-4 rounded-lg
             bg-[rgb(var(--bg-primary-light))] dark:bg-[rgb(var(--bg-primary-dark))]
             text-[rgb(var(--text-primary-light))] dark:text-[rgb(var(--text-primary-dark))]
             border-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))]
             focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-light))] dark:focus:ring-[rgb(var(--accent-dark))]
             transition-all duration-300`,
      button: `absolute right-2 top-1/2 transform -translate-y-1/2
              px-6 py-2 rounded-lg
              bg-[rgb(var(--accent-light))] dark:bg-[rgb(var(--accent-dark))]
              text-[rgb(var(--bg-primary-light))] dark:text-[rgb(var(--bg-primary-dark))]
              hover:opacity-90 transition-all duration-300`
    },
    hero: {
      container: "w-full max-w-4xl mx-auto",
      form: "relative",
      input: `w-full px-6 py-4 rounded-full
             bg-white/10 dark:bg-black/10 backdrop-blur-md
             text-[rgb(var(--text-primary-light))] dark:text-[rgb(var(--text-primary-dark))]
             border-2 border-[rgb(var(--accent-light))] dark:border-[rgb(var(--accent-dark))]
             placeholder-gray-300 dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-light))] dark:focus:ring-[rgb(var(--accent-dark))]
             transition-all duration-300`,
      button: `absolute right-2 top-1/2 transform -translate-y-1/2
              px-6 py-2 rounded-full
              bg-[rgb(var(--accent-light))] dark:bg-[rgb(var(--accent-dark))]
              text-[rgb(var(--bg-primary-light))] dark:text-[rgb(var(--bg-primary-dark))]
              hover:opacity-90 transition-all duration-300 group`
    }
  };

  const currentStyle = styles[variant];

  return (
    <div className={`${currentStyle.container} ${className}`}>
      <form onSubmit={handleSubmit} className={currentStyle.form}>
        <input
          type="text"
          placeholder="Search for your dream classic car..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={currentStyle.input}
        />
        <button type="submit" className={currentStyle.button}>
          {variant === 'hero' ? (
            <>
              Search
              <Search className="w-4 h-4 ml-2 inline-block" />
            </>
          ) : (
            'Search'
          )}
        </button>
      </form>
    </div>
  );
};

export default CarSearch;