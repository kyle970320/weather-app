import { useQuery } from "@tanstack/react-query";
import { getAddress } from "../api";
import type { KakaoAddressParams } from "../types";

export const useGetAddressQuery = (params: KakaoAddressParams) => {
  const { query, page, size, enabled = true } = params;
  return useQuery({
    queryKey: ["address", "search", query, page, size],
    queryFn: () => getAddress(params),
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
