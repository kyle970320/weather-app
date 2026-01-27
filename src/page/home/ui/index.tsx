import Card from "@/shared/ui/Card";
import { useGetHome } from "../model";
import { Droplets, Wind, CloudRain } from "lucide-react";
import { WeatherSkeleton } from "@/widgets/weather/ui";

export default function HomePage() {
  const {
    data: weatherData,
    location,
    isWeatherLoading,
    weatherError,
    extraData,
  } = useGetHome();

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
    <div className="mt-8 space-y-6">
      {/* 현재 날씨 정보 */}
      <Card className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">{location?.addressName}</h2>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-5xl font-bold text-center">
                {weatherData.currentTemperature}°
              </div>
              <div className="text-lg opacity-80">
                최고 {weatherData.maxTemperature}° / 최저{" "}
                {weatherData.minTemperature}°
              </div>
            </div>
          </div>
        </div>
        <Card className="bg-white/5 p-0 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div className="rounded-xl p-3 text-center">
              <Wind className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm opacity-80">바람</div>
              <div className="font-semibold">{extraData?.windSpeed} m/s</div>
            </div>
            <div className="rounded-xl p-3 text-center">
              <Droplets className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm opacity-80">습도</div>
              <div className="font-semibold">{extraData?.humidity}%</div>
            </div>
            <div className="rounded-xl p-3 text-center">
              <CloudRain className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm opacity-80">강수확률</div>
              <div className="font-semibold">
                {extraData?.rainfallProbability}%
              </div>
            </div>
          </div>
        </Card>
        {weatherData.hourlyTemperatures.length > 0 && (
          <Card className="bg-white/5 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">시간대별 기온</h3>
            <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
              {weatherData.hourlyTemperatures.map((hourly, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm opacity-80">{hourly.time}시</div>
                  <div className="text-lg font-semibold mt-1">
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
