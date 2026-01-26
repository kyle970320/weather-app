import { useSearchLocationFeature } from "@/feature/searchLocation";
import { useWeatherFeature } from "@/feature/weather/model";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useGetDetail = () => {
  const { address } = useParams();

  const { apiResults, handleSearchLocation } = useSearchLocationFeature({
    query: address as string,
    localSearchLimit: 5,
  });

  const selectedLocation = apiResults?.[0] ?? null;

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useWeatherFeature({
    latitude: selectedLocation?.latitude ?? null,
    longitude: selectedLocation?.longitude ?? null,
  });

  //새로고침 or url 공유 대응
  useEffect(() => {
    handleSearchLocation(address as string);
  }, [address]);

  return {
    weatherData,
    isWeatherLoading,
    weatherError,
    selectedLocation,
  };
};
