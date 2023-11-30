import CurrentForecast from '@/components/currentForecast';
import DailyForecast from '@/components/dailyForecast';
import Search from '@/components/search';
import { WeatherForecast } from '@/types/weather';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  let forecast: WeatherForecast | null = null;

  const locationQuery = searchParams?.location ?? null;

  if (typeof locationQuery === 'string') {
    const latLong = locationQuery.split(',');
    if (latLong) {
      const timezone = 'timezone=auto';
      const forecast_days = 'forecast_days=10';
      const current = 'current=weather_code,temperature_2m,precipitation,apparent_temperature,wind_speed_10m,relative_humidity_2m';
      const daily = 'daily=weather_code,temperature_2m_max,temperature_2m_min';

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latLong[0]}&longitude=${latLong[1]}&${timezone}&${current}&${daily}&${forecast_days}`
      );

      if (res.ok) {
        forecast = (await res.json()) as WeatherForecast;
      }
    }
  }

  return (
    <main className="flex flex-col gap-4 lg:gap-8 items-center justify-center w-11/12 md:w-4/5 mx-auto py-4">
      <Search />
      {forecast && forecast.current && <CurrentForecast data={forecast.current} units={forecast.current_units} />}
      {forecast && forecast.daily && <DailyForecast data={forecast.daily} />}
    </main>
  );
}
