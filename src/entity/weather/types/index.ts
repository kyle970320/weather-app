export interface WeatherItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export interface WeatherResponseHeader {
  resultCode: string;
  resultMsg: string;
}

export interface WeatherResponseBody {
  dataType: string;
  items: {
    item: WeatherItem[] | WeatherItem;
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export interface WeatherApiResponse {
  response: {
    header: WeatherResponseHeader;
    body: WeatherResponseBody;
  };
}

export interface WeatherParams {
  base_date: string;
  base_time: string;
  nx: number;
  ny: number;
  numOfRows?: number;
  pageNo?: number;
  dataType?: "XML" | "JSON";
  enabled?: boolean;
}

export interface HourlyTemperature {
  time: string;
  temperature: string;
}

/**
 * 변환된 날씨 데이터
 *
 * baseDate: 발표일
 * baseTime: 발표시간
 * nx: 예보지점 X 좌표
 * ny: 예보지점 Y 좌표
 * maxTemperature: 당일 최고기온
 * minTemperature: 당일 최저기온
 * currentTemperature: 현재 기온
 * hourlyTemperatures: 시간대별 기온
 * data: 기타 카테고리별 데이터
 * 기타 카테고리: REH, WSD, POP
 * - REH: 습도 (%)
 * - WSD: 풍속 (m/s)
 * - POP: 강수확률 (%)
 */
export interface WeatherData {
  baseDate: string;
  baseTime: string;
  nx: number;
  ny: number;
  maxTemperature: string;
  minTemperature: string;
  currentTemperature: string;
  hourlyTemperatures: HourlyTemperature[];
  extraData: Record<string, string>;
}
