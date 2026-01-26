import type { GetLocationWithCoordinatesParams } from "@/entity/location";
import { useSearchGeoQuery } from "@/entity/location/model";

/**
 * 좌표값으로 주소 받아오기
 */
export const useSearchGeoFeature = (
  params: GetLocationWithCoordinatesParams,
) => {
  const { latitude, longitude, page, size, enabled = true } = params;
  const { data, isLoading, error } = useSearchGeoQuery({
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
