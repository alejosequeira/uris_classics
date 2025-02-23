"use client";
import { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

import { motion, AnimatePresence } from "framer-motion";

// Constantes
const NAVIGATION_ITEMS = ["INVENTORY", "ABOUT", "CONTACT"] as const;
const SCROLL_THRESHOLD = 50;

// Componente Link memoizado
const NavLink = memo(({ 
  href, 
  children, 
  className, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  className: string;
  onClick?: () => void;
}) => (
  <Link href={href} className={className} onClick={onClick}>
    {children}
  </Link>
));
NavLink.displayName = 'NavLink';

// Componente Logo memoizado
const Logo = memo(({ isScrolled, isLightMode }: { isScrolled: boolean; isLightMode: boolean }) => (
  <Link href="/" className="flex items-center space-x-4 group">
    <div className="relative w-12 h-12 flex-shrink-0 transform transition-transform group-hover:scale-105">
      <Image
        src="/images/optimizadoback/logo-mote.png"
        alt="MOTE Logo"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain"
        priority
      />
    </div>

    <div className="flex flex-col">
      <span
        className={`text-2xl md:text-3xl font-bold tracking-widest transition-all duration-300 ${
          isScrolled && isLightMode
            ? "fire-text-intense"
            : "text-[var(--brand)] text-glow"
        }`}
      >
        MOTE
      </span>
      <span
        className={`text-xs md:text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
          isScrolled
            ? "text-[var(--foreground)]/80"
            : "text-[var(--brand-light)]/80"
        }`}
      >
        Classic Cars
      </span>
    </div>
  </Link>
));
Logo.displayName = 'Logo';

// Componente Navigation Desktop memoizado
const DesktopNav = memo(({ isScrolled }: { isScrolled: boolean }) => (
  <nav className="hidden md:flex items-center">
    <ul className="flex items-center space-x-12 mr-12">
      {NAVIGATION_ITEMS.map((item) => (
        <li key={item}>
          <NavLink
            href={`/${item.toLowerCase()}`}
            className="relative py-2 text-base font-medium tracking-wide transition-colors duration-300 text-[var(--brand)] hover:text-[var(--brand-light)]"
          >
            {item}
          </NavLink>
        </li>
      ))}
    </ul>

    <div className="flex items-center space-x-6">
      <ThemeToggle />
      <NavLink
        href="/cars"
        className="px-6 py-2 rounded-full bg-[var(--brand)] text-[var(--foreground)] font-medium hover:shadow-[0_0_15px_var(--brand-light)] hover:scale-105 transition-all duration-300"
      >
        NEW ARRIVALS!
      </NavLink>
    </div>
  </nav>
));
DesktopNav.displayName = 'DesktopNav';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "INVENTORY", href: "/inventory" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" }
];

const MenuItem = memo(({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <motion.li
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -20, opacity: 0 }}
    className="relative"
  >
    <Link 
      href={href}
      onClick={onClick}
      className="block py-4 text-lg font-medium text-red-500 transition-all duration-300
                hover:text-red-600 hover:translate-x-2"
    >
      {children}
    </Link>
  </motion.li>
));
MenuItem.displayName = 'MenuItem';

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Constantes de animación
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        when: "beforeChildren"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop con blur */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menú */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-[72px] left-0 right-0 bg-gradient-to-b from-black to-[#1a1a1a] 
                     shadow-2xl border-t border-red-500/20 z-50"
          >
            {/* Header del menú */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-red-500/10">
              <h2 className="text-red-500 text-xl font-bold">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-500/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-red-500" />
              </button>
            </div>

            {/* Items del menú */}
            <nav className="px-6 py-4">
              <motion.ul className="space-y-2">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </motion.ul>

              {/* Botón de New Arrivals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8"
              >
                <Link
                  href="/cars"
                  onClick={onClose}
                  className="block w-full py-4 text-center text-white font-bold
                           bg-gradient-to-r from-red-600 to-red-500
                           rounded-lg shadow-lg shadow-red-500/20
                           hover:shadow-red-500/30 hover:scale-[1.02]
                           active:scale-[0.98] transition-all duration-300"
                >
                  NEW ARRIVALS!
                </Link>
              </motion.div>
            </nav>

            {/* Footer del menú */}
            <div className="mt-8 px-6 py-4 border-t border-red-500/10">
              <p className="text-red-500/60 text-sm text-center">
                MOTE Classic Cars © 2025
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
MobileMenu.displayName = 'MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const isLightMode = theme === "light" || resolvedTheme === "light";

  // Optimizar el manejo del scroll con throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler memoizado para el menú móvil
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[var(--gradient-primary)] shadow-xl backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 md:px-12 py-4">
        <div className="flex justify-between items-center">
          <Logo isScrolled={isScrolled} isLightMode={isLightMode} />
          <DesktopNav isScrolled={isScrolled} />

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 text-[var(--brand)] transition-all duration-300 hover:rotate-90 hover:text-[var(--brand-light)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </header>
  );
};

export default memo(Header);