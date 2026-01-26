import { type KeyboardEvent, type ChangeEvent, useRef } from "react";
import { cn } from "@/shared/lib/variants";
import { SearchInput, SearchSuggestions } from "./ui";

interface SearchLocationProps {
  placeholder?: string;
  className?: string;
  isFocused: boolean;
  onSearchFocus: () => void;
  searchValue: string;
  onChange: (value: string) => void;
  suggestions: string[];
  onSearchClick: () => void;
  handleSuggestionClick: (suggestion: string) => void;
}

export default function SearchLocation({
  placeholder = "검색어를 입력하세요",
  className,
  isFocused,
  onSearchFocus,
  searchValue,
  onChange,
  suggestions,
  handleSuggestionClick,
  onSearchClick,
}: SearchLocationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
      className={cn("relative z-1 w-full flex flex-col rounded-md", className)}
    >
      <SearchInput
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={onSearchFocus}
        onSearchClick={onSearchClick}
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
