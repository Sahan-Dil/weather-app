'use client';

import Image from 'next/image';
import cloudBg from '../public/assets/clouds-bg.png';
import { getWeatherGradient } from '@/lib/utils';
import arrowIcon from '../public/assets/arrow.png';

interface ForecastProps {
  CityName: string;
  src: string;
  countryCode: string;
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
  onBack?: () => void;
  fullView?: boolean;
}

export default function ForecastItem({
  CityName,
  src,
  countryCode,
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
  onBack,
  fullView,
}: ForecastProps) {
  const gradient = getWeatherGradient(Status);

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

  const roundedTemp = Math.round(parseFloat(Temp));

  return (
    <div
      className={
        fullView
          ? 'overflow-hidden rounded-lg w-full flex flex-col h-[240px] sm:h-[280px] md:h-[320px]'
          : 'cursor-pointer overflow-hidden rounded-lg w-full flex flex-col h-[240px] sm:h-[280px] md:h-[320px] transition-transform transition-shadow transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[0.98] hover:-translate-y-1 hover:shadow-2xl hover:opacity-100 opacity-90'
      }
    >
      {/* Top Section */}
      <div
        className={`relative text-white ${gradient} h-2/3 px-4 sm:px-8 md:px-12 lg:px-16 pt-6 sm:pt-8 pb-4 sm:pb-6`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={cloudBg}
            alt="Clouds Background"
            layout="fill"
            objectFit="cover"
            className="opacity-70 mt-8 sm:mt-12 md:mt-16"
          />
        </div>
        {fullView && (
          <button
            onClick={onBack}
            className="cursor-pointer absolute top-1 left-1 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition"
          >
            <strong>←</strong>
          </button>
        )}

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-start sm:items-center justify-center text-left sm:text-center">
              <div className="text-lg sm:text-xl font-bold">
                {CityName}, {countryCode}
              </div>
              <div className="text-xs sm:text-sm opacity-90 mt-1">
                {formattedTime}, {formattedDate}
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-start">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none">
                  {roundedTemp}
                </span>
                <span className="text-lg sm:text-xl md:text-2xl ml-1 mt-1">
                  °C
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex items-center space-x-1">
              <img
                src={src}
                alt={Status}
                width={36}
                height={36}
                className="sm:w-12 sm:h-12"
              />
              <div className="text-xs sm:text-sm">{Status}</div>
            </div>
            <div className="text-right text-xs sm:text-sm leading-tight ml-2 sm:ml-6">
              <div>Min: {TempMin}°C</div>
              <div>Max: {TempMax}°C</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#383B47] text-white text-xs p-3 sm:p-4 flex justify-between items-start h-1/3 relative">
        {/* Left Column */}
        <div className="space-y-1 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-xs">Pressure:</span>
            <span className="sm:ml-1 text-xs">{Pressure}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-xs">Humidity:</span>
            <span className="sm:ml-1 text-xs">{Humidity}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-xs">Visibility:</span>
            <span className="sm:ml-1 text-xs">{Visibility}</span>
          </div>
        </div>

        {/* Center Column (Wind) */}
        <div className="flex flex-col items-center justify-center flex-1 px-2">
          <div className="text-sm mb-1 sm:mb-2">
            <Image
              src={arrowIcon}
              alt="Arrow Icon"
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
          </div>
          <div className="text-center text-xs">
            {WindSpeed} {WindDirection}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-1 text-right flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end">
            <span className="font-semibold text-xs sm:mr-1">Sunrise:</span>
            <span className="text-xs">{Sunrise}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end">
            <span className="font-semibold text-xs sm:mr-1">Sunset:</span>
            <span className="text-xs">{Sunset}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
