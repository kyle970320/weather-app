import { useSearchAddress } from "@/feature/searchLocation";
import { useSearchWeather } from "@/feature/weather";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useGetDetail = () => {
  const { address } = useParams();

  const { addressesLocation, onSearchLoctaion } = useSearchAddress({
    query: address as string,
  });

  const selectedLocation = addressesLocation?.[0] ?? null;

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isFetching: isWeatherFetching,
    error: weatherError,
  } = useSearchWeather({
    latitude: selectedLocation?.latitude ?? null,
    longitude: selectedLocation?.longitude ?? null,
    enabled: !!selectedLocation,
    hasPlaceholderData: false,
  });

  //새로고침 or url 공유 대응
  useEffect(() => {
    onSearchLoctaion(address as string);
  }, [address]);

  return {
    weatherData,
    isWeatherLoading,
    isWeatherFetching,
    weatherError,
    selectedLocation,
    extraData: weatherData?.extraData,
  };
};
