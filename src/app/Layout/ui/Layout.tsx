import { Outlet } from "react-router-dom";
import SearchLocation from "@/widgets/searchLocation";
import { useLayout } from "@/app/Layout/model/useLayout";
import { useSearchModel } from "@/widgets/searchLocation/model/useSearchLocation";

export default function Layout() {
  const { search, onChangeSearch } = useLayout();
  const { isFocused, onSearchFocus, suggestions, handleSuggestionClick } =
    useSearchModel({ search, onChangeSearch });
  return (
    <div className="p-14 min-h-screen mx-auto bg-linear-to-br from-main/70 via-main/90 to-main">
      <div className="max-w-[1200px] mx-auto">
        <SearchLocation
          placeholder="Search"
          className="bg-white/60 backdrop-blur-2xl shadow-lg"
          isFocused={isFocused}
          onSearchFocus={onSearchFocus}
          searchValue={search}
          onChange={onChangeSearch}
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
        <Outlet />
      </div>
    </div>
  );
}
