import Header from '@/components/Header';
import WeatherCard from '@/components/WeatherCard';
import TemperatureDetails from '@/components/TemperatureDetails';
import WeatherOverview from '@/components/WeatherOverview';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main className="p-6 space-y-6">
        <WeatherCard icon="cloudy.png" temperature="27" label="New York, USA" />
        <TemperatureDetails />
        <WeatherOverview />
      </main>
    </div>
  );
}
