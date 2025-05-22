import useSWR from 'swr';

const API_KEY = 'dd5a80243bc6052b298dc86579d6c76e';
const API_URL = 'https://api.openweathermap.org';

const fetchWeatherForCities = async (cityIds: string[]) => {
  const responses = await Promise.all(
    cityIds.map((id) =>
      fetch(
        `${API_URL}/data/2.5/weather?id=${id}&units=metric&appid=${API_KEY}`
      ).then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch city ID ${id}`);
        return res.json();
      })
    )
  );
  return responses;
};

export function useWeather(cityIds: string[]) {
  const key = cityIds.length > 0 ? ['weather', ...cityIds] : null;

  const { data, error, isLoading } = useSWR(
    key,
    () => fetchWeatherForCities(cityIds),
    {
      refreshInterval: 5 * 60 * 1000, // cache for 5 mins
      revalidateOnFocus: false,
    }
  );

  return {
    weatherData: data || [],
    error,
    isLoading,
  };
}
