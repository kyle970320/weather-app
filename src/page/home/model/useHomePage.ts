import { useSearchLocation } from "@/widgets/searchLocation/model/useSearchLocation";

/**
 * Home 페이지에서 사용하는 데이터와 로직
 */
export function useHomePage() {
  const { weatherData, selectedLocation, isLoading, error } =
    useSearchLocation();

  return {
    weatherData,
    selectedLocation,
    isLoading,
    error,
  };
}
