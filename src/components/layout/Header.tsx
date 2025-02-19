"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const isLightMode = theme === "light" || resolvedTheme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Llamada inicial
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-[var(--gradient-primary)] shadow-xl backdrop-blur-md"
        : "bg-transparent"
        }`}
    >
      <div className="w-full px-4 md:px-12 py-4">
        <div className="flex justify-between items-center">
          {/* Logo + Nombre */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative w-12 h-12 flex-shrink-0 transform transition-transform group-hover:scale-105">
              <Image
                src="/images/optimizadoback/logo-mote.png"
                alt="MOTE Logo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span
                className={`text-2xl md:text-3xl font-bold tracking-widest transition-all duration-300 ${isScrolled && isLightMode
                    ? "fire-text-intense"
                    : "text-[var(--brand)] text-glow"
                  }`}
              >
                MOTE
              </span>
              <span
                className={`text-xs md:text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${isScrolled
                  ? "text-[var(--foreground)]/80"
                  : "text-[var(--brand-light)]/80"
                  }`}
              >
                Classic Cars
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center space-x-12 mr-12">
              {["INVENTORY", "ABOUT", "CONTACT"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="relative py-2 text-base font-medium tracking-wide transition-colors duration-300 text-[var(--brand)] hover:text-[var(--brand-light)]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-6">
              <ThemeToggle />
              <Link
                href="/cars"
                className="px-6 py-2 rounded-full bg-[var(--brand)] text-[var(--foreground)] font-medium hover:shadow-[0_0_15px_var(--brand-light)] hover:scale-105 transition-all duration-300"
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
              className="p-2 text-[var(--brand)] transition-all duration-300 hover:rotate-90 hover:text-[var(--brand-light)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed top-[72px] left-0 right-0 bg-[var(--background)] border-t border-[var(--brand-dark)] animate-fadeIn"
          >
            <nav className="px-4 py-4">
              <ul className="space-y-6">
                {["INVENTORY", "ABOUT", "CONTACT"].map((item, index) => (
                  <li key={item} className="relative">
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="block text-base font-medium text-[var(--brand)] transition-all duration-300 hover:translate-x-2 hover:text-[var(--brand-light)]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                    {index !== 3 && (
                      <div className="flex items-center">
                        <div className="h-px flex-1 bg-[var(--brand-light)]/30" />
                        <div className="w-2 h-2 rotate-45 mx-4 border border-[var(--brand-light)]" />
                        <div className="h-px flex-1 bg-[var(--brand-light)]/30" />
                      </div>
                    )}
                  </li>
                ))}
                <li>
                  <Link
                    href="/cars"
                    className="block py-2 text-base font-medium text-center text-[var(--foreground)] bg-[var(--brand)] rounded-full transition-all duration-300 hover:shadow-lg"
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
