import React from 'react';
import Header from './Header';
import HeroSection from '@/components/layout/HeroSection'


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Classic Cars Marketplace</p>
      </footer>
    </div>
  );
};

export default Layout;