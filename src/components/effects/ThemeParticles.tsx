// src/components/effects/ThemeParticles.tsx
"use client"
import { useTheme } from 'next-themes'
import ParticlesEffect from './ParticlesEffect'

const ThemeParticles = () => {
  const { theme } = useTheme()
  
  if (theme !== 'light') return null

  return (
    <div className="fixed inset-0 pointer-events-none">
      <ParticlesEffect />
    </div>
  )
}

export default ThemeParticles