import '../styles/globals.css'
import type { Metadata } from 'next'
import Layout from '../components/layout/Layout'
import { Inter } from 'next/font/google'  
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Classic Cars Marketplace',
  description: 'Find and buy your dream classic or muscle car',
  keywords: 'classic cars, muscle cars, vintage automobiles, car marketplace',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
            <Layout>{children}</Layout>
          
        </ThemeProvider>
      </body>
    </html>
  )
}