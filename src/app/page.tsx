'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WeatherOverview from '@/components/WeatherOverview';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e2027]">
      <Header />
      <main className="p-6 space-y-6">
        <div className="mt-[-150px] md:mt-[-250px]">
          <WeatherOverview />
        </div>
      </main>
      <Footer />
    </div>
  );
}
