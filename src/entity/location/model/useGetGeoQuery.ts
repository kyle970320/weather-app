import { useQuery } from "@tanstack/react-query";
import { getGeo } from "../api";
import type { KakaoGeoParams } from "../types";

export const useGetGeoQuery = (params: KakaoGeoParams) => {
  const { latitude, longitude, page, size, enabled = true } = params;
  return useQuery({
    queryKey: ["geocode", "search", latitude, longitude, page, size],
    queryFn: () => getGeo(params),
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
