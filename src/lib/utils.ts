import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeatherGradient(description: string): string {
  const weatherCategoryGradients: Record<string, string[]> = {
    clear: ['from-green-400 to-green-600', 'from-emerald-400 to-emerald-600'],
    cloud: ['from-blue-400 to-blue-600', 'from-sky-400 to-sky-600'],
    rain: ['from-orange-400 to-orange-600', 'from-amber-400 to-amber-600'],
    mist: ['from-red-400 to-red-600', 'from-rose-400 to-rose-600'],
    snow: ['from-cyan-400 to-cyan-600', 'from-slate-400 to-slate-600'],
    default: ['from-gray-400 to-gray-600'],
  };

  function getCategory(desc: string): string {
    const d = desc.toLowerCase();
    if (d.includes('clear')) return 'clear';
    if (d.includes('cloud')) return 'cloud';
    if (d.includes('rain') || d.includes('drizzle')) return 'rain';
    if (d.includes('mist') || d.includes('fog') || d.includes('haze'))
      return 'mist';
    if (d.includes('snow') || d.includes('sleet')) return 'snow';
    return 'default';
  }

  function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  const category = getCategory(description);
  const palette =
    weatherCategoryGradients[category] || weatherCategoryGradients.default;
  const index = hashString(description) % palette.length;

  return `bg-gradient-to-br ${palette[index]}`;
}
