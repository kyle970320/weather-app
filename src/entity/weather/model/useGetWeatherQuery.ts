import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api";
import type { WeatherParams } from "../types";

export const useGetWeatherQuery = (params: WeatherParams) => {
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
    enabled: params.enabled,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};
