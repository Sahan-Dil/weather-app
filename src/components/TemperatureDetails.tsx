export default function TemperatureDetails() {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white shadow rounded-lg p-4">
      <div>
        <p className="text-gray-500 text-sm">Humidity</p>
        <p className="text-lg font-bold">72%</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm">Wind</p>
        <p className="text-lg font-bold">13 km/h</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm">Pressure</p>
        <p className="text-lg font-bold">1012 hPa</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm">Visibility</p>
        <p className="text-lg font-bold">10 km</p>
      </div>
    </div>
  );
}
