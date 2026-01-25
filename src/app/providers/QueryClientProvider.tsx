import { type ReactNode } from "react";
import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      refetchOnWindowFocus: false,
      retry: 5,
      placeholderData: keepPreviousData,
    },
  },
});

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}
