import React from 'react';
import Header from './Header';
import HeroSection from '@/components/layout/HeroSection'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="relative">
        <HeroSection />
        <main className="relative ">
          {children}
        </main>
      </div>
      <footer className="relative text-white p-4 text-center">
        <p>&copy; 2024 Classic Cars Marketplace</p>
      </footer>
    </div>
  );
};

export default Layout;