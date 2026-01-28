import { weatherApiInstance } from "@/shared/api/instance";
import type {
  WeatherApiResponse,
  WeatherParams,
  WeatherData,
  WeatherItem,
} from "../types";

export const getWeather = async (
  params: WeatherParams,
): Promise<WeatherData> => {
  const {
    base_date,
    base_time,
    nx,
    ny,
    numOfRows = 300,
    pageNo = 1,
    dataType = "JSON",
  } = params;

  const serviceKey = import.meta.env.VITE_WEATHER_API_KEY;
  const response = await weatherApiInstance.get<WeatherApiResponse>(
    "/getVilageFcst",
    {
      params: {
        serviceKey,
        numOfRows,
        pageNo,
        dataType,
        base_date,
        base_time,
        nx,
        ny,
      },
    },
  );

  return convertWeatherResponse(response.data);
};

const convertWeatherResponse = (
  apiResponse: WeatherApiResponse,
): WeatherData => {
  const { header, body } = apiResponse.response;

  if (header.resultCode !== "00") {
    throw new Error(
      `기상청 API 오류: ${header.resultCode} - ${header.resultMsg}`,
    );
  }

  const items = Array.isArray(body.items.item)
    ? body.items.item
    : [body.items.item];

  const firstItem = items[0] as WeatherItem;
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const todayItems = items.filter(
    (item) => item.fcstDate === today,
  ) as WeatherItem[];

  const todayTemps = todayItems
    .filter((item) => item.category === "TMP")
    .map((item) => Number(item.fcstValue));

  const minTemperature = Math.min(...todayTemps).toString();
  const maxTemperature = Math.max(...todayTemps).toString();

  // 시간대별 기온 (TMP) - 3시간 간격
  const tempItems = todayItems
    .filter((item) => item.category === "TMP")
    .sort((a, b) => {
      if (a.fcstTime !== b.fcstTime) {
        return a.fcstTime.localeCompare(b.fcstTime);
      }
      return 0;
    });

  const hourlyTemperatures = tempItems.map((item) => ({
    time: item.fcstTime.slice(0, 2),
    temperature: item.fcstValue,
  }));

  // 현재 기온 (가장 가까운 시각의 TMP)
  const now = new Date();
  const currentHour = String(now.getHours()).padStart(2, "0");

  const currentTempItem = tempItems.find(
    (item) => item.fcstTime.slice(0, 2) >= currentHour,
  );

  // fallback 포함
  const baseTime = currentTempItem?.fcstTime ?? tempItems[0]?.fcstTime ?? "";

  const currentTemperature =
    currentTempItem?.fcstValue || tempItems[0]?.fcstValue || "";

  // 기타 카테고리별 데이터 (현재와 가장 가까운 시각 기준)
  const data: Record<string, string> = {};

  if (baseTime) {
    todayItems
      .filter((item) => item.fcstTime === baseTime)
      .forEach((item) => {
        if (!["TMP", "TMX", "TMN"].includes(item.category)) {
          const categoryMap: Record<string, string> = {
            WSD: "windSpeed",
            PTY: "precipitationType",
            REH: "humidity",
          };

          const key = categoryMap[item.category];
          if (key) {
            data[key] = item.fcstValue;
          }
        }
      });
  }

  return {
    baseDate: firstItem.baseDate,
    baseTime: firstItem.baseTime,
    nx: firstItem.nx,
    ny: firstItem.ny,
    maxTemperature,
    minTemperature,
    currentTemperature,
    hourlyTemperatures,
    extraData: data,
  };
};
