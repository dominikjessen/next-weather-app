import type { DailyForecast, SingleDayForecast } from '@/types/weather';

type ForecastArrayWithGenericKeys = {
  [key: string]: string[] | number[];
} & DailyForecast;

/* This function turns the response data from openmeteo's API into an array of data to be able to map through */
export const arrayTransformDailyForecastData = (data: ForecastArrayWithGenericKeys): Array<SingleDayForecast> => {
  if (!data || Object.keys(data).length === 0) {
    return [];
  }

  const keys = Object.keys(data);

  const transformedArray: Array<{
    [key: string]: string | number;
  }> = [];

  for (let i = 0; i < data[keys[0]].length; i++) {
    const obj: { [key: string]: string | number } = {};
    keys.forEach((key) => {
      obj[key] = data[key][i] || 0;
    });
    transformedArray.push(obj);
  }

  return transformedArray as SingleDayForecast[];
};
