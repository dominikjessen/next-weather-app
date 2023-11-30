import type { CurrentForecast, CurrentUnits } from '@/types/weather';
import WeatherIcon from './weatherIcon';

export interface CurrentForecastProps {
  data: CurrentForecast;
  units?: CurrentUnits;
}

export default function CurrentForecast({ data, units }: CurrentForecastProps) {
  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8 items-center">
      <h3 className="font-bold text-xl md:text-2xl text-slate-700">Currently</h3>
      <div className="flex gap-6 md:gap-16 lg:gap-20 xl:gap-24 items-center py-6 md:py-8 px-8 md:px-16 lg:px-20 xl:px-24 bg-white rounded-xl">
        <div className="flex items-center gap-4 lg:gap-8">
          <WeatherIcon weather_code={data.weather_code} className="w-12 h-12 lg:w-24 lg:h-24" />
          <div className="flex gap-0.5">
            <span className="font-bold text-3xl lg:text-5xl tracking-wide">{data.temperature_2m.toFixed(0)}</span>
            <span>{units?.temperature_2m}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-slate-600 text-sm lg:text-base">
          <div className="flex gap-0.5">
            <span>Feels like:</span>
            <span>{data.apparent_temperature.toFixed(0)}</span>
            <span>{units?.apparent_temperature}</span>
          </div>
          <div className="flex gap-0.5">
            <span>Precipitation:</span>
            <span>{data.precipitation.toFixed(2)}</span>
            <span>{units?.precipitation}</span>
          </div>
          <div className="flex gap-0.5">
            <span>Humidity:</span>
            <span>{data.relative_humidity_2m.toFixed(0)}</span>
            <span>{units?.relative_humidity_2m}</span>
          </div>
          <div className="flex gap-0.5">
            <span>Wind:</span>
            <span>{data.wind_speed_10m.toFixed(0)}</span>
            <span>{units?.wind_speed_10m}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
