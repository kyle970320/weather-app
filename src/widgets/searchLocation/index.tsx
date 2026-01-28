import { type KeyboardEvent, type ChangeEvent } from "react";
import { cn } from "@/shared/lib/variants";
import { SearchInput, SearchSuggestions } from "./ui";

interface SearchLocationProps {
  placeholder?: string;
  className?: string;
  searchValue: string;
  suggestions: string[];
  isFocused: boolean;
  activeIndex: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onChange: (value: string) => void;
  onSearchFocus: () => void;
  onSearchClick: () => void;
  onSearchInputClick: () => void;
  onActiveIndex: (index: number) => void;
  onSuggestionClick: (suggestion: string, index: number) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchLocation({
  placeholder = "검색어를 입력하세요",
  className,
  searchValue,
  suggestions,
  isFocused,
  activeIndex,
  containerRef,
  onChange,
  onSearchFocus,
  onSearchInputClick,
  onSuggestionClick,
  onSearchClick,
  onActiveIndex,
  onKeyDown,
}: SearchLocationProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    } else if (e.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative z-11 w-full flex flex-col rounded-md", className)}
    >
      <SearchInput
        onSearchInputClick={onSearchInputClick}
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={onSearchFocus}
        onSearchClick={onSearchClick}
      />

      <SearchSuggestions
        onActiveIndex={onActiveIndex}
        activeIndex={activeIndex}
        value={searchValue.trim()}
        isFocused={isFocused}
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick}
        className={className}
      />
    </div>
  );
}
