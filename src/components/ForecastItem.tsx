interface ForecastItemProps {
  day: string;
  icon: string;
  temp: string;
}

export default function ForecastItem({ day, icon, temp }: ForecastItemProps) {
  return (
    <div className="text-center">
      <p className="text-sm font-medium">{day}</p>
      <img src={`/assets/${icon}`} alt={day} className="mx-auto w-10 h-10" />
      <p className="text-sm">{temp}°</p>
    </div>
  );
}
