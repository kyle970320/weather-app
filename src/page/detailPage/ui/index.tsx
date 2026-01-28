import Card from "@/shared/ui/Card";
import { useGetDetail } from "../model/useGetDetail";
import { WeatherSkeleton } from "@/widgets/weather/ui";
import { useLocation, useOutletContext } from "react-router-dom";
import type { Favorite } from "@/entity/favorite";
import WeatherCard from "@/widgets/weather/ui/WeatherCard";
export default function DetailPage() {
  const {
    weatherData,
    selectedLocation,
    weatherError,
    extraData,
    isWeatherFetching,
  } = useGetDetail();

  const { isFavoriteItem, removeFavoriteItem, addFavoriteItem } =
    useOutletContext<{
      isFavoriteItem: (addressName: string) => boolean;
      removeFavoriteItem: (addressName: string) => void;
      addFavoriteItem: (favorite: Favorite) => void;
    }>();

  const location = useLocation();
  const pathname = location.pathname;

  const isFavorite = isFavoriteItem(selectedLocation?.addressName ?? "");

  const handleAddFavorite = () => {
    if (isFavorite) {
      removeFavoriteItem(selectedLocation?.addressName ?? "");
      return;
    }
    addFavoriteItem({
      id: crypto.randomUUID(),
      addressName: selectedLocation?.addressName ?? "",
      nickname: selectedLocation?.addressName ?? "",
      latitude: selectedLocation?.latitude ?? 0,
      longitude: selectedLocation?.longitude ?? 0,
    });
  };

  if (isWeatherFetching) {
    return <WeatherSkeleton />;
  }

  if (weatherError) {
    return (
      <div className="mt-8">
        <Card>
          <div className="text-center py-8 text-red-300">
            오류가 발생했습니다. 잠시후 다시 시도해주세요.
          </div>
        </Card>
      </div>
    );
  }

  if (!weatherData || !selectedLocation) {
    return (
      <div className="mt-8">
        <Card>
          <div className="text-center py-8">
            해당 장소의 정보가 제공되지 않습니다.
          </div>
        </Card>
      </div>
    );
  }

  return (
    <WeatherCard
      key={pathname}
      location={{
        latitude: selectedLocation?.latitude ?? 0,
        longitude: selectedLocation?.longitude ?? 0,
        addressName: selectedLocation?.addressName ?? "",
      }}
      weatherData={weatherData}
      extraData={extraData}
      isFavorite={isFavorite}
      handleAddFavorite={handleAddFavorite}
    />
  );
}
