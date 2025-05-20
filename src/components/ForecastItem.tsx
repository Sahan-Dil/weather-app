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
  const showMinMaxTemp = TempMin && TempMax;

  return (
    <div
      onClick={handleClick}
      className={`relative w-72 h-48 p-4 rounded-xl text-white shadow-lg cursor-pointer overflow-hidden ${gradient}`}
    >
      {/* Clouds background overlay */}
      <Image
        src={cloudBg}
        alt="Clouds Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 opacity-20"
      />

      {/* Weather Icon */}
      <div className="absolute top-4 right-4 w-12 h-12">
        <Image src={weatherIcon} alt={Status} width={48} height={48} />
      </div>

      {/* City & Temp Info */}
      <div className="relative z-10">
        <div className="text-sm opacity-90">
          {formattedTime}, {formattedDate}
        </div>

        <div className="text-xl font-semibold mt-1">{CityName}</div>
        <div className="text-4xl font-bold mt-1">{roundedTemp}°C</div>
        <div className="text-sm mt-1">{Status}</div>

        {showMinMaxTemp && (
          <div className="text-xs mt-1">
            Temp Min: {TempMin} • Temp Max: {TempMax}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-2 left-4 right-4 text-xs flex justify-between text-gray-100 opacity-90">
        <div>
          <div>Pressure: {Pressure}</div>
          <div>Humidity: {Humidity}</div>
          <div>Visibility: {Visibility}</div>
        </div>
        <div className="text-right">
          <div>
            Wind: {WindSpeed} {WindDirection}
          </div>
          <div>Sunrise: {Sunrise}</div>
          <div>Sunset: {Sunset}</div>
        </div>
      </div>
    </div>
  );
}
