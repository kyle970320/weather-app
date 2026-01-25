import QueryClientProvider from "@/app/providers/QueryClientProvider";
import RouterProvider from "@/app/providers/RouterProvider";

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
