// import { useOutletContext } from "react-router-dom";
import Card from "@/shared/ui/Card";
// import type { WeatherData } from "@/entity/weather";
// import type { Location } from "@/entity/location";
import useGetHome from "../model/useGetHome";

export default function HomePage() {
  // const { weatherData, selectedLocation, isWeatherLoading, weatherError } =
  //   useOutletContext<{
  //     weatherData: WeatherData;
  //     selectedLocation: Location;
  //     isWeatherLoading: boolean;
  //     weatherError: Error;
  //   }>();
  const {
    data: weatherData,
    location,
    isWeatherLoading,
    weatherError,
  } = useGetHome();
  if (isWeatherLoading) {
    return (
      <div className="mt-8">
        <Card>
          <div className="text-center py-8">날씨 정보를 불러오는 중...</div>
        </Card>
      </div>
    );
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

  if (!weatherData) {
    return (
      <div className="mt-8">
        <Card>
          <div className="text-center py-8">
            위치를 검색하여 날씨 정보를 확인하세요
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {/* 현재 날씨 정보 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{location?.addressName}</h2>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-5xl font-bold">
                {weatherData.currentTemperature}°
              </div>
              <div className="text-lg opacity-80">
                최고 {weatherData.maxTemperature}° / 최저{" "}
                {weatherData.minTemperature}°
              </div>
            </div>
          </div>
        </div>
      </Card>

      {weatherData.hourlyTemperatures.length > 0 && (
        <Card>
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
    </div>
  );
}
