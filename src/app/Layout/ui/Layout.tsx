import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchLocation from "@/widgets/searchLocation";
import { useLayout } from "@/app/Layout/model/useLayout";
import { useSearchModel } from "@/widgets/searchLocation/model/useSearchLocation";
import { useEffect } from "react";

export default function Layout() {
  const { search, onChangeSearch, onSearchLoctaion } = useLayout();

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const {
    containerRef,
    isFocused,
    onSearchFocus,
    suggestions,
    onSuggestionClick: originalonSuggestionClick,
  } = useSearchModel({ search, onChangeSearch });

  //즉시 캐시에 담아서 router시 부드럽게 보여줌
  const handleSuggestionClick = (suggestion: string) => {
    originalonSuggestionClick(suggestion);
    onSearchLoctaion(suggestion);
    navigate(`/${encodeURIComponent(suggestion)}`);
  };

  const handleSearchFocus = () => {
    onChangeSearch("");
    onSearchFocus();
  };

  const handleSearchClick = () => {
    handleSuggestionClick(search);
  };

  useEffect(() => {
    const currentAddress = decodeURIComponent(pathname.split("/").pop() ?? "");
    if (search !== currentAddress) {
      onChangeSearch(currentAddress);
    }
  }, [pathname]);

  return (
    <div className="p-14 min-h-screen mx-auto bg-linear-to-br from-main/70 via-main/90 to-main">
      <div className="max-w-[1200px] mx-auto">
        <SearchLocation
          placeholder="Search"
          className="bg-sub-bg backdrop-blur-2xl shadow-lg"
          containerRef={containerRef}
          isFocused={isFocused}
          onSearchFocus={handleSearchFocus}
          searchValue={search}
          onChange={onChangeSearch}
          suggestions={suggestions}
          onSearchClick={handleSearchClick}
          onSuggestionClick={handleSuggestionClick}
        />
        <Outlet />
      </div>
    </div>
  );
}
