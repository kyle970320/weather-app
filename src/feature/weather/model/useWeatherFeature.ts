import { getCurrentBaseDateTime, useWeatherQuery } from "@/entity/weather";
import { convertToGridCoordinates } from "@/shared/utils/coordinateUtils";
import { useMemo } from "react";

interface Props {
  latitude: number | null;
  longitude: number | null;
}

export const useWeatherFeature = ({ latitude, longitude }: Props) => {
  // 좌표를 기상청 격자 좌표로 변환
  const gridCoordinates = useMemo(() => {
    if (latitude === null || longitude === null) {
      return null;
    }
    return convertToGridCoordinates(longitude, latitude);
  }, [latitude, longitude]);

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
    isLoading,
    error,
  };
};
