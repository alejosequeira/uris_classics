"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Menu, X } from 'lucide-react'; // Importar iconos para el menú

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500
                     ${isScrolled
        ? 'bg-gradient-to-r from-[rgb(var(--emerald))] via-[rgb(var(--emerald-light))] to-[rgb(var(--navy))] shadow-lg'
        : 'bg-transparent'}
                     ${!isScrolled ? 'border-b-0' : 'border-b border-[rgb(var(--soft-gold))]/30'}`}>
      <div className="w-full px-4 md:px-12 py-4">
        <div className="flex justify-between items-center">
          {/* Logo + Nombre */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative w-12 h-12 flex-shrink-0 transform transition-transform group-hover:scale-105">
              <Image
                src="/images/website/logo-mote.png"
                alt="MOTE Logo"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold tracking-widest
                           text-[rgb(var(--soft-gold))]
                           drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">
                MOTE
              </span>
              <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase
                           text-[rgb(var(--soft-gold))]/80">
                Classic Cars
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center space-x-12 mr-12">
              {['INVENTORY', 'ABOUT', 'CONTACT'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="relative py-2 text-base font-medium tracking-wide
                             text-[rgb(var(--soft-gold))]
                             transition-all duration-300
                             hover:text-[rgb(var(--soft-gold))]/90
                             after:content-[''] after:absolute after:bottom-0 
                             after:left-1/2 after:w-0 after:h-[1px] 
                             after:bg-[rgb(var(--soft-gold))]
                             hover:after:w-full hover:after:left-0 
                             after:transition-all after:duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-6">
              <ThemeToggle />
              <Link
                href="cars"
                className="px-6 py-2 rounded-full 
                         bg-[rgb(var(--soft-gold))]
                         text-[rgb(var(--emerald))] dark:text-[rgb(var(--navy))] 
                         font-medium
                         hover:shadow-[0_0_15px_rgba(var(--soft-gold),0.3)]
                         hover:scale-105
                         transition-all duration-300"
              >
                NEW ARRIVALS!
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[rgb(var(--soft-gold))] transition-all duration-300
             hover:rotate-90 hover:text-[rgb(var(--soft-gold))]/80"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-[72px] left-0 right-0 
                 bg-[rgb(var(--emerald))] dark:bg-[rgb(var(--carbon))]
                 border-t border-[rgb(var(--soft-gold))]/30
                 animate-fadeIn"> {/* Añadida animación de entrada */}
            <nav className="px-4 py-4">
              <ul className="space-y-6">
                {['INVENTORY', 'ABOUT', 'CONTACT'].map((item, index) => (
                  <li key={item} className="relative">
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="block text-base font-medium
                       text-[rgb(var(--soft-gold))]
                       transition-all duration-300
                       hover:translate-x-2" // Efecto hover sutil
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                    {/* Separador decorativo que ocupa todo el ancho */}
                    {index !== 3 && (
                      <div className="flex items-center">
                        <div className="h-px flex-1 bg-[rgb(var(--soft-gold))]/30" />
                        <div className="w-2 h-2 rotate-45 mx-4 border border-[rgb(var(--soft-gold))]" />
                        <div className="h-px flex-1 bg-[rgb(var(--soft-gold))]/30" />
                      </div>
                    )}
                  </li>
                ))}
                <li>
                  <Link
                    href="cars"
                    className="block py-2 text-base font-medium text-center
                     text-[rgb(var(--emerald))] dark:text-[rgb(var(--navy))]
                     bg-[rgb(var(--soft-gold))]
                     rounded-full transition-all duration-300
                     hover:shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    NEW ARRIVALS!
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}


      </div>
    </header>
  );
};

export default Header;