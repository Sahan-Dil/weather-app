'use client';

import Image from 'next/image';
import headerBg from '@/public/assets/Header-bg.png';
import logo from '@/public/assets/logo.png';

export default function Header() {
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

      {/* Overlay content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 py-10">
        <div className="flex items-center px-4 py-2 space-x-3">
          <Image src={logo} alt="Weather Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold text-white">Weather App</h1>
        </div>
      </div>
    </header>
  );
}
