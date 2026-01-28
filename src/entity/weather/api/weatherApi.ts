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

  // 현재 시각 기준
  const now = new Date();
  const currentHour = now.getHours();

  const tempItems = items
    .filter((item) => item.category === "TMP")
    .sort(
      (a, b) =>
        a.fcstDate.localeCompare(b.fcstDate) ||
        a.fcstTime.localeCompare(b.fcstTime),
    );

  // 3시간 간격 TMP map 생성
  const hourlyTemperatures: { time: string; temperature: string }[] = [];

  let prevDay = "";

  tempItems.forEach((item) => {
    const fcstHour = Number(item.fcstTime.slice(0, 2));

    if (fcstHour % 3 !== 0) return;

    if (item.fcstDate > firstItem.baseDate || fcstHour >= currentHour) {
      const hourString = item.fcstTime.slice(0, 2).padStart(2, "0");
      const dayString = item.fcstDate.slice(6); // 일

      const time =
        dayString !== prevDay ? `${dayString}. ${hourString}` : hourString;

      hourlyTemperatures.push({
        time,
        temperature: item.fcstValue,
      });

      prevDay = dayString;
    }
  });

  const resultHourly = hourlyTemperatures.slice(0, 9);

  if (resultHourly.length < 9) {
    const nextDayItems = tempItems
      .filter(
        (item) =>
          Number(item.fcstDate.slice(6)) > Number(firstItem.fcstDate.slice(6)),
      )
      .filter((item) => Number(item.fcstTime.slice(0, 2)) % 3 === 0);

    for (const item of nextDayItems) {
      if (resultHourly.length >= 9) break;
      const hourString = item.fcstTime.slice(0, 2).padStart(2, "0");
      const dayString = item.fcstDate.slice(6);
      resultHourly.push({
        time: `${dayString} ${hourString}`,
        temperature: item.fcstValue,
      });
    }
  }

  // min/max TMP
  const todayTemps = tempItems.map((item) => Number(item.fcstValue));
  const minTemperature = Math.min(...todayTemps).toString();
  const maxTemperature = Math.max(...todayTemps).toString();

  // 현재 기온
  const currentTempItem = tempItems.find(
    (item) => Number(item.fcstTime.slice(0, 2)) >= currentHour,
  );
  const currentTemperature =
    currentTempItem?.fcstValue || tempItems[0]?.fcstValue || "";

  // 기타 데이터
  const baseTime = currentTempItem?.fcstTime ?? tempItems[0]?.fcstTime ?? "";
  const data: Record<string, string> = {};
  if (baseTime) {
    items
      .filter(
        (item) =>
          item.fcstTime === baseTime &&
          !["TMP", "TMX", "TMN"].includes(item.category),
      )
      .forEach((item) => {
        const categoryMap: Record<string, string> = {
          WSD: "windSpeed",
          PTY: "precipitationType",
          REH: "humidity",
        };
        const key = categoryMap[item.category];
        if (key) data[key] = item.fcstValue;
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
    hourlyTemperatures: resultHourly,
    extraData: data,
  };
};
