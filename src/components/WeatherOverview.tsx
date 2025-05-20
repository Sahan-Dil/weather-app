import ForecastItem from './ForecastItem';

export default function WeatherOverview() {
  const forecast = [
    { day: 'Mon', icon: 'sunny.png', temp: '28' },
    { day: 'Tue', icon: 'cloudy.png', temp: '26' },
    { day: 'Wed', icon: 'rainy.png', temp: '24' },
  ];

  return (
    <div className="flex justify-between bg-white p-4 rounded-lg shadow">
      {forecast.map((item) => (
        <ForecastItem key={item.day} {...item} />
      ))}
    </div>
  );
}
