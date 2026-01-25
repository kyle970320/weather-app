import Layout from "@/app/Layout";
import { useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";

export default function RouterProvider() {
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

  return <ReactRouterProvider router={router} />;
}
