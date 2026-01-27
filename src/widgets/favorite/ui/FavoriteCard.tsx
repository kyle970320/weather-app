import type { Favorite } from "@/entity/favorite";
import { useModifyFavoriteCard } from "../model/useModifyFavoriteCard";
import { Edit2, Trash2 } from "lucide-react";
import { useSearchWeather } from "@/feature/weather";
import { useNavigate } from "react-router-dom";
import { Input } from "@/shared/ui/Input";

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
  const { isOpenEditMode, editName, onChangeName, onClickEdit, onClickCancel } =
    useModifyFavoriteCard({ favorite });

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
  return (
    <div
      key={favorite.id}
      className="bg-white/20 backdrop-blur-md rounded-2xl p-5 text-white shadow-xl hover:shadow-2xl transition cursor-pointer"
      onClick={() => {
        navigate(`/${encodeURIComponent(favorite.addressName)}`);
      }}
    >
      <div className="flex h-10 items-center justify-between mb-3">
        {isOpenEditMode ? (
          <Input
            className="bg-white/20 rounded px-2 py-1 text-lg font-semibold outline-none w-full"
            type="text"
            value={editName}
            onChange={onChangeName}
            onClick={(e) => e.stopPropagation()}
            onBlur={() =>
              handleUpdateFavoriteItem({ ...favorite, nickname: editName })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdateFavoriteItem({ ...favorite, nickname: editName });
              }
              if (e.key === "Escape") {
                handleRemoveFavoriteItem(favorite.addressName);
              }
            }}
            autoFocus
          />
        ) : (
          <h3 className="text-lg font-semibold">{favorite.nickname}</h3>
        )}
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClickEdit();
            }}
            className="p-1 hover:bg-white/30 rounded transition"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFavoriteItem(favorite.addressName);
            }}
            className="p-1 hover:bg-white/30 rounded transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
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
  );
}
