import { useState, useEffect } from "react";
import { useSearchLocationQuery } from "@/entity/location";
import type { UseSearchLocationOptions } from "../types";

/**
 * 주소값으로 좌표 받아오기
 * 리스트에서 선택 or enter 검색 시 refetch 실행
 */
export const useSearchLocationFeature = (options: UseSearchLocationOptions) => {
  const { query: initialQuery } = options;
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // initialQuery가 변경되면 searchQuery도 업데이트
  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const {
    data: apiResults,
    isLoading,
    error,
    refetch,
  } = useSearchLocationQuery({
    query: searchQuery.trim(),
    page: 1,
    size: 10,
    enabled: false,
  });

  const handleSearchLocation = (query?: string) => {
    const queryToSearch = query ?? searchQuery;
    if (!queryToSearch.trim()) {
      return;
    }
    setSearchQuery(queryToSearch);
    setTimeout(() => {
      refetch();
    }, 0);
  };
  const isEmpty = !searchQuery.trim();

  return {
    query: searchQuery,
    apiResults,
    isLoading,
    error: error as Error | null,
    isEmpty,
    handleSearchLocation,
  };
};
