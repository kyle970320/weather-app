import { useState, useMemo, useRef, useEffect } from "react";
import koreaDistricts from "@/shared/config/koreaDistricts.json";
import { composingIncludes } from "@/widgets/searchLocation/util/search";

export function useSearchLocation() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!searchValue.trim()) return [];

    return (koreaDistricts as string[])
      .filter((district) => composingIncludes(searchValue, district))
      .sort((a, b) => a.localeCompare(b, "ko"))
      .slice(0, 5);
  }, [searchValue]);

  const onChange = (value: string) => {
    setSearchValue(value);
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  const onSearchFocus = () => {
    setIsFocused(true);
  };
  const onSearchBlur = () => {
    setIsFocused(false);
  };

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
    onSearchFocus,
    onSearchBlur,
    searchValue,
    onChange,
    onSearch,
    containerRef,
    suggestions,
    handleSuggestionClick,
  };
}
