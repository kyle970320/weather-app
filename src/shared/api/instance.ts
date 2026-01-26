import axios from "axios";

export const kakaoApiInstance = axios.create({
  baseURL: `https://dapi.kakao.com/v2/local/search/address`,
});

kakaoApiInstance.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY;

  config.headers.Authorization = `KakaoAK ${apiKey}`;

  return config;
});
