import { useSearchAddress } from "@/feature/searchLocation";
import { useSearchWeather } from "@/feature/weather";
import { useState } from "react";

export const useLayout = () => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (value: string) => {
    setSearch(value);
  };
  const { addressesLocation, handleSearchLocation } = useSearchAddress({
    query: search,
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

  return {
    search,
    onChangeSearch,
    addressesLocation,
    handleSearchLocation,
    weatherData,
    isWeatherLoading,
    weatherError,
    selectedLocation,
  };
};
