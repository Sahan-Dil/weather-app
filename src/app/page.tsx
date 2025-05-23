'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WeatherOverview from '@/components/WeatherOverview';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function Home() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-[#1e2027]">
        <Link
          href="/api/auth/login"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
        >
          Logout
        </Link>
        <Header />
        <main className="p-6 space-y-6">
          <div className="mt-[-150px] md:mt-[-250px]">
            <WeatherOverview />
          </div>
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}
