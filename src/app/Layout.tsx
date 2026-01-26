import { Outlet } from "react-router-dom";
import SearchLocation from "@/widgets/searchLocation";
import { useSearchLocation } from "@/widgets/searchLocation/model/useSearchLocation";
import type { RefObject } from "react";

export default function Layout() {
  const {
    isFocused,
    onSearchFocus,
    searchValue,
    onChange,
    containerRef,
    suggestions,
    handleSuggestionClick,
  } = useSearchLocation();
  return (
    <div className="p-14 min-h-screen mx-auto bg-linear-to-br from-main/70 via-main/90 to-main">
      <div className="max-w-[1200px] mx-auto">
        <SearchLocation
          placeholder="Search"
          className="bg-white/60 backdrop-blur-2xl shadow-lg"
          isFocused={isFocused}
          onSearchFocus={onSearchFocus}
          searchValue={searchValue}
          onChange={onChange}
          containerRef={containerRef as RefObject<HTMLDivElement>}
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
        <Outlet />
      </div>
    </div>
  );
}
