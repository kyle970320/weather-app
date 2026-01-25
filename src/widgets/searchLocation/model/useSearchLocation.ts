import { useState, useMemo, useRef, useEffect } from "react";
import koreaDistricts from "@/shared/config/koreaDistricts.json";
import { composingIncludes } from "@/widgets/searchLocation/util/search";

interface UseSearchLocationProps {
  value: string;
  onSearch: (value: string) => void;
  onChange: (value: string) => void;
}

export function useSearchLocation({
  value,
  onSearch,
  onChange,
}: UseSearchLocationProps) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!value.trim()) return [];

    return (koreaDistricts as string[])
      .filter((district) => composingIncludes(value, district))
      .sort((a, b) => a.localeCompare(b, "ko"))
      .slice(0, 5);
  }, [value]);

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
  };

  return {
    isFocused,
    setIsFocused,
    containerRef,
    suggestions,
    handleSuggestionClick,
  };
}
