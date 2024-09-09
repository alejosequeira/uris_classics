"use client"
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

// import { useRouter } from '../../api/auth/signin';
const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Classic Cars Marketplace
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link href="/cars" className="hover:text-gray-300">Cars</Link></li>
            <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            {session ? (
              <>
                <li>Welcome, {session.user?.name}</li>
                <li><button onClick={() => signOut()} className="hover:text-gray-300">Sign out</button></li>
              </>
            ) : (
              <li><Link href="api/auth/signin" className="hover:text-gray-300">Sign in</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;