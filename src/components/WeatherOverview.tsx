'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // If using React Router, use `useNavigate`
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
    <div className="flex flex-wrap gap-4 p-4 justify-center">
      {forecast.map((item) => (
        <div key={item.CityCode}>
          <ForecastItem {...item} />
        </div>
      ))}
    </div>
  );
}
