import { useQuery } from "@tanstack/react-query";
import { getLocationWithCoordinates } from "../api/locationApi";
import type { GetLocationWithCoordinatesParams } from "../types";

export const useSearchGeoQuery = (params: GetLocationWithCoordinatesParams) => {
  const { latitude, longitude, page, size, enabled = true } = params;
  return useQuery({
    queryKey: ["geocode", "search", latitude, longitude, page, size],
    queryFn: () => getLocationWithCoordinates(params),
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
