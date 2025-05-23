import { NextResponse } from 'next/server';
import cityData from './city.json';

let cache: { data: any[]; timestamp: number } | null = null;
const CACHE_DURATION = 0.5 * 60 * 1000;
const API_KEY = 'dd5a80243bc6052b298dc86579d6c76e';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function GET() {
  const now = Date.now();

  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json({
      data: cache.data,
      _cache: {
        cached: true,
        timestamp: cache.timestamp,
        age: now - cache.timestamp,
      },
    });
  }

  const cityCodes = cityData.List.map((c) => c.CityCode);

  try {
    const results = await Promise.all(
      cityCodes.map(async (id) => {
        const res = await fetch(
          `${API_URL}?id=${id}&units=metric&appid=${API_KEY}`
        );
        if (!res.ok) throw new Error(`Failed to fetch for city ID ${id}`);
        return res.json();
      })
    );

    cache = { data: results, timestamp: now };

    return NextResponse.json({
      data: results,
      _cache: {
        cached: false,
        timestamp: now,
        age: 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch weather data for some cities' },
      { status: 500 }
    );
  }
}
