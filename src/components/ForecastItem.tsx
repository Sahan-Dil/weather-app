'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import cloudBg from '../public/assets/clouds-bg.png';
import clouds from '../public/assets/clouds.png';

interface ForecastProps {
  CityName: string;
  CityCode: string;
  Temp: string;
  Status: string;
  TempMin?: string;
  TempMax?: string;
  Pressure?: string;
  Humidity?: string;
  Visibility?: string;
  WindSpeed?: string;
  WindDirection?: string;
  Sunrise?: string;
  Sunset?: string;
  ForecastDate?: string;
  Time?: string;
}

const statusToStyle: Record<string, string> = {
  Clouds: 'bg-gradient-to-br from-blue-400 to-blue-600',
  'Few Clouds': 'bg-gradient-to-br from-blue-400 to-blue-600',
  Clear: 'bg-gradient-to-br from-green-400 to-green-600',
  Rain: 'bg-gradient-to-br from-orange-400 to-orange-600',
  Mist: 'bg-gradient-to-br from-red-400 to-red-600',
  'Broken Clouds': 'bg-gradient-to-br from-purple-400 to-purple-600',
};

const statusToImage: Record<string, any> = {
  Clouds: clouds,
  'Few Clouds': clouds,
  Clear: '/assets/clear.png',
  Rain: '/assets/rain.png',
  Mist: '/assets/mist.png',
  'Broken Clouds': '/assets/clouds.png',
};

export default function ForecastItem({
  CityName,
  CityCode,
  Temp,
  Status,
  TempMin = '',
  TempMax = '',
  Pressure = '1018hPa',
  Humidity = '70%',
  Visibility = '8.0km',
  WindSpeed = '4.0m/s',
  WindDirection = '120°',
  Sunrise = '6:05am',
  Sunset = '6:05am',
  ForecastDate,
  Time,
}: ForecastProps) {
  const router = useRouter();
  const gradient =
    statusToStyle[Status] || 'bg-gradient-to-br from-gray-400 to-gray-600';
  const weatherIcon = statusToImage[Status] || '/assets/default.png';

  // Handle date and time formatting
  const currentDate = new Date();
  const formattedTime =
    Time ||
    currentDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formattedDate =
    ForecastDate ||
    `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}`;

  const handleClick = () => {
    router.push(`/weather/${CityCode}`);
  };

  const roundedTemp = Math.round(parseFloat(Temp));

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer shadow-lg overflow-hidden rounded-xl w-64 relative"
    >
      {/* Top weather section with colored background */}
      <div className={`relative p-4 text-white ${gradient} h-36`}>
        {/* Clouds background overlay - only in top section */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={cloudBg}
            alt="Clouds Background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
        </div>

        {/* Close button (X) - top right */}
        <div className="absolute top-2 right-2 z-10">
          <button className="text-white text-lg font-bold">&times;</button>
        </div>

        {/* City & Time Info */}
        <div className="relative z-10">
          <div className="text-lg font-semibold">
            {CityName}, {CityCode}
          </div>
          <div className="text-xs opacity-90">
            {formattedTime}, {formattedDate}
          </div>

          <div className="flex items-start mt-2">
            <div className="flex-1">
              <div className="flex items-start">
                <span className="text-5xl font-bold">{roundedTemp}</span>
                <span className="text-xl mt-1">°C</span>
              </div>
              <div className="text-sm mt-1">{Status}</div>
            </div>

            {/* Weather Icon */}
            <div className="mr-2">
              <Image src={weatherIcon} alt={Status} width={36} height={36} />
            </div>
          </div>

          {TempMin && TempMax && (
            <div className="text-xs mt-1">
              Temp Min: {TempMin} • Temp Max: {TempMax}
            </div>
          )}
        </div>
      </div>

      {/* Bottom section with black background */}
      <div className="bg-gray-900 text-white p-2">
        <div className="flex justify-between items-center text-xs">
          {/* Left column */}
          <div>
            <div>Pressure: {Pressure}</div>
            <div>Humidity: {Humidity}</div>
            <div>Visibility: {Visibility}</div>
          </div>

          {/* Wind direction icon and measurement */}
          <div className="flex flex-col items-end">
            <div>
              {WindSpeed} {WindDirection}
            </div>
            <div>Sunrise: {Sunrise}</div>
            <div>Sunset: {Sunset}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
