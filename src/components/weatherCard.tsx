import WeatherIcon from '@/components/weatherIcon';
import type { SingleDayForecast } from '@/types/weather';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export interface WeatherCardProps {
  variant: 'minmax' | 'single';
  data: SingleDayForecast;
}

export default function WeatherCard({ variant, data }: WeatherCardProps) {
  if (!data.weather_code || !(data.temperature_2m || (data.temperature_2m_min && data.temperature_2m_max)) || !data.time) return null;

  return (
    <div className="w-full h-full px-8 py-4 rounded-lg bg-white flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-1 text-sm sm:text-base lg:text-lg">
        <span className="uppercase text-slate-500 tracking-wider font-bold">{DAYS_OF_WEEK[new Date(data.time).getDay()]}</span>
        <div className="font-bold tracking-wider text-slate-600">
          <span>{new Date(data.time).getDate()}</span>
          <span>/</span>
          <span>{new Date(data.time).getMonth() + 1}</span>
        </div>
      </div>
      <div className="w-full flex gap-2 justify-around py-4">
        <WeatherIcon weather_code={data.weather_code} className="w-10 h-10 lg:w-12 lg:h-12" />
        {variant === 'minmax' ? (
          <div className="flex gap-1 items-end tracking-wider">
            <div className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">{data.temperature_2m_max?.toFixed(0)}°</div>
            <div className="text-slate-600 text-base md:text-lg">{data.temperature_2m_min?.toFixed(0)}°</div>
          </div>
        ) : (
          <div className="font-bold text-sm md:text-base xl:text-lg">{data.temperature_2m}</div>
        )}
      </div>
    </div>
  );
}
