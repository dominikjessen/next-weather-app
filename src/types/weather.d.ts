export type WeatherForecast = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units?: CurrentUnits;
  current?: CurrentForecast;
  daily_units?: DailyUnits;
  daily?: DailyForecast;
};

export type CurrentUnits = {
  time: 'iso8601';
  interval: 'seconds';
  weather_code: 'wmo code';
  temperature_2m: '°C';
  relative_humidity_2m: '%';
  apparent_temperature: '°C';
  precipitation: 'mm';
  wind_speed_10m: 'km/h';
};

export type CurrentForecast = {
  time: string;
  interval: number;
  weather_code: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  wind_speed_10m: number;
};

export type DailyUnits = {
  time: 'iso8601';
  weather_code: 'wmo code';
  temperature_2m_max: '°C';
  temperature_2m_min: '°C';
};

export type DailyForecast = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
};

export type SingleDayForecast = {
  time: string;
  interval: number;
  weather_code: number;
  temperature_2m: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
};

export type SearchResult = {
  admin1: string;
  admin1_id: number;
  admin2: string;
  admin2_id: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation: number;
  feature_code: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  postcodes: string[];
  timezone: string;
};
