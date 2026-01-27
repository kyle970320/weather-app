import { getGeo } from "@/entity/location";
import { useSearchWeather } from "@/feature/weather";
import { getCurrentLocation } from "@/shared/utils/currentLocation";
import { useCallback, useEffect, useState } from "react";
import { Snackbar } from "@minus-ui/core";
export default function useGetHome() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    addressName?: string;
  } | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setDefaultLocation = useCallback(() => {
    setLocation({
      latitude: 37.5326,
      longitude: 126.99,
      addressName: "서울특별시 용산구",
    });
    Snackbar.show({
      type: "error",
      message: "위치 정보를 가져올 수 없습니다. \n 기본 위치로 이동합니다.",
    });
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await getCurrentLocation();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const address = await getGeo({
          latitude,
          longitude,
        });
        setLocation({
          latitude,
          longitude,
          addressName: address?.[0]?.addressName,
        });
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === "GEOLOCATION_PERMISSION_DENIED") {
            setDefaultLocation();
            return;
          } else if (err.message === "GEOLOCATION_TIMEOUT") {
            setDefaultLocation();
            return;
          } else if (err.message === "GEOLOCATION_UNKNOWN_ERROR") {
            setDefaultLocation();
            return;
          }
          setError(err as Error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [setDefaultLocation]);

  const { data: weatherData } = useSearchWeather({
    latitude: location?.latitude ?? null,
    longitude: location?.longitude ?? null,
    enabled: !!location,
  });

  return {
    location,
    data: weatherData,
    isWeatherLoading: isLoading,
    weatherError: error,
    extraData: weatherData?.extraData,
  };
}
