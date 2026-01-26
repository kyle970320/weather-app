import { cn } from "@/shared/lib/variants";

interface SearchSuggestionsProps {
  value: string;
  isFocused: boolean;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  className?: string;
}

export function SearchSuggestions({
  value,
  isFocused,
  suggestions,
  onSuggestionClick,
  className,
}: SearchSuggestionsProps) {
  if (!isFocused || value.trim() === "") {
    return null;
  }
  if (suggestions.length > 0) {
    return (
      <div
        className={cn(
          "absolute top-full left-0 right-0 mt-1 bg-background rounded-md shadow-lg z-50 max-h-60 overflow-y-auto cursor-pointer",
          className,
        )}
      >
        {suggestions.map((suggestion, index) => (
          <button
            key={`${suggestion}-${index}`}
            type="button"
            onClick={() => onSuggestionClick(suggestion)}
            className="w-full text-left px-4 py-2 hover:bg-sub-bg transition-colors text-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute top-full left-0 right-0 mt-1 bg-background rounded-md shadow-lg z-50 max-h-60 overflow-y-auto cursor-pointer",
        className,
      )}
    >
      <div className="text-sm text-gray-500 px-4 py-2">
        검색 결과가 없습니다.
      </div>
    </div>
  );
}
