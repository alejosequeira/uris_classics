"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="fixed w-full top-0 z-50 backdrop-blur-md 
                   bg-[rgba(var(--header-bg-light))] dark:bg-[rgba(var(--header-bg-dark))]
                   border-b border-[rgb(var(--soft-gold))]/30
                   transition-all duration-300">
  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    {/* Logo + Nombre */}
    <Link href="/" className="flex items-center space-x-4 group">
      {/* Logo */}
      <div className="relative w-12 h-12 flex-shrink-0">
        <Image
          src="/images/website/logo-mote.png"
          alt="MOTE Logo"
          fill
          className="object-contain transition-transform duration-300"
        />
      </div>
      
      {/* Título siempre en dorado */}
      <div className="flex flex-col">
        <span className="text-3xl font-bold tracking-widest
                     text-[rgb(var(--soft-gold))]
                     drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]
                     transition-colors duration-300">
          MOTE
        </span>
        <span className="text-sm font-medium tracking-[0.2em] uppercase
                     text-[rgb(var(--soft-gold))]/80
                     drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]
                     transition-colors duration-300">
          Classic Cars
        </span>
      </div>
    </Link>

    {/* Navegación */}
    <nav className="flex items-center space-x-8">
      <ul className="flex items-center space-x-8">
        {['Collection', 'About', 'Contact'].map((item) => (
          <li key={item}>
            <Link 
              href={`/${item.toLowerCase()}`} 
              className="relative py-2 text-base font-medium tracking-wide
                       text-[rgb(var(--soft-gold))]
                       transition-all duration-300
                       after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 
                       after:h-0.5 after:bg-[rgb(var(--soft-gold))]
                       hover:after:w-full after:transition-all after:duration-300"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {session ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-[rgb(var(--soft-gold))]">
              {session.user?.name}
            </span>
            <button
              onClick={() => signOut()}
              className="px-5 py-2 rounded-full 
                       bg-[rgb(var(--soft-gold))]
                       text-[rgb(var(--emerald))] dark:text-[rgb(var(--navy))] font-medium
                       hover:shadow-md hover:scale-105
                       transition-all duration-300"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            href="auth/signin"
            className="px-5 py-2 rounded-full 
                     bg-[rgb(var(--soft-gold))]
                     text-[rgb(var(--emerald))] dark:text-[rgb(var(--navy))] font-medium
                     hover:shadow-md hover:scale-105
                     transition-all duration-300"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  </div>
</header>
  );
};

export default Header;