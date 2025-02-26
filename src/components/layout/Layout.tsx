import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="relative">
       
        <main className="relative ">
          {children}
        </main>
      </div>
      <footer className="relative text-white p-4 text-center">
        <p>&copy; 2025 Classic Cars Marketplace</p>
      </footer>
    </div>
  );
};

export default Layout;