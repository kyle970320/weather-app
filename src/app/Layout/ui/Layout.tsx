import { Outlet, useNavigate } from "react-router-dom";
import SearchLocation from "@/widgets/searchLocation";
import { useLayout } from "@/app/Layout/model/useLayout";
import { useSearchModel } from "@/widgets/searchLocation/model/useSearchLocation";

export default function Layout() {
  const { search, onChangeSearch, handleSearchLocation } = useLayout();

  const navigate = useNavigate();
  const {
    isFocused,
    onSearchFocus,
    suggestions,
    handleSuggestionClick: originalHandleSuggestionClick,
  } = useSearchModel({ search, onChangeSearch });

  //즉시 캐시에 담아서 router시 부드럽게 보여줌
  const handleSuggestionClick = (suggestion: string) => {
    originalHandleSuggestionClick(suggestion);
    handleSearchLocation(suggestion);
    navigate(`/${encodeURIComponent(suggestion)}`);
  };

  const onCustomSearchFocus = () => {
    onChangeSearch("");
    onSearchFocus();
  };

  const onSearchClick = () => {
    handleSuggestionClick(search);
  };

  return (
    <div className="p-14 min-h-screen mx-auto bg-linear-to-br from-main/70 via-main/90 to-main">
      <div className="max-w-[1200px] mx-auto">
        <SearchLocation
          placeholder="Search"
          className="bg-sub-bg backdrop-blur-2xl shadow-lg"
          isFocused={isFocused}
          onSearchFocus={onCustomSearchFocus}
          searchValue={search}
          onChange={onChangeSearch}
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
          onSearchClick={onSearchClick}
        />
        <Outlet />
      </div>
    </div>
  );
}
