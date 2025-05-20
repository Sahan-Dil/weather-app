'use client';

import { useEffect, useState } from 'react';
import ForecastItem from './ForecastItem';

import cityData from '../public/services/city.json';

interface City {
  CityCode: string;
  CityName: string;
  Temp: string;
  Status: string;
}

export default function WeatherOverview() {
  const [forecast, setForecast] = useState<City[]>([]);

  useEffect(() => {
    if (cityData.List) {
      setForecast(cityData.List);
    }
  }, []);

  return (
    <div className="px-6 sm:px-12 md:px-20 lg:px-36 xl:px-60 2xl:px-80 py-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
      {forecast.map((item) => (
        <div key={item.CityCode}>
          <ForecastItem {...item} />
        </div>
      ))}
    </div>
  );
}
