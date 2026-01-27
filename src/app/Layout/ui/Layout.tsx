import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchLocation from "@/widgets/searchLocation";
import { useLayout } from "@/app/Layout/model/useLayout";
import { useSearchBarLocation } from "@/widgets/searchLocation/model/useSearchBarLocation";

export default function Layout() {
  const { onSearchLoctaion } = useLayout();

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const initialSearch = decodeURIComponent(pathname.split("/").pop() ?? "");
  const {
    search,
    isFocused,
    activeIndex,
    suggestions,
    containerRef,
    onSearchFocus,
    onSearchInputClick,
    handleChangeSearch,
    onSubmit,
    handleActiveIndex,
    onSuggestionClick,
    onKeyDown,
  } = useSearchBarLocation({
    initialSearch,
    onSubmitSearch: (value: string) => {
      onSearchLoctaion(value);
      navigate(`/${encodeURIComponent(value)}`, {
        replace: initialSearch ? true : false,
      });
    },
  });

  const handleSearchFocus = () => {
    onSearchFocus();
  };

  const handleSearchClick = () => {
    onSubmit(search);
  };

  return (
    <div className="p-14 min-h-screen mx-auto bg-linear-to-br from-main/70 via-main/90 to-main">
      <div className="max-w-[1200px] mx-auto">
        <SearchLocation
          placeholder="주소를 검색하세요(시/구/동/면)"
          className="bg-sub-bg backdrop-blur-2xl shadow-lg"
          searchValue={search}
          suggestions={suggestions}
          isFocused={isFocused}
          activeIndex={activeIndex}
          containerRef={containerRef}
          onChange={handleChangeSearch}
          onSearchFocus={handleSearchFocus}
          onSearchClick={handleSearchClick}
          onSearchInputClick={onSearchInputClick}
          onSuggestionClick={onSuggestionClick}
          onActiveIndex={handleActiveIndex}
          onKeyDown={onKeyDown}
        />
        <Outlet />
      </div>
    </div>
  );
}
