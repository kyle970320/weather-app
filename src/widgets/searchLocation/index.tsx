import { type KeyboardEvent, type ChangeEvent } from "react";
import { cn } from "@/shared/lib/variants";
import { useSearchLocation } from "./model/useSearchLocation";
import { SearchInput, SearchSuggestions } from "./ui";

interface SearchLocationProps {
  placeholder?: string;
  className?: string;
}

export default function SearchLocation({
  placeholder = "검색어를 입력하세요",
  className,
}: SearchLocationProps) {
  const {
    isFocused,
    onSearchFocus,
    // onSearchBlur,
    searchValue,
    onChange,
    // onSearch,
    containerRef,
    suggestions,
    handleSuggestionClick,
  } = useSearchLocation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange(searchValue);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full flex flex-col rounded-md", className)}
    >
      <SearchInput
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={onSearchFocus}
        onSearchClick={() => {}}
      />

      <SearchSuggestions
        value={searchValue.trim()}
        isFocused={isFocused}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
        className={className}
      />
    </div>
  );
}
