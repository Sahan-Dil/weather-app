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
  Clear: 'bg-gradient-to-br from-green-400 to-green-600',
  Rain: 'bg-gradient-to-br from-orange-400 to-orange-600',
  Mist: 'bg-gradient-to-br from-red-400 to-red-600',
};

const statusToImage: Record<string, any> = {
  Clouds: clouds,
  Clear: clouds,
  Rain: clouds,
  Mist: clouds,
};

export default function ForecastItem({
  CityName,
  CityCode,
  Temp,
  Status,
  TempMin = 'qqq',
  TempMax = 'eee',
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
      className="cursor-pointer overflow-hidden rounded-lg w-full flex flex-col h-[240px] sm:h-[280px] md:h-[320px] transition-all duration-300 ease-in-out hover:scale-95 hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] opacity-90 hover:opacity-100"
    >
      {/* Top Section */}
      <div className={`relative text-white ${gradient} h-2/3 px-16 pt-8 pb-6`}>
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={cloudBg}
            alt="Clouds Background"
            layout="fill"
            objectFit="cover"
            className="opacity-70 mt-16"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-xl font-bold">
                {CityName}, {CityCode}
              </div>
              <div className="text-sm opacity-90 mt-1">
                {formattedTime}, {formattedDate}
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-start">
                <span className="text-6xl font-bold leading-none">
                  {roundedTemp}
                </span>
                <span className="text-2xl ml-1 mt-1">°C</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex items-center space-x-2">
              <Image src={weatherIcon} alt={Status} width={24} height={24} />
              <div className="text-base">{Status}</div>
            </div>
            <div className="text-right text-sm leading-tight">
              <div>Temp Min: {TempMin}°C</div>
              <div>Temp Max: {TempMax}°C</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#383B47] text-white text-xs p-4 flex justify-between items-start h-1/3 relative">
        {/* Left Column */}
        <div className="space-y-1">
          <div>
            <span className="font-semibold">Pressure:</span> {Pressure}
          </div>
          <div>
            <span className="font-semibold">Humidity:</span> {Humidity}
          </div>
          <div>
            <span className="font-semibold">Visibility:</span> {Visibility}
          </div>
        </div>

        {/* Center Column (Wind) */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-sm">🧭</div>
          <div className="text-center">
            {WindSpeed} {WindDirection}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-1 text-right">
          <div>
            <span className="font-semibold">Sunrise:</span> {Sunrise}
          </div>
          <div>
            <span className="font-semibold">Sunset:</span> {Sunset}
          </div>
        </div>
      </div>
    </div>
  );
}
