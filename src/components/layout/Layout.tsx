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
      <div className="flex-grow relative"> {/* Agregamos flex-grow aquí */}
        <div className="h-full"> {/* Contenedor para asegurar altura completa */}
          <HeroSection />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        <p>&copy; 2024 Classic Cars Marketplace</p>
      </footer>
    </div>
  );
};

export default Layout;