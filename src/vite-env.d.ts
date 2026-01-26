/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_API_KEY?: string;
  readonly VITE_KAKAO_API_ADDRESS_URL?: string;
  readonly VITE_KAKAO_API_GEO_URL?: string;
  readonly VITE_KAKAO_API_URL?: string; // 하위 호환성
  readonly VITE_WEATHER_API_KEY?: string;
  readonly VITE_WEATHER_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
