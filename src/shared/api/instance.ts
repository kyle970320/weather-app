import axios, { type InternalAxiosRequestConfig } from "axios";

// Kakao API 인증 헤더 추가 함수
const addKakaoAuthHeader = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY;

  config.headers.Authorization = `KakaoAK ${apiKey}`;

  return config;
};

// 주소 검색 API 인스턴스
export const kakaoAddressApiInstance = axios.create({
  baseURL: import.meta.env.VITE_KAKAO_API_ADDRESS_URL,
});

kakaoAddressApiInstance.interceptors.request.use(addKakaoAuthHeader);

// 지오코딩 API 인스턴스
export const kakaoGeoApiInstance = axios.create({
  baseURL: import.meta.env.VITE_KAKAO_API_GEO_URL,
});

kakaoGeoApiInstance.interceptors.request.use(addKakaoAuthHeader);

export const weatherApiInstance = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_API_URL,
});
