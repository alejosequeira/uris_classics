"use client"
import React, { useState } from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [exploding, setExploding] = useState(false);
  
  // Construimos la URL de WhatsApp
  const phoneNumber = '+5493454090694';
  const message = 'Hola! Me interesa que me contacten. Quisiera realizar un desarrollo sobre ...';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Manejador para activar la explosión
  const handleExplosion = () => {
    setExploding(true);
    
    // Después de la animación, redirigir a WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      
      // Importante: Remover la animación después de abrirse WhatsApp
      setTimeout(() => {
        setExploding(false);
      }, 100);
    }, 1600); // Tiempo de la animación
  };

  return (
    <div className="relative min-h-screen">
      {/* Capa de explosión con pointer-events: none para permitir clics */}
      {exploding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="explosion-animation"></div>
        </div>
      )}

      <Header />
      <div className="relative">
        <main className="relative">
          {children}
        </main>
      </div>
      <footer className="relative text-white p-4 text-center">
        <p>
          Developed by{' '}
          <button 
            onClick={handleExplosion}
            className="text-brand hover:text-brand-dark underline cursor-pointer bg-transparent border-0 p-0 font-inherit"
          >
            @sequee.ios
          </button>
        </p>
      </footer>
    </div>
  );
};

export default Layout;