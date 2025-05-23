'use client';

import Image from 'next/image';
import headerBg from '@/public/assets/Header-bg.png';
import logo from '@/public/assets/logo.png';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <header className="relative w-full min-h-[250px] md:min-h-[450px]">
      {/* Background image */}
      <Image
        src={headerBg}
        alt="Cloud Background"
        fill
        className="object-cover object-top z-0"
        priority
      />

      {/* Login/Logout Button */}
      <div className="absolute top-4 right-6 z-10">
        {!isLoading &&
          (user ? (
            <div className="flex items-center space-x-2">
              <span className="text-white hidden md:inline">{user.name}</span>
              <Link
                href="/api/auth/logout"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
              >
                Logout
              </Link>
            </div>
          ) : (
            <Link
              href="/api/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
            >
              Login
            </Link>
          ))}
      </div>

      {/* Overlay content */}
      <div className="relative flex items-center justify-center h-full px-6 py-10">
        <div className="flex items-center px-4 py-2 space-x-3">
          <Image src={logo} alt="Weather Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold text-white">Weather App</h1>
        </div>
      </div>
    </header>
  );
}
