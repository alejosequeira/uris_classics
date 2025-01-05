"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { debounce } from "lodash";

interface CarSearchProps {
  onSearch: (searchTerm: string) => void;
  variant?: "default" | "hero";
  className?: string;
  isTransparent?: boolean;
}

const CarSearch: React.FC<CarSearchProps> = ({
  onSearch,
  variant = "default",
  className = "",
  isTransparent = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Crear función debounced
  const debouncedSearch = debounce((term: string) => {
    if (term.length === 0) {
      // Si el término está vacío, envía señal para restaurar la lista completa
      onSearch("");
    } else if (term.length >= 2) {
      onSearch(term);
    }
  }, 500);

  // Manejar Enter para búsqueda inmediata
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm.length === 0) {
        // Restablecer lista completa si está vacío
        onSearch("");
        debouncedSearch.cancel();
      } else if (searchTerm.length >= 2) {
        onSearch(searchTerm);
        debouncedSearch.cancel();
      }
    }
  };

  // Búsqueda automática con debounce
  useEffect(() => {
    if (searchTerm.length === 0) {
      // Restablecer la lista si el término está vacío
      onSearch("");
    } else {
      debouncedSearch(searchTerm);
    }
    // Cleanup
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.length === 0) {
      
      onSearch("");
      debouncedSearch.cancel();
    } else if (searchTerm.length >= 2) {
      onSearch(searchTerm);
      debouncedSearch.cancel();
    }
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
              hover:opacity-90 transition-all duration-300`,
    },
    hero: {
      container: "w-full max-w-4xl mx-auto",
      form: "relative",
      input: `w-full px-6 py-4 rounded-full
             ${isTransparent 
               ? "bg-[rgb(var(--navy))]/10 backdrop-blur-sm" 
               : "bg-white dark:bg-[rgb(var(--navy))]"}
             text-[rgb(var(--ivory))] placeholder-[rgb(var(--ivory))]/70
             border border-[rgb(var(--soft-gold))]
             focus:outline-none focus:ring-2 focus:ring-[rgb(var(--soft-gold))]
             transition-all duration-300`,
      button: `absolute right-2 top-1/2 transform -translate-y-1/2
              px-6 py-2 rounded-full
              bg-[rgb(var(--soft-gold))]
              text-[rgb(var(--emerald))] dark:text-[rgb(var(--navy))]
              hover:opacity-90 transition-all duration-300`,
    },
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
          onKeyDown={handleKeyDown}
          className={currentStyle.input}
        />
        <button type="submit" className={currentStyle.button}>
          {variant === "hero" ? (
            <div className="flex items-center">
              <span>Search</span>
              <Search className="w-4 h-4 ml-2" />
            </div>
          ) : (
            "Search"
          )}
        </button>
      </form>
    </div>
  );
};

export default CarSearch;