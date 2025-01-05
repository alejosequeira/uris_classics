// src/app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { SearchProvider } from '@/context/SearchContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SearchProvider>
  )
}