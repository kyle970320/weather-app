import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api";
import type { WeatherParams } from "../types";

export const useWeatherQuery = (params: WeatherParams) => {
  return useQuery({
    queryKey: [
      "weather",
      "vilageFcst",
      params.base_date,
      params.base_time,
      params.nx,
      params.ny,
    ],
    queryFn: () => getWeather(params),
    enabled:
      Boolean(params.base_date) &&
      Boolean(params.base_time) &&
      params.nx > 0 &&
      params.ny > 0,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};
