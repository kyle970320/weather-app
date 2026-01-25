import QueryClientProvider from "@/app/providers/QueryClient";
import RouterProvider from "@/app/providers/Router";

function App() {
  return (
    <>
      <QueryClientProvider>
        <RouterProvider />
      </QueryClientProvider>
    </>
  );
}

export default App;
