import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchLocation from "@/widgets/searchLocation";
import { useLayout } from "@/app/Layout/model/useLayout";
import { useSearchBarLocation } from "@/widgets/searchLocation/model/useSearchBarLocation";
import { useFavorite } from "@/feature/favorite";
import FavoriteCard from "@/widgets/favorite/ui/FavoriteCard";
import Card from "@/shared/ui/Card";
import { Plus } from "lucide-react";

export default function Layout() {
  const { onSearchLoctaion } = useLayout();
  const {
    favorites,
    isFavoriteItem,
    removeFavoriteItem,
    addFavoriteItem,
    updateFavoriteItem,
  } = useFavorite();
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
    <div className="p-5 sm:p-14 min-h-screen mx-auto bg-linear-to-br from-main/70 via-main/90 to-main">
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
        <Outlet
          context={{ isFavoriteItem, removeFavoriteItem, addFavoriteItem }}
        />
        <div className="mt-4 text-sm text-background">
          {favorites.length} / 6
        </div>
        <div className="mt-4">
          {favorites.length < 1 && (
            <Card>
              <div className="flex flex-col items-center justify-center text-center text-sm text-background">
                <Plus />
                <div>
                  <div>즐겨찾기가 없습니다.</div>
                  <div>최대 6개 까지 추가할 수 있습니다.</div>
                </div>
              </div>
            </Card>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {favorites.map((el) => {
            return (
              <FavoriteCard
                key={el.id}
                favorite={el}
                updateFavoriteItem={updateFavoriteItem}
                removeFavoriteItem={removeFavoriteItem}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
