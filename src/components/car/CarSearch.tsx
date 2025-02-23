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
  }, [searchTerm, debouncedSearch, onSearch]);

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
      input: `w-full px-4 pr-16 py-2.5 rounded-lg
             bg-card
             text-foreground placeholder-gray-400
             border border-border
             focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand
             transition-all duration-300`,
      button: `absolute right-0 top-0 h-full
              px-4
              text-gray-400 hover:text-brand
              transition-colors duration-300
              flex items-center justify-center`,
    },
    hero: {
      container: "w-full max-w-4xl mx-auto",
      form: "relative",
      input: `w-full px-6 pr-[120px] py-4 rounded-full
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
          placeholder="Search by Year, Make or Model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className={currentStyle.input}
        />
        <button 
          type="submit" 
          className={currentStyle.button}
          aria-label="Search"
        >
          {variant === "hero" ? (
            <div className="flex items-center gap-2">
              <span>Search</span>
              <Search className="w-4 h-4" />
            </div>
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default CarSearch;