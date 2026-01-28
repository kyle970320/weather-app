import type { Favorite } from "@/entity/favorite";
import { useModifyFavoriteCard } from "../model/useModifyFavoriteCard";
import { Edit2, Trash2 } from "lucide-react";
import { useSearchWeather } from "@/feature/weather";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/shared/ui/Input";
import { useRef, useState, type KeyboardEvent } from "react";
import ConfirmModal from "@/widgets/confirmModal/ui/ConfirmModal";

interface Props {
  updateFavoriteItem: (favorite: Favorite) => void;
  removeFavoriteItem: (addressName: string) => void;
  favorite: Favorite;
}

export default function FavoriteCard({
  favorite,
  updateFavoriteItem,
  removeFavoriteItem,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/").pop();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);

  const { isOpenEditMode, editName, onChangeName, onClickEdit, onClickCancel } =
    useModifyFavoriteCard({ favorite });

  const inputRef = useRef<HTMLInputElement>(null);
  const { data: weatherData } = useSearchWeather({
    latitude: favorite.latitude,
    longitude: favorite.longitude,
    enabled: true,
  });

  const handleUpdateFavoriteItem = (favorite: Favorite) => {
    updateFavoriteItem(favorite);
    onClickCancel();
  };

  const handleRemoveFavoriteItem = (addressName: string) => {
    removeFavoriteItem(addressName);
    onClickCancel();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdateFavoriteItem({ ...favorite, nickname: editName });
    }
    if (e.key === "Escape") {
      onClickCancel();
    }
  };

  const handleToggleEditMode = () => {
    if (isOpenEditMode) {
      onClickCancel();
    } else {
      onClickEdit();
    }
  };

  const handleNavigateDetail = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onClickCancel();
    navigate(`/${encodeURIComponent(favorite.addressName)}`, {
      replace: pathname ? true : false,
    });
  };

  return (
    <>
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        title="즐겨찾기 삭제"
        description="즐겨찾기를 삭제하시겠습니까?"
        onClose={() => setIsOpenConfirmModal(false)}
        onConfirm={() => handleRemoveFavoriteItem(favorite.addressName)}
      />
      <div
        key={favorite.id}
        className="bg-white/25 rounded-2xl text-white shadow-xl hover:shadow-2xl transition cursor-pointer"
      >
        <div className="flex px-5 pt-5 h-15 items-center justify-between mb-3">
          {isOpenEditMode ? (
            <Input
              ref={inputRef}
              className="bg-white/20 rounded px-2 py-1 text-lg font-semibold outline-none w-full"
              type="text"
              autoFocus
              value={editName}
              onChange={onChangeName}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              onBlur={() =>
                updateFavoriteItem({ ...favorite, nickname: editName })
              }
            />
          ) : (
            <h3 className="px-2 text-lg font-semibold">{favorite.nickname}</h3>
          )}

          <div className="flex gap-1">
            <button
              onClick={handleToggleEditMode}
              className="p-1 hover:bg-white/30 rounded transition"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenConfirmModal(true);
              }}
              className="p-1 hover:bg-white/30 rounded transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div onClick={handleNavigateDetail} className="px-5 pb-5">
          <div className="text-sm opacity-80 mb-3">{favorite.addressName}</div>
          <div className="flex flex-col items-end justify-end">
            <div className="text-4xl font-light">
              {weatherData?.currentTemperature}°
            </div>
            <div className="text-right">
              <div className="text-base">
                {weatherData?.maxTemperature}° / {weatherData?.minTemperature}°
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
