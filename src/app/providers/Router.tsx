import Layout from "@/app/Layout";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const Router = () => {
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <Layout />,
        errorElement: <></>,
        children: [
          {
            path: "/:address",
            element: <>123</>,
          },
        ],
      },
    ]);
  }, []);

  return <RouterProvider router={router} />;
};
