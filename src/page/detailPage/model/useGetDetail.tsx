import { useSearchAddress } from "@/feature/searchLocation";
import { useSearchWeather } from "@/feature/weather";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useGetDetail = () => {
  const { address } = useParams();

  const { addressesLocation, handleSearchLocation } = useSearchAddress({
    query: address as string,
  });

  const selectedLocation = addressesLocation?.[0] ?? null;

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useSearchWeather({
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
