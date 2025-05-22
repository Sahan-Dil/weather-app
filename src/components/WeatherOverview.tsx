'use client';

import { useEffect, useMemo, useState } from 'react';
import ForecastItem from './ForecastItem';
import cityData from '../public/services/city.json';
import { useWeather } from '@/lib/useWeather';

interface City {
  CityCode: string;
  CityName: string;
}

export default function WeatherOverview() {
  const [cityList, setCityList] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

  useEffect(() => {
    if (cityData.List) {
      setCityList(cityData.List);
    }
  }, []);

  const cityIds = useMemo(() => cityList.map((c) => c.CityCode), [cityList]);
  const { weatherData, isLoading, error } = useWeather(cityIds);

  if (isLoading) return <div className="p-4">Loading weather...</div>;
  if (error)
    return <div className="p-4 text-red-500">Failed to load weather.</div>;

  const selectedData = weatherData.find((w: any) => w.id === selectedCityId);

  if (selectedCityId && selectedData) {
    return (
      <div className="px-4 py-8 flex justify-center">
        <div className="w-full sm:w-3/4 lg:w-1/2">
          <ForecastItem
            CityCode={selectedData.id}
            CityName={selectedData.name}
            Temp={`${selectedData.main.temp} °C`}
            Status={selectedData.weather?.[0]?.main || 'Unknown'}
            TempMin={`${selectedData.main.temp_min}`}
            TempMax={`${selectedData.main.temp_max}`}
            Pressure={`${selectedData.main.pressure} hPa`}
            Humidity={`${selectedData.main.humidity}%`}
            Visibility={`${selectedData.visibility / 1000} km`}
            WindSpeed={`${selectedData.wind.speed} m/s`}
            WindDirection={`${selectedData.wind.deg}°`}
            Sunrise={new Date(
              selectedData.sys.sunrise * 1000
            ).toLocaleTimeString()}
            Sunset={new Date(
              selectedData.sys.sunset * 1000
            ).toLocaleTimeString()}
            onBack={() => setSelectedCityId(null)}
            fullView={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 sm:px-12 md:px-20 lg:px-36 xl:px-60 2xl:px-80 py-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
      {weatherData.map((item: any) => (
        <div key={item.id} onClick={() => setSelectedCityId(item.id)}>
          <ForecastItem
            CityCode={item.id}
            CityName={item.name}
            Temp={`${item.main.temp} °C`}
            Status={item.weather?.[0]?.main || 'Unknown'}
            TempMin={`${item.main.temp_min}`}
            TempMax={`${item.main.temp_max}`}
            Pressure={`${item.main.pressure} hPa`}
            Humidity={`${item.main.humidity}%`}
            Visibility={`${item.visibility / 1000} km`}
            WindSpeed={`${item.wind.speed} m/s`}
            WindDirection={`${item.wind.deg}°`}
            Sunrise={new Date(item.sys.sunrise * 1000).toLocaleTimeString()}
            Sunset={new Date(item.sys.sunset * 1000).toLocaleTimeString()}
          />
        </div>
      ))}
    </div>
  );
}
