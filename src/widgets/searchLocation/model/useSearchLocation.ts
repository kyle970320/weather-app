import { useEffect, useMemo, useRef, useState } from "react";
import koreaDistricts from "@/shared/config/koreaDistricts.json";
import { composingIncludes } from "@/widgets/searchLocation/utils/search";

interface Props {
  search: string;
  onChangeSearch: (value: string) => void;
}
export const useSearchModel = ({ search, onChangeSearch }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 700);
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [search]);

  const onChange = (value: string) => {
    onChangeSearch(value);
  };

  const onSearch = (value: string) => {
    onChangeSearch(value);
    setDebouncedSearch(value);
  };

  const onSearchFocus = () => {
    setIsFocused(true);
  };
  const onSearchBlur = () => {
    setIsFocused(false);
  };
  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };

  const suggestions = useMemo(() => {
    if (!debouncedSearch.trim()) return [];

    return (koreaDistricts as string[])
      .filter((district) => composingIncludes(debouncedSearch, district))
      .sort((a, b) => a.localeCompare(b, "ko"))
      .slice(0, 5);
  }, [debouncedSearch]);

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

  return {
    search,
    debouncedSearch,
    isFocused,
    suggestions,
    onSearchFocus,
    onSearchBlur,
    handleSuggestionClick,
  };
};
