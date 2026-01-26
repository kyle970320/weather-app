import { useQuery } from "@tanstack/react-query";
import { getLocationWithAddress } from "../api";
import type { SearchLocationParams } from "../types";

export const useSearchLocationQuery = (params: SearchLocationParams) => {
  const { query, page, size, enabled = true } = params;
  return useQuery({
    queryKey: ["address", "search", query, page, size],
    queryFn: () => getLocationWithAddress(params),
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
