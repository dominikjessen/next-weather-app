import { arrayTransformDailyForecastData } from '@/utils/utils';
import type { DailyForecast, DailyUnits } from '@/types/weather';
import WeatherCard from './weatherCard';

export interface DailyForecastProps {
  data: DailyForecast;
  units?: DailyUnits;
}

export default function DailyForecast({ data, units }: DailyForecastProps) {
  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8 items-center">
      <h3 className="font-bold text-xl md:text-2xl text-slate-700">10-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {arrayTransformDailyForecastData(data).map((day) => (
          <WeatherCard key={day.time} variant="minmax" data={day} />
        ))}
      </div>
    </div>
  );
}
