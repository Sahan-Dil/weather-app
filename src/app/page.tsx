'use client';

import Header from '@/components/Header';
import WeatherCard from '@/components/WeatherCard';
import WeatherOverview from '@/components/WeatherOverview';
// import LocationSearch from '@/components/LocationSearch';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e2027]">
      <Header />
      <main className="p-6 space-y-6">
        {/* Optional: Uncomment if needed */}
        {/* <LocationSearch /> */}

        {/* Overlay card on header */}
        <div className="-mt-24 relative z-10">
          <WeatherCard
            icon="sunny.png"
            temperature="30"
            label="Colombo, Sri Lanka"
          />
        </div>

        <WeatherOverview />
      </main>
    </div>
  );
}
