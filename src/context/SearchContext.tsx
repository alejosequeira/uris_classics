'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = useCallback((term: string) => {
    console.log('Search term:', term);
    setSearchTerm(term);
    // Solo navegamos a /cars si no estamos ya en esa página
    if (window.location.pathname !== '/cars') {
      router.push('/cars');
    }
  }, [router]);

  return (
    <SearchContext.Provider 
      value={{ 
        searchTerm, 
        setSearchTerm, 
        handleSearch 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
