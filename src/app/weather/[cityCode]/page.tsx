'use client';
import { useWeather } from '@/lib/useWeather';
import { useParams } from 'next/navigation';

export default function WeatherDetailPage() {
  const params = useParams();
  const cityCode = params.cityCode as string;
  const { weatherData, isLoading, error } = useWeather([cityCode]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="font-bold text-lg mb-2">
        Weather for city ID: {cityCode}
      </h2>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(weatherData[0], null, 2)}
      </pre>
    </div>
  );
}
