import { useSearchLocationFeature } from "@/feature/searchLocation";
import { useWeatherFeature } from "@/feature/weather/model";
import { useState } from "react";

export const useLayout = () => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (value: string) => {
    setSearch(value);
  };
  const { apiResults, handleSearchLocation } = useSearchLocationFeature({
    query: search,
    localSearchLimit: 5,
  });

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
    selectedLocation,
  } = useWeatherFeature({ apiResults });

  return {
    search,
    onChangeSearch,
    apiResults,
    handleSearchLocation,
    weatherData,
    isWeatherLoading,
    weatherError,
    selectedLocation,
  };
};
