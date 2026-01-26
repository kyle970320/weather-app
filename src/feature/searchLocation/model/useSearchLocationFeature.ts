import { useSearchLocationQuery } from "@/entity/location";
import type { UseSearchLocationOptions } from "../types";

/**
 * 주소값으로 좌표 받아오기
 * 리스트에서 선택 or enter 검색 시 refetch 실행
 */
export const useSearchLocationFeature = (options: UseSearchLocationOptions) => {
  const { query } = options;

  const {
    data: apiResults,
    isLoading,
    error,
    refetch,
  } = useSearchLocationQuery({
    query: query.trim(),
    page: 1,
    size: 10,
    enabled: false,
  });

  const handleSearchLocation = () => {
    if (!query.trim()) {
      return;
    }
    refetch();
  };
  const isEmpty = !query.trim();

  return {
    query,
    apiResults,
    isLoading,
    error: error as Error | null,
    isEmpty,
    handleSearchLocation,
  };
};
