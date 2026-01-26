import axios from "axios";

export const kakaoApiInstance = axios.create({
  baseURL: import.meta.env.VITE_KAKAO_API_URL,
});

kakaoApiInstance.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY;

  config.headers.Authorization = `KakaoAK ${apiKey}`;

  return config;
});

export const weatherApiInstance = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_API_URL,
});
