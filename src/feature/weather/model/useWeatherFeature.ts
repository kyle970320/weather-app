import { getCurrentBaseDateTime, useWeatherQuery } from "@/entity/weather";
import { convertToGridCoordinates } from "@/shared/utils/coordinateUtils";
import { useMemo } from "react";
import type { Location } from "@/entity/location";

interface Props {
  apiResults: Location[] | undefined;
}
export const useWeatherFeature = ({ apiResults }: Props) => {
  // 첫 번째 검색 결과에서 좌표 추출
  const selectedLocation = useMemo<Location | null>(() => {
    if (!apiResults || apiResults.length === 0) {
      return null;
    }
    return apiResults[0];
  }, [apiResults]);

  // 좌표를 기상청 격자 좌표로 변환
  const gridCoordinates = useMemo(() => {
    if (!selectedLocation) {
      return null;
    }
    return convertToGridCoordinates(
      selectedLocation.longitude,
      selectedLocation.latitude,
    );
  }, [selectedLocation]);

  // 날짜/시간 계산
  const { base_date, base_time } = getCurrentBaseDateTime();

  // 날씨 쿼리
  const { data, isLoading, error } = useWeatherQuery({
    base_date,
    base_time,
    nx: gridCoordinates?.nx ?? 0,
    ny: gridCoordinates?.ny ?? 0,
  });
  return {
    data,
    selectedLocation,
    isLoading,
    error,
  };
};
