// src/app/layout.tsx
import '../styles/globals.css'
import type { Metadata } from 'next'
import Layout from '../components/layout/Layout'
import { Inter } from 'next/font/google'
import Providers from './providers'
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Classic Cars Marketplace',
  description: 'Find and buy your dream classic or muscle car',
  keywords: 'classic cars, muscle cars, vintage automobiles, car marketplace',
  
  // Añadir configuración de Open Graph para mejorar los previews
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mote-classics.vercel.app/', // Reemplaza con tu dominio real
    title: 'Classic Cars Marketplace',
    description: 'Find and buy your dream classic or muscle car',
    siteName: 'Classic Cars Marketplace',
    images: [
      {
        url: '/og-image.jpg', // Asegúrate de crear y añadir esta imagen en la carpeta public
        width: 1200,
        height: 630,
        alt: 'Classic Cars Marketplace',
      }
    ],
  },
  
  // Añadir configuración de Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Classic Cars Marketplace',
    description: 'Find and buy your dream classic or muscle car',
    images: ['/twitter-image.jpg'], // Crear y añadir esta imagen en la carpeta public
    creator: '@yourhandle', // Si tienes una cuenta de Twitter
  },
  
  // Configuración adicional de iconos
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png', // Crear y añadir este icono (180x180px)
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-backgroundsecond dark:bg-backgroundsecond`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Layout>{children}</Layout>
            <WhatsAppButton />
          </div>
        </Providers>
      </body>
    </html>
  )
}