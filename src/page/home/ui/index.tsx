import Card from "@/shared/ui/Card";
import { useGetHome } from "../model";
import { WeatherSkeleton } from "@/widgets/weather/ui";
import { useOutletContext } from "react-router-dom";
import type { Favorite } from "@/entity/favorite";
import WeatherCard from "@/widgets/weather/ui/WeatherCard";

export default function HomePage() {
  const { isFavoriteItem, removeFavoriteItem, addFavoriteItem } =
    useOutletContext<{
      isFavoriteItem: (addressName: string) => boolean;
      removeFavoriteItem: (addressName: string) => void;
      addFavoriteItem: (favorite: Favorite) => void;
    }>();
  const {
    data: weatherData,
    location,
    isWeatherLoading,
    weatherError,
    extraData,
  } = useGetHome();

  const isFavorite = isFavoriteItem(location?.addressName ?? "");

  const handleAddFavorite = () => {
    if (isFavorite) {
      removeFavoriteItem(location?.addressName ?? "");
      return;
    }
    addFavoriteItem({
      id: crypto.randomUUID(),
      addressName: location?.addressName ?? "",
      nickname: location?.addressName ?? "",
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
    });
  };

  if (isWeatherLoading) {
    return <WeatherSkeleton />;
  }

  if (!weatherData) {
    return <WeatherSkeleton />;
  }

  if (weatherError) {
    return (
      <div className="mt-8">
        <Card>
          <div className="text-center py-8 text-red-300">
            오류가 발생했습니다: {weatherError.message}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <WeatherCard
      location={{
        latitude: location?.latitude ?? 0,
        longitude: location?.longitude ?? 0,
        addressName: location?.addressName ?? "",
      }}
      weatherData={weatherData}
      extraData={extraData}
      isFavorite={isFavorite}
      handleAddFavorite={handleAddFavorite}
    />
  );
}
