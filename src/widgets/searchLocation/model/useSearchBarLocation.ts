import { useEffect, useMemo, useRef, useState } from "react";
import koreaDistricts from "@/shared/config/koreaDistricts.json";
import { composingIncludes } from "@/widgets/searchLocation/utils/search";

interface Props {
  initialSearch?: string;
  onSubmitSearch?: (value: string) => void;
}

export const useSearchBarLocation = ({
  initialSearch = "",
  onSubmitSearch,
}: Props) => {
  const [search, setSearch] = useState(initialSearch);
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = useMemo(() => {
    if (!debouncedSearch.trim()) return [];

    return (koreaDistricts as string[])
      .filter((district) => composingIncludes(debouncedSearch, district))
      .sort((a, b) => a.localeCompare(b, "ko"))
      .slice(0, 5);
  }, [debouncedSearch]);

  // 핸들러 함수들
  const handleActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  const handleChangeSearch = (value: string) => {
    setActiveIndex(-1);
    setSearch(value);
    setIsFocused(true);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const onSubmit = (value: string) => {
    setSearch(value);
    setActiveIndex(-1);
    setIsFocused(false);
    onSubmitSearch?.(value);
  };

  const onSearchFocus = () => {
    setIsFocused(true);
  };

  const onSearchInputClick = () => {
    setIsFocused(true);
  };

  const onSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
    setActiveIndex(-1);
    setIsFocused(false);
    onSubmitSearch?.(suggestion);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isFocused) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        const value = activeIndex >= 0 ? suggestions[activeIndex] : search;
        onSubmit(value);
        return;
      } else {
        const value = suggestions.length > 0 ? suggestions[0] : search;
        onSubmit(value);
      }
    }

    if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (!search.trim()) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      setDebouncedSearch("");
      setActiveIndex(-1);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 100);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [search]);

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
    isFocused,
    activeIndex,
    suggestions,
    containerRef,
    onSearchFocus,
    onSearchInputClick,
    handleChangeSearch,
    onSubmit,
    handleActiveIndex,
    onSuggestionClick,
    onKeyDown,
  };
};
