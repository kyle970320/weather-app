import { type KeyboardEvent, type ChangeEvent } from "react";
import { cn } from "@/shared/lib/variants";
import { useSearchLocation } from "./model/useSearchLocation";
import { SearchInput, SearchSuggestions } from "./ui";

interface SearchLocationProps {
  placeholder?: string;
  className?: string;
  value: string;
  defaultValue?: string;
  onSearch: (value: string) => void;
  onChange: (value: string) => void;
}

export default function SearchLocation({
  placeholder = "검색어를 입력하세요",
  onSearch,
  className,
  value,
  onChange,
  ...props
}: SearchLocationProps) {
  const {
    isFocused,
    setIsFocused,
    containerRef,
    suggestions,
    handleSuggestionClick,
  } = useSearchLocation({ value, onSearch, onChange });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  const handleSearchClick = () => {
    onSearch(value);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full flex flex-col", className)}
    >
      <SearchInput
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onSearchClick={handleSearchClick}
        {...props}
      />

      {isFocused && value.trim() && (
        <SearchSuggestions
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
          className={className}
        />
      )}
    </div>
  );
}
