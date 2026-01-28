import { getCurrentBaseDateTime, useGetWeatherQuery } from "@/entity/weather";
import { convertGeo } from "@/shared/utils/convertGeo";
import { useMemo } from "react";

interface Props {
  latitude: number | null;
  longitude: number | null;
  enabled: boolean;
  hasPlaceholderData?: boolean;
}

export const useSearchWeather = ({
  latitude,
  longitude,
  enabled = true,
  hasPlaceholderData = true,
}: Props) => {
  // 좌표를 기상청 격자 좌표로 변환
  const gridCoordinates = useMemo(() => {
    if (latitude === null || longitude === null) {
      return null;
    }
    return convertGeo(longitude, latitude);
  }, [latitude, longitude]);

  // 날짜/시간 계산
  const { base_date, base_time } = getCurrentBaseDateTime();

  // 날씨 쿼리
  const { data, isLoading, error, isFetching } = useGetWeatherQuery({
    base_date,
    base_time,
    nx: gridCoordinates?.nx ?? 0,
    ny: gridCoordinates?.ny ?? 0,
    enabled,
    hasPlaceholderData,
  });

  return {
    data,
    isLoading,
    error,
    isFetching,
  };
};
