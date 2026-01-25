import { QueryClient } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      refetchOnWindowFocus: false,
      retry: 5,
      placeholderData: keepPreviousData,
    },
  },
});
