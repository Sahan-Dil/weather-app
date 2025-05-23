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

export default function ForecastItemSingle({
  CityName,
  src,
  countryCode,
  Temp,
  Status,
  TempMin = '25',
  TempMax = '28',
  Pressure = '1018hPa',
  Humidity = '78%',
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
          ? 'overflow-hidden rounded-lg w-full flex flex-col h-[400px]'
          : 'cursor-pointer overflow-hidden rounded-lg w-full flex flex-col h-[400px] transition-transform transition-shadow transition-opacity duration-500 ease-in-out hover:scale-[0.98] hover:-translate-y-1 hover:shadow-2xl hover:opacity-100 opacity-90'
      }
    >
      {/* Top Section */}
      <div className={`relative text-white ${gradient} flex-1 px-6 py-6`}>
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={cloudBg}
            alt="Clouds Background"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
        </div>

        {fullView && (
          <button
            onClick={onBack}
            className="cursor-pointer absolute top-4 left-4 text-white text-xl font-bold z-20"
          >
            ←
          </button>
        )}

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-xl font-semibold">
              {CityName}, {countryCode}
            </div>
            <div className="text-sm opacity-90 mt-1">
              {formattedTime}, {formattedDate}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto px-4">
              <div className="flex justify-center gap-8 items-center">
                {/* Weather Icon and Status */}
                <div className="flex flex-col items-center">
                  <img src={src} alt={Status} width={48} height={48} />
                  <div className="text-sm font-medium">{Status}</div>
                </div>

                {/* Vertical Divider Line */}
                <div className="h-24 w-px bg-white opacity-30"></div>

                {/* Temperature */}
                <div className="text-center">
                  <div className="flex items-start justify-center">
                    <span className="text-6xl font-light leading-none">
                      {roundedTemp}
                    </span>
                    <span className="text-2xl mt-2 ml-1">°C</span>
                  </div>
                  <div className="text-sm mt-3 space-y-1">
                    <div>Temp Min: {TempMin}°C</div>
                    <div>Temp Max: {TempMax}°C</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#383B47] text-white text-sm p-4 sm:p-6 flex justify-between items-center">
        <div className="space-y-2 text-xs sm:text-sm">
          <div>
            <span className="font-medium">Pressure:</span> {Pressure}
          </div>
          <div>
            <span className="font-medium">Humidity:</span> {Humidity}
          </div>
          <div>
            <span className="font-medium">Visibility:</span> {Visibility}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mx-2 sm:mx-4">
          <div className="text-lg sm:text-xl mb-1 sm:mb-2">
            <Image
              src={arrowIcon}
              alt="Clouds Background"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </div>
          <div className="text-center text-[10px] sm:text-xs">
            <div>{WindSpeed}</div>
            <div>{WindDirection}</div>
          </div>
        </div>

        <div className="space-y-2 text-right text-xs sm:text-sm">
          <div>
            <span className="font-medium">Sunrise:</span> {Sunrise}
          </div>
          <div>
            <span className="font-medium">Sunset:</span> {Sunset}
          </div>
        </div>
      </div>
    </div>
  );
}
