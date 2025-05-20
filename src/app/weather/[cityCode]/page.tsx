'use client';

import { useParams } from 'next/navigation';

export default function WeatherDetails() {
  const params = useParams();
  const cityCode = params?.cityCode;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Weather Details for City Code: {cityCode}
      </h1>
      {/* Fetch and show details here */}
    </div>
  );
}
