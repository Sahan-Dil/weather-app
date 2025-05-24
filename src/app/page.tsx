'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WeatherOverview from '@/components/WeatherOverview';
import LoginModal from '@/components/LoginModal';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user, isLoading } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!user && !isLoading) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [user, isLoading]);

  return (
    <div className="flex flex-col min-h-screen bg-[#1e2027]">
      <Header />

      <main className="flex-grow p-6 space-y-6">
        {!isLoading && user && (
          <div className="mt-[-150px] md:mt-[-250px]">
            <WeatherOverview />
          </div>
        )}
      </main>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
