import { useState, useRef, useEffect, useMemo } from "react";
import { useSearchLocationFeature } from "@/feature/searchLocation";
import koreaDistricts from "@/shared/config/koreaDistricts.json";
import { composingIncludes } from "@/widgets/searchLocation/utils/search";
import { useWeatherFeature } from "@/feature/weather/model";

export function useSearchLocation() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [addressQuery, setAddressQuery] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 700);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputValue]);

  const {
    apiResults,
    isLoading: isLocationLoading,
    error: locationError,
    handleSearchLocation,
  } = useSearchLocationFeature({
    query: addressQuery,
    localSearchLimit: 5,
  });

  // 날씨 쿼리
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
    selectedLocation,
  } = useWeatherFeature({ apiResults });

  const suggestions = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    return (koreaDistricts as string[])
      .filter((district) => composingIncludes(debouncedQuery, district))
      .sort((a, b) => a.localeCompare(b, "ko"))
      .slice(0, 5);
  }, [debouncedQuery]);

  const onChange = (value: string) => {
    setInputValue(value);
  };

  const onSearch = (value: string) => {
    setInputValue(value);
    setDebouncedQuery(value);
  };

  const onSearchFocus = () => {
    setIsFocused(true);
  };
  const onSearchBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (!addressQuery.trim()) {
      return;
    }
    handleSearchLocation();
  }, [addressQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
    setAddressQuery(suggestion);
  };

  return {
    isFocused,
    onSearchFocus,
    onSearchBlur,
    searchValue: inputValue,
    onChange,
    onSearch,
    containerRef,
    suggestions,
    handleSuggestionClick,
    isLocationLoading,
    locationError,
    selectedLocation,
    weatherData,
    isWeatherLoading,
    weatherError,
    isLoading: isLocationLoading || isWeatherLoading,
    error: locationError || weatherError,
  };
}
