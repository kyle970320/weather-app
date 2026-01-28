import type { WeatherData } from "@/entity/weather";
import Card from "@/shared/ui/Card";
import { Star, Wind, Droplets, CloudRain } from "lucide-react";
import { PTY_TYPE } from "../config/ptyType";
import { CharacterCanvas } from "@/widgets/character";

interface Props {
  location: {
    latitude: number;
    longitude: number;
    addressName?: string;
  };
  weatherData: WeatherData;
  isFavorite: boolean;
  handleAddFavorite: () => void;
  extraData?: Record<string, string>;
}
export default function WeatherCard({
  location,
  weatherData,
  extraData,
  isFavorite,
  handleAddFavorite,
}: Props) {
  return (
    <div className="mt-8 space-y-6">
      <Card className="relative flex flex-col items-center gap-6">
        <div className="absolute top-5 right-5">
          <Star
            className="w-5 h-5 cursor-pointer"
            onClick={handleAddFavorite}
            color={isFavorite ? "yellow" : "white"}
            fill={isFavorite ? "yellow" : "none"}
          />
        </div>
        <div className="flex flex-col items-center">
          <CharacterCanvas
            ptyType={extraData?.ptyType}
            currentTemperature={weatherData?.currentTemperature}
          />
          <h2 className="text-xl sm:text-2xl font-bold">
            {location?.addressName}
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl sm:text-5xl font-bold text-center">
                {weatherData.currentTemperature}°
              </div>
              <div className="text-base sm:text-lg opacity-80">
                최고 {weatherData.maxTemperature}° / 최저{" "}
                {weatherData.minTemperature}°
              </div>
            </div>
          </div>
        </div>
        <Card className="bg-white/25 p-0 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div className="rounded-xl p-3 text-center">
              <Wind className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm opacity-80">바람</div>
              <div className="text-sm sm:text-base font-semibold">
                {extraData?.windSpeed ?? 0} m/s
              </div>
            </div>
            <div className="rounded-xl p-3 text-center">
              <Droplets className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm opacity-80">습도</div>
              <div className="text-sm sm:text-base font-semibold">
                {extraData?.humidity ?? 0}%
              </div>
            </div>
            <div className="rounded-xl p-3 text-center">
              <CloudRain className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm opacity-80">강수형태</div>
              <div className="text-sm sm:text-basefont-semibold">
                {PTY_TYPE[
                  extraData?.precipitationType as keyof typeof PTY_TYPE
                ] ?? "없음"}
              </div>
            </div>
          </div>
        </Card>
        {weatherData.hourlyTemperatures.length > 0 && (
          <Card className="bg-white/25 shadow-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              시간대별 기온
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
              {weatherData.hourlyTemperatures.map((hourly, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm opacity-80">{hourly.time}시</div>
                  <div className="text-sm sm:text-base font-semibold mt-1">
                    {hourly.temperature}°
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}
