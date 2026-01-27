import type { KakaoGeoParams } from "@/entity/location";
import { useGetGeoQuery } from "@/entity/location";

/**
 * 좌표값으로 주소 받아오기
 */
export const useSearchGeo = (params: KakaoGeoParams) => {
  const { latitude, longitude, page, size, enabled = true } = params;
  const { data, isLoading, error } = useGetGeoQuery({
    latitude,
    longitude,
    page,
    size,
    enabled,
  });
  return {
    data,
    isLoading,
    error,
  };
};
