'use client'
import { ThemeProvider } from 'next-themes'
import { SearchProvider } from '@/context/SearchContext'
import dynamic from 'next/dynamic'

const ThemeParticles = dynamic(() => import('@/components/effects/ThemeParticles'), {
  ssr: false,
  loading: () => null
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ThemeParticles />
        {children}
      </ThemeProvider>
    </SearchProvider>
  )
}