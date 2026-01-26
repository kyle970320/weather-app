import dayjs from "dayjs";

/**
 * 현재 시간 기준으로 단기예보조회에 사용할 base_date와 base_time 계산
 * base_time: HHmm 형식 (0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300)
 */
export const getCurrentBaseDateTime = (): {
  base_date: string;
  base_time: string;
} => {
  const now = dayjs();
  const currentHour = now.hour();

  // 단기예보 발표 시각: 02, 05, 08, 11, 14, 17, 20, 23
  const forecastTimes = [2, 5, 8, 11, 14, 17, 20, 23];

  // 현재 시간보다 이전의 가장 최근 발표 시각 찾기
  let baseHour = 23; // 기본값: 전날 23시
  let baseDate = now.subtract(1, "day");

  for (let i = forecastTimes.length - 1; i >= 0; i--) {
    if (currentHour >= forecastTimes[i]) {
      baseHour = forecastTimes[i];
      baseDate = now;
      break;
    }
  }

  // 오전 2시 이전이면 전날 23시 사용
  if (currentHour < 2) {
    baseHour = 23;
    baseDate = now.subtract(1, "day");
  }

  return {
    base_date: baseDate.format("YYYYMMDD"),
    base_time: String(baseHour).padStart(2, "0") + "00",
  };
};

export const getBaseDateTime = (
  date: dayjs.Dayjs | string,
  hour: number,
): {
  base_date: string;
  base_time: string;
} => {
  const targetDate = typeof date === "string" ? dayjs(date) : date;
  const formattedHour = String(hour).padStart(2, "0");

  return {
    base_date: targetDate.format("YYYYMMDD"),
    base_time: `${formattedHour}00`,
  };
};
