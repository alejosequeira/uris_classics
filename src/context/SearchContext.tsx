// src/context/SearchContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
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

  const handleSearch = (term: string) => {
    console.log('Search term:', term); // Para debugging
    setSearchTerm(term);
    router.push('/cars');
  };

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