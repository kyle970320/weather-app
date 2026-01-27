import { type KeyboardEvent, type ChangeEvent } from "react";
import { Input } from "@/shared/ui/Input";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  onSearchInputClick: () => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onSearchClick: () => void;
}

export function SearchInput({
  placeholder = "검색어를 입력하세요",
  onSearchInputClick,
  value,
  onChange,
  onKeyDown,
  onFocus,
  onSearchClick,
}: SearchInputProps) {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onClick={onSearchInputClick}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      rightIcon={
        <Search onClick={onSearchClick} className="h-4 w-4 cursor-pointer" />
      }
    />
  );
}
