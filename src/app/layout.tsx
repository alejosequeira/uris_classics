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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
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