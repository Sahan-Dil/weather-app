interface WeatherCardProps {
  icon: string;
  temperature: string;
  label: string;
}

export default function WeatherCard({
  icon,
  temperature,
  label,
}: WeatherCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
      <img src={`/assets/${icon}`} alt={label} className="w-12 h-12" />
      <div>
        <p className="text-xl font-semibold">{temperature}°C</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
