import type { Favorite } from "@/entity/favorite";
import { useModifyFavoriteCard } from "../model/useModifyFavoriteCard";
import { Edit2, Save, Trash2 } from "lucide-react";
import { useSearchWeather } from "@/feature/weather";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/shared/ui/Input";
import { useRef, useState, type KeyboardEvent } from "react";
import { ConfirmModal } from "@/widgets/confirmModal";
import Card from "@/shared/ui/Card";
import { CharacterCanvas } from "@/widgets/character";
import FavoriteSkeleton from "./FavoriteSkeleton";
import { Snackbar } from "@minus-ui/core";

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
  const pathname = decodeURIComponent(location.pathname).split("/").pop();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);

  const { isOpenEditMode, editName, onChangeName, onClickEdit, onClickCancel } =
    useModifyFavoriteCard({ favorite });

  const inputRef = useRef<HTMLInputElement>(null);
  const { data: weatherData, isFetching } = useSearchWeather({
    latitude: favorite.latitude,
    longitude: favorite.longitude,
    enabled: true,
    hasPlaceholderData: false,
  });

  const handleUpdateFavoriteItem = (favorite: Favorite) => {
    if (favorite.nickname.length < 1) {
      Snackbar.show({
        message: "닉네임을 입력해주세요",
        type: "error",
      });
      return;
    }
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

  const handleNavigateDetail = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onClickCancel();
    navigate(`/${encodeURIComponent(favorite.addressName)}`, {
      replace: pathname ? true : false,
    });
  };

  if (isFetching) {
    return <FavoriteSkeleton />;
  }

  return (
    <>
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        title="즐겨찾기 삭제"
        description="즐겨찾기를 삭제하시겠습니까?"
        onClose={() => setIsOpenConfirmModal(false)}
        onConfirm={() => handleRemoveFavoriteItem(favorite.addressName)}
      />
      <div onClick={handleNavigateDetail}>
        <Card
          key={favorite.id}
          className={
            "p-4 bg-white/25 rounded-2xl text-white shadow-xl hover:shadow-2xl transition cursor-pointer"
          }
        >
          <div className="flex h-15 items-center justify-between mb-3">
            {isOpenEditMode ? (
              <Input
                ref={inputRef}
                className="bg-white/20 rounded px-2 py-1 text-lg font-semibold outline-none w-full"
                type="text"
                autoFocus
                maxLength={25}
                value={editName}
                onChange={onChangeName}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                onBlur={() => {
                  handleUpdateFavoriteItem({ ...favorite, nickname: editName });
                }}
              />
            ) : (
              <h3 className="text-lg font-semibold ellipsis-2-line">
                {favorite.nickname}
              </h3>
            )}

            <div className="flex gap-1">
              {isOpenEditMode ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1 sm:hover:bg-white/30 rounded transition"
                >
                  <Save className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickEdit();
                  }}
                  className="p-1 sm:hover:bg-white/30 rounded transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
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
          <div>
            <div className="text-sm opacity-80 mb-3">
              {favorite.addressName}
            </div>
            <div className="flex items-center justify-between gap-2">
              <CharacterCanvas
                ptyType={weatherData?.extraData?.ptyType}
                currentTemperature={weatherData?.currentTemperature}
                width={100}
                height={100}
              />
              <div className="flex flex-col items-end justify-end">
                <div className="text-3xl sm:text-4xl font-light">
                  {weatherData?.currentTemperature}°
                </div>
                <div className="text-right">
                  <div className="text-sm sm:text-base">
                    {weatherData?.maxTemperature}° /{" "}
                    {weatherData?.minTemperature}°
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
